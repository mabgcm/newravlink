import crypto from "node:crypto";
import { Buffer } from "node:buffer";
import { bucket, db } from "../_lib/firebase.js";

export const config = { api: { bodyParser: false } };

const cleanId = (value, pattern) => pattern.test(String(value || "")) ? String(value) : "";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, message: "Method not allowed" });
  const applicationId = cleanId(req.query.applicationId, /^RLCC-[A-Z0-9-]{10,40}$/);
  const questionId = cleanId(req.query.questionId, /^voice[1-5]$/);
  const contentType = String(req.headers["content-type"] || "");
  if (!applicationId || !questionId || !contentType.startsWith("audio/")) return res.status(400).json({ ok: false, message: "Invalid recording request." });
  try {
    const chunks = [];
    let size = 0;
    for await (const chunk of req) {
      size += chunk.length;
      if (size > 8 * 1024 * 1024) return res.status(413).json({ ok: false, message: "Recording is too large. Keep the answer brief and try again." });
      chunks.push(chunk);
    }
    if (size < 1000) return res.status(400).json({ ok: false, message: "Recording is too short." });
    const extension = contentType.includes("mp4") ? "m4a" : contentType.includes("ogg") ? "ogg" : "webm";
    const fileName = `career-applications/${applicationId}/${questionId}.${extension}`;
    const token = crypto.randomUUID();
    const storage = await bucket();
    await storage.file(fileName).save(Buffer.concat(chunks), { contentType, resumable: false, metadata: { metadata: { firebaseStorageDownloadTokens: token, applicationId, questionId } } });
    const recordingUrl = `https://firebasestorage.googleapis.com/v0/b/${encodeURIComponent(storage.name)}/o/${encodeURIComponent(fileName)}?alt=media&token=${token}`;
    await (await db()).collection("careerApplications").doc(applicationId).set({ applicationId, updatedAt: new Date().toISOString(), recordings: { [questionId]: { recordingUrl, fileName, contentType, size } } }, { merge: true });
    return res.status(200).json({ ok: true, recordingUrl });
  } catch (error) {
    console.error("Career recording upload failed", error);
    return res.status(500).json({ ok: false, message: "The recording could not be saved. Please try again." });
  }
}
