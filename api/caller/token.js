import twilio from "twilio";
import process from "node:process";
import { getSession } from "../_lib/auth.js";
import { json } from "../_lib/http.js";

export default function handler(req, res) {
  if (req.method !== "GET") return json(res, 405, { error: "Method not allowed" });
  const user = getSession(req);
  if (!user) return json(res, 401, { error: "Authentication required." });
  const { TWILIO_ACCOUNT_SID, TWILIO_API_KEY_SID, TWILIO_API_KEY_SECRET, TWILIO_TWIML_APP_SID } = process.env;
  if (![TWILIO_ACCOUNT_SID, TWILIO_API_KEY_SID, TWILIO_API_KEY_SECRET, TWILIO_TWIML_APP_SID].every(Boolean)) {
    return json(res, 503, { error: "Twilio has not been configured yet." });
  }
  const AccessToken = twilio.jwt.AccessToken;
  const token = new AccessToken(TWILIO_ACCOUNT_SID, TWILIO_API_KEY_SID, TWILIO_API_KEY_SECRET, { identity: user.sub, ttl: 3600 });
  token.addGrant(new AccessToken.VoiceGrant({ outgoingApplicationSid: TWILIO_TWIML_APP_SID }));
  return json(res, 200, { token: token.toJwt() });
}
