import crypto from "node:crypto";
import { Buffer } from "node:buffer";

export function json(res, status, body) {
  res.status(status).setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

export async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw) return {};
  if ((req.headers["content-type"] || "").includes("application/json")) return JSON.parse(raw);
  return Object.fromEntries(new URLSearchParams(raw));
}

export function externalRequestUrl(req, pathname, queryKeys = []) {
  const protocol = String(req.headers["x-forwarded-proto"] || "https").split(",")[0].trim();
  const host = String(req.headers["x-forwarded-host"] || req.headers.host || "").split(",")[0].trim();
  const query = queryKeys
    .map((key) => {
      const value = String(req.query?.[key] || "");
      let decoded = value;
      try { decoded = decodeURIComponent(value); } catch { /* preserve malformed input for signature rejection */ }
      return `${encodeURIComponent(key)}=${encodeURIComponent(decoded)}`;
    })
    .join("&");
  return `${protocol}://${host}${pathname}${query ? `?${query}` : ""}`;
}

export function safeEqual(left, right) {
  const a = Buffer.from(String(left));
  const b = Buffer.from(String(right));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
