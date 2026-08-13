import crypto from "node:crypto";
import { Buffer } from "node:buffer";
import process from "node:process";
import users from "../../config/caller-users.json" with { type: "json" };
import { safeEqual } from "./http.js";

const COOKIE_NAME = "ravlink_caller_session";
const MAX_AGE = 60 * 60 * 10;

function secret() {
  if (!process.env.CALLER_SESSION_SECRET) throw new Error("CALLER_SESSION_SECRET is missing");
  return process.env.CALLER_SESSION_SECRET;
}

function sign(value) {
  return crypto.createHmac("sha256", secret()).update(value).digest("base64url");
}

export function passwordHash(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}

export function verifyCredentials(username, password) {
  const user = users.find((candidate) => candidate.username === String(username).trim());
  if (!user || user.disabled) return null;
  return safeEqual(passwordHash(String(password), user.salt), user.passwordHash) ? user : null;
}

export function createSessionCookie(user) {
  const payload = Buffer.from(JSON.stringify({ sub: user.username, name: user.name, exp: Date.now() + MAX_AGE * 1000 })).toString("base64url");
  return `${COOKIE_NAME}=${payload}.${sign(payload)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${MAX_AGE}`;
}

export function clearSessionCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}

export function getSession(req) {
  const cookie = (req.headers.cookie || "").split(";").map((item) => item.trim()).find((item) => item.startsWith(`${COOKIE_NAME}=`));
  if (!cookie) return null;
  const [payload, signature] = cookie.slice(COOKIE_NAME.length + 1).split(".");
  if (!payload || !signature || !safeEqual(sign(payload), signature)) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return session.exp > Date.now() ? session : null;
  } catch { return null; }
}
