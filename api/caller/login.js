import { createSessionCookie, verifyCredentials } from "../_lib/auth.js";
import { json, readBody } from "../_lib/http.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });
  const { username, password } = await readBody(req);
  const user = verifyCredentials(username || "", password || "");
  if (!user) return json(res, 401, { error: "Incorrect username or password." });
  res.setHeader("Set-Cookie", createSessionCookie(user));
  return json(res, 200, { user: { username: user.username, name: user.name } });
}
