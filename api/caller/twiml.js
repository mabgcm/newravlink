import twilio from "twilio";
import process from "node:process";
import { readBody } from "../_lib/http.js";

const escapeQuery = (value) => encodeURIComponent(String(value || ""));

export default async function handler(req, res) {
  const body = await readBody(req);
  const signature = req.headers["x-twilio-signature"] || "";
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const url = `${protocol}://${host}${req.url}`;
  if (!twilio.validateRequest(process.env.TWILIO_AUTH_TOKEN || "", signature, url, body)) return res.status(403).end("Invalid signature");

  const to = String(body.To || "").trim();
  const callId = String(body.CallId || "").replace(/[^a-zA-Z0-9_-]/g, "");
  const agent = String(body.Agent || "unknown").replace(/[^a-zA-Z0-9@_.-]/g, "").slice(0, 128);
  const response = new twilio.twiml.VoiceResponse();
  if (!/^\+[1-9]\d{7,14}$/.test(to)) {
    response.say("The destination number is invalid.");
  } else {
    const callback = `${protocol}://${host}/api/caller/recording?callId=${escapeQuery(callId)}&to=${escapeQuery(to)}&agent=${escapeQuery(agent)}`;
    const statusCallback = `${protocol}://${host}/api/caller/status?callId=${escapeQuery(callId)}&to=${escapeQuery(to)}&agent=${escapeQuery(agent)}`;
    const dial = response.dial({ callerId: process.env.TWILIO_CALLER_ID, record: "record-from-answer-dual", recordingStatusCallback: callback, recordingStatusCallbackEvent: "completed absent", recordingStatusCallbackMethod: "POST" });
    dial.number({ statusCallback, statusCallbackEvent: "initiated ringing answered completed", statusCallbackMethod: "POST" }, to);
  }
  res.status(200).setHeader("Content-Type", "text/xml; charset=utf-8").end(response.toString());
}
