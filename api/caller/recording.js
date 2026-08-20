import crypto from "node:crypto";
import { Buffer } from "node:buffer";
import process from "node:process";
import twilio from "twilio";
import { bucket, db } from "../_lib/firebase.js";
import { decodeCallbackMetadata, externalRequestUrl, readBody } from "../_lib/http.js";

export default async function handler(req, res) {
  const body = await readBody(req);
  const requestUrl = externalRequestUrl(req, "/api/caller/recording", ["meta"]);
  if (!twilio.validateRequest(process.env.TWILIO_AUTH_TOKEN || "", req.headers["x-twilio-signature"] || "", requestUrl, body)) return res.status(403).end();
  const metadata = decodeCallbackMetadata(req.query.meta);
  const callId = String(metadata.callId || "").replace(/[^a-zA-Z0-9_-]/g, "");
  if (!callId) return res.status(400).end("Missing callId");
  const base = { callId, to: String(metadata.to || ""), agent: String(metadata.agent || ""), recordingSid: body.RecordingSid || null, duration: Number(body.RecordingDuration || 0), updatedAt: new Date().toISOString() };
  if (body.RecordingStatus !== "completed") {
    await (await db()).collection("callRecords").doc(callId).set({ ...base, recordingStatus: body.RecordingStatus || "absent" }, { merge: true });
    return res.status(204).end();
  }
  const credentials = Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString("base64");
  const mediaResponse = await fetch(`${body.RecordingUrl}.mp3`, { headers: { Authorization: `Basic ${credentials}` } });
  if (!mediaResponse.ok) throw new Error(`Twilio recording download failed: ${mediaResponse.status}`);
  const audio = Buffer.from(await mediaResponse.arrayBuffer());
  const timestamp = new Date().toLocaleString("sv-SE", { timeZone: "America/Toronto" }).replace(" ", "_").replaceAll(":", "-");
  const safeNumber = base.to.replace(/[^+\d]/g, "") || "unknown";
  const fileName = `call-recordings/${timestamp.slice(0, 10)}/${safeNumber}_${timestamp}_${body.RecordingSid}.mp3`;
  const token = crypto.randomUUID();
  const storage = await bucket();
  const file = storage.file(fileName);
  await file.save(audio, { contentType: "audio/mpeg", resumable: false, metadata: { metadata: { firebaseStorageDownloadTokens: token, callId, phoneNumber: base.to, agent: base.agent } } });
  const recordingUrl = `https://firebasestorage.googleapis.com/v0/b/${encodeURIComponent(storage.name)}/o/${encodeURIComponent(fileName)}?alt=media&token=${token}`;
  await (await db()).collection("callRecords").doc(callId).set({ ...base, recordingStatus: "completed", recordingUrl, fileName, completedAt: new Date().toISOString() }, { merge: true });
  res.status(204).end();
}
