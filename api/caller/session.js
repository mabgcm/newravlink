import { clearSessionCookie, getSession } from "../_lib/auth.js";
import { json } from "../_lib/http.js";

export default function handler(req, res) {
  if (req.method === "DELETE") {
    res.setHeader("Set-Cookie", clearSessionCookie());
    return json(res, 200, { ok: true });
  }
  if (req.method !== "GET") return json(res, 405, { error: "Method not allowed" });
  const user = getSession(req);
  return user ? json(res, 200, { user }) : json(res, 401, { error: "Oturum gerekli." });
}
