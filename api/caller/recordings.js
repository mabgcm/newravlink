import { getSession } from "../_lib/auth.js";
import { db } from "../_lib/firebase.js";
import { json } from "../_lib/http.js";

export default async function handler(req, res) {
  const user = getSession(req);
  if (!user) return json(res, 401, { error: "Authentication required." });
  if (req.method !== "GET") return json(res, 405, { error: "Method not allowed" });
  if (req.query.callId) {
    const snapshot = await (await db()).collection("callRecords").doc(String(req.query.callId)).get();
    return json(res, 200, { record: snapshot.exists ? snapshot.data() : null });
  }
  const snapshot = await (await db()).collection("callRecords").where("agent", "==", user.sub).limit(30).get();
  const records = snapshot.docs.map((doc) => doc.data()).sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));
  return json(res, 200, { records });
}
