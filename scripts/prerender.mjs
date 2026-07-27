import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import fs from "node:fs/promises";
import net from "node:net";
import path from "node:path";
import process from "node:process";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

const blogDataSource = readFileSync(new URL("../src/Data/BlogPostData.jsx", import.meta.url), "utf8");
const blogRoutes = [...blogDataSource.matchAll(/link:\s*"([^"]+)"/g)]
    .map((match) => match[1])
    .filter((link) => link.startsWith("/blog/"));

const englishRoutes = [
    "/",
    "/about",
    "/services",
    "/services/seo-barrie",
    "/services/website-design-barrie",
    "/services/meta-ads-management",
    "/services/contractor-marketing",
    "/case-studies",
    "/blog",
    ...blogRoutes,
    "/growth-check",
    "/contact",
    "/seo-agency-toronto",
    "/seo-agency-vaughan",
    "/seo-agency-barrie",
    "/website-design-toronto",
    "/meta-ads-agency-toronto",
    "/contractor-marketing-ontario",
];
const turkishRoutes = englishRoutes.map((route) => (route === "/" ? "/tr/" : `/tr${route}`));
const routes = [...englishRoutes, ...turkishRoutes];

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const host = "127.0.0.1";
let port = Number(process.env.PRERENDER_PORT || 0);
let baseUrl = "";

const chromeCandidates = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
].filter(Boolean);

async function fileExists(filePath) {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}

async function getBrowserLaunchConfig() {
    for (const candidate of chromeCandidates) {
        if (await fileExists(candidate)) {
            return {
                executablePath: candidate,
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
                defaultViewport: { width: 1366, height: 1200 },
            };
        }
    }

    return {
        executablePath: await chromium.executablePath(),
        args: [...chromium.args, "--no-sandbox", "--disable-setuid-sandbox"],
        defaultViewport: chromium.defaultViewport,
    };
}

