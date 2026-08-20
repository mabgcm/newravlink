import twilio from "twilio";
import process from "node:process";
import { db } from "../_lib/firebase.js";
import { decodeCallbackMetadata, externalRequestUrl, readBody } from "../_lib/http.js";

export default async function handler(req, res) {
  const body = await readBody(req);
  const url = externalRequestUrl(req, "/api/caller/status", ["meta"]);
  if (!twilio.validateRequest(process.env.TWILIO_AUTH_TOKEN || "", req.headers["x-twilio-signature"] || "", url, body)) return res.status(403).end();
  const metadata = decodeCallbackMetadata(req.query.meta);
  const callId = String(metadata.callId || "").replace(/[^a-zA-Z0-9_-]/g, "");
  if (callId) await (await db()).collection("callRecords").doc(callId).set({ callId, to: metadata.to, agent: metadata.agent, callSid: body.CallSid || null, status: body.CallStatus || "unknown", updatedAt: new Date().toISOString() }, { merge: true });
  res.status(204).end();
}
