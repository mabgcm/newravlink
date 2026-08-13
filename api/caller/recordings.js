import { getSession } from "../_lib/auth.js";
import { db } from "../_lib/firebase.js";
import { json } from "../_lib/http.js";

const agentKey = (value) => String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");

export default async function handler(req, res) {
  const user = getSession(req);
  if (!user) return json(res, 401, { error: "Authentication required." });
  if (req.method !== "GET") return json(res, 405, { error: "Method not allowed" });
  if (req.query.callId) {
    const snapshot = await (await db()).collection("callRecords").doc(String(req.query.callId)).get();
    return json(res, 200, { record: snapshot.exists ? snapshot.data() : null });
  }
  const snapshot = await (await db()).collection("callRecords").limit(100).get();
  const currentAgent = agentKey(user.sub);
  const records = snapshot.docs
    .map((doc) => doc.data())
    .filter((record) => agentKey(record.agent) === currentAgent)
    .sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)))
    .slice(0, 30);
  return json(res, 200, { records });
}