function routeToFile(route) {
    if (route === "/") return path.join(distDir, "index.html");
    return path.join(distDir, route.replace(/^\//, ""), "index.html");
}

async function getAvailablePort() {
    if (port) return port;

    return new Promise((resolve, reject) => {
        const server = net.createServer();
        server.on("error", reject);
        server.listen(0, host, () => {
            const address = server.address();
            const selectedPort = typeof address === "object" && address ? address.port : 4173;
            server.close(() => resolve(selectedPort));
        });
    });
}

async function waitForServer(child) {
    let exited = false;
    let exitCode = null;
    let processError = null;

    child.stdout.on("data", (chunk) => process.stdout.write(chunk.toString()));
    child.stderr.on("data", (chunk) => process.stderr.write(chunk.toString()));
    child.on("error", (error) => {
        processError = error;
    });
    child.on("exit", (code) => {
        exited = true;
        exitCode = code;
    });

    const deadline = Date.now() + 30000;
    while (Date.now() < deadline) {
        if (processError) {
            throw processError;
        }

        if (exited) {
            throw new Error(`Vite preview exited with code ${exitCode}.`);
        }

        try {
            const response = await fetch(baseUrl, { method: "HEAD" });
            if (response.ok || response.status === 404) {
                return;
            }
        } catch {
            // Keep polling until Vite preview opens its port.
        }

        await new Promise((resolve) => setTimeout(resolve, 250));
    }

    throw new Error(`Timed out waiting for Vite preview server at ${baseUrl}.`);
}

async function startPreviewServer() {
    port = await getAvailablePort();
    baseUrl = `http://${host}:${port}`;

    const child = spawn(
        process.execPath,
        [
            "node_modules/vite/bin/vite.js",
            "preview",
            "--host",
            host,
            "--port",
            String(port),
            "--strictPort",
        ],
        {
            cwd: rootDir,
            env: { ...process.env, BROWSER: "none" },
            stdio: ["ignore", "pipe", "pipe"],
        },
    );

    await waitForServer(child);
    return child;
}

async function prerenderRoute(browser, route) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 1200, deviceScaleFactor: 1 });
    await page.setRequestInterception(true);
    page.on("request", (request) => {
        const url = request.url();
        const resourceType = request.resourceType();
        const blockedHosts = [
            "connect.facebook.net",
            "facebook.com",
            "google-analytics.com",
            "googletagmanager.com",
            "youtube.com",
            "ytimg.com",
        ];

        if (blockedHosts.some((hostName) => url.includes(hostName))) {
            request.abort();
            return;
        }

        if (["image", "media", "font"].includes(resourceType)) {
            request.abort();
            return;
        }

        request.continue();
    });

    await page.goto(`${baseUrl}${route}`, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
    });
    await page.waitForSelector("h1", { timeout: 10000 });
    await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => resolve())));
    await page.waitForNetworkIdle({ idleTime: 300, timeout: 5000 }).catch(() => {});

    await page.evaluate(() => {
        const lastAttribute = (selector, attribute) => {
            const items = [...document.querySelectorAll(selector)];
            return items.at(-1)?.getAttribute(attribute) || "";
        };
        const finalHead = {
            title: document.title,
            description: lastAttribute('meta[name="description"]', "content"),
            canonical: lastAttribute('link[rel="canonical"]', "href"),
            hreflangEn: lastAttribute('link[rel="alternate"][hreflang="en"]', "href"),
            hreflangTr: lastAttribute('link[rel="alternate"][hreflang="tr"]', "href"),
            hreflangDefault: lastAttribute('link[rel="alternate"][hreflang="x-default"]', "href"),
            ogType: lastAttribute('meta[property="og:type"]', "content") || "website",
            ogTitle: lastAttribute('meta[property="og:title"]', "content") || document.title,
            ogDescription:
                lastAttribute('meta[property="og:description"]', "content") ||
                lastAttribute('meta[name="description"]', "content"),
            ogUrl: lastAttribute('meta[property="og:url"]', "content") || lastAttribute('link[rel="canonical"]', "href"),
            ogImage: lastAttribute('meta[property="og:image"]', "content"),
            twitterCard: lastAttribute('meta[name="twitter:card"]', "content") || "summary_large_image",
            twitterTitle: lastAttribute('meta[name="twitter:title"]', "content") || document.title,
            twitterDescription:
                lastAttribute('meta[name="twitter:description"]', "content") ||
                lastAttribute('meta[name="description"]', "content"),
            twitterImage: lastAttribute('meta[name="twitter:image"]', "content"),
        };

        document
            .querySelectorAll(
                [
                    "title",
                    'meta[name="description"]',
                    'link[rel="canonical"]',
                    'link[rel="alternate"][hreflang]',
                    'meta[property^="og:"]',
                    'meta[name^="twitter:"]',
                ].join(","),
            )
            .forEach((node) => node.remove());

        document
            .querySelectorAll('script[src*="youtube.com/iframe_api"]')
            .forEach((node) => node.remove());

        const addMeta = (attribute, name, content) => {
            if (!content) return;
            const meta = document.createElement("meta");
            meta.setAttribute(attribute, name);
            meta.setAttribute("content", content);
            document.head.appendChild(meta);
        };

        const title = document.createElement("title");
        title.textContent = finalHead.title;
        document.head.appendChild(title);

        addMeta("name", "description", finalHead.description);

        if (finalHead.canonical) {
            const canonical = document.createElement("link");
            canonical.setAttribute("rel", "canonical");
            canonical.setAttribute("href", finalHead.canonical);
            document.head.appendChild(canonical);
        }

        [
            ["en", finalHead.hreflangEn],
            ["tr", finalHead.hreflangTr],
            ["x-default", finalHead.hreflangDefault],
        ].forEach(([hreflang, href]) => {
            if (!href) return;
            const alternate = document.createElement("link");
            alternate.setAttribute("rel", "alternate");
            alternate.setAttribute("hreflang", hreflang);
            alternate.setAttribute("href", href);
            document.head.appendChild(alternate);
        });

        addMeta("property", "og:type", finalHead.ogType);
        addMeta("property", "og:title", finalHead.ogTitle);
        addMeta("property", "og:description", finalHead.ogDescription);
        addMeta("property", "og:url", finalHead.ogUrl);
        addMeta("property", "og:image", finalHead.ogImage);
        addMeta("name", "twitter:card", finalHead.twitterCard);
        addMeta("name", "twitter:title", finalHead.twitterTitle);
        addMeta("name", "twitter:description", finalHead.twitterDescription);
        addMeta("name", "twitter:image", finalHead.twitterImage);
    });

    const checks = await page.evaluate(() => {
        const description = document.querySelector('meta[name="description"]')?.getAttribute("content") || "";
        const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute("href") || "";
        const schemaCount = document.querySelectorAll('script[type="application/ld+json"]').length;
        const h1Text = document.querySelector("h1")?.textContent?.trim() || "";
        return {
            title: document.title,
            description,
            canonical,
            schemaCount,
            h1Text,
        };
    });

    const missing = Object.entries({
        title: checks.title,
        description: checks.description,
        canonical: checks.canonical,
        h1Text: checks.h1Text,
    })
        .filter(([, value]) => !value)
        .map(([key]) => key);

    if (missing.length || checks.schemaCount < 1) {
        throw new Error(
            `Prerender validation failed for ${route}: missing ${[
                ...missing,
                checks.schemaCount < 1 ? "schema" : "",
            ]
                .filter(Boolean)
                .join(", ")}`,
        );
    }

    const html = await page.content();
    const outputFile = routeToFile(route);
    await fs.mkdir(path.dirname(outputFile), { recursive: true });
    await fs.writeFile(outputFile, html);
    await page.close();
    return checks;
}

async function main() {
    const server = await startPreviewServer();
    let browser;

    try {
        const launchConfig = await getBrowserLaunchConfig();
        browser = await puppeteer.launch({
            ...launchConfig,
            headless: true,
        });

        const results = [];
        for (const route of routes) {
            const checks = await prerenderRoute(browser, route);
            results.push({ route, ...checks });
            console.log(
                `[prerender] ${route} -> title="${checks.title}" h1="${checks.h1Text}" schema=${checks.schemaCount}`,
            );
        }

        await fs.writeFile(
            path.join(distDir, "prerender-manifest.json"),
            JSON.stringify({ routes: results }, null, 2),
        );
    } finally {
        if (browser) await browser.close();
        server.kill("SIGTERM");
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
