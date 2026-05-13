import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import puppeteer from "puppeteer";

const routes = [
    "/",
    "/about",
    "/services",
    "/services/seo-barrie",
    "/services/website-design-barrie",
    "/services/meta-ads-management",
    "/services/contractor-marketing",
    "/case-studies",
    "/blog",
    "/contact",
    "/seo-agency-toronto",
    "/seo-agency-vaughan",
    "/seo-agency-barrie",
    "/website-design-toronto",
    "/meta-ads-agency-toronto",
    "/contractor-marketing-ontario",
];

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const host = "127.0.0.1";
const port = Number(process.env.PRERENDER_PORT || 4173);
const baseUrl = `http://${host}:${port}`;

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

async function getChromeExecutablePath() {
    for (const candidate of chromeCandidates) {
        if (await fileExists(candidate)) return candidate;
    }
    return undefined;
}

function routeToFile(route) {
    if (route === "/") return path.join(distDir, "index.html");
    return path.join(distDir, route.replace(/^\//, ""), "index.html");
}

function waitForServer(child) {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error("Timed out waiting for Vite preview server."));
        }, 15000);

        child.stdout.on("data", (chunk) => {
            const text = chunk.toString();
            process.stdout.write(text);
            if (text.includes("Local:") || text.includes(`http://${host}:${port}`)) {
                clearTimeout(timeout);
                resolve();
            }
        });

        child.stderr.on("data", (chunk) => process.stderr.write(chunk.toString()));
        child.on("error", (error) => {
            clearTimeout(timeout);
            reject(error);
        });
        child.on("exit", (code) => {
            if (code !== null && code !== 0) {
                clearTimeout(timeout);
                reject(new Error(`Vite preview exited with code ${code}.`));
            }
        });
    });
}

async function startPreviewServer() {
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
                    'meta[property^="og:"]',
                    'meta[name^="twitter:"]',
                ].join(","),
            )
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
        browser = await puppeteer.launch({
            executablePath: await getChromeExecutablePath(),
            headless: "new",
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
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
