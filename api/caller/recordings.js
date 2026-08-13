import { getSession } from "../_lib/auth.js";
import { db } from "../_lib/firebase.js";
import { json } from "../_lib/http.js";
import users from "../../config/caller-users.json" with { type: "json" };

export default async function handler(req, res) {
  const user = getSession(req);
  if (!user) return json(res, 401, { error: "Authentication required." });
  if (req.method !== "GET") return json(res, 405, { error: "Method not allowed" });
  if (req.query.callId) {
    const snapshot = await (await db()).collection("callRecords").doc(String(req.query.callId)).get();
    return json(res, 200, { record: snapshot.exists ? snapshot.data() : null });
  }
  const firestore = await db();
  const activeUsers = users.filter((candidate) => !candidate.disabled);
  if (activeUsers.length === 1 && activeUsers[0].username === user.sub) {
    const legacySnapshot = await firestore.collection("callRecords").where("agent", "==", "undefined").get();
    if (!legacySnapshot.empty) {
      const batch = firestore.batch();
      legacySnapshot.docs.forEach((doc) => batch.update(doc.ref, { agent: user.sub }));
      await batch.commit();
    }
  }
  const snapshot = await firestore.collection("callRecords").where("agent", "==", user.sub).limit(30).get();
  const records = snapshot.docs
    .map((doc) => doc.data())
    .sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)))
    .slice(0, 30);
  return json(res, 200, { records });
}
