import nodemailer from "nodemailer";
import process from "node:process";
import { db } from "../_lib/firebase.js";

const ANSWER_KEY = {
  q1: [2, "Call Objective"], q2: [2, "Call Objective"], q3: [1, "Communication Judgment"],
  q4: [2, "Accuracy"], q5: [2, "Accuracy"], q6: [2, "Communication Judgment"],
  q7: [1, "Communication Judgment"], q8: [1, "Call Objective"], q9: [1, "Call Objective"],
  q10: [2, "Instruction Following"], q_crm_yellow: [1, "CRM Understanding"],
  q11: [1, "CRM Understanding"], q12: [2, "Accuracy"], q13: [2, "Instruction Following"],
  q14: [2, "CRM Understanding"], q15: [1, "CRM Understanding"], q16: [2, "Instruction Following"],
};
const REQUIRED_RECORDINGS = ["voice1", "voice2", "voice3", "voice4", "voice5"];
const REQUIRED_CANDIDATE = ["fullName", "email", "phone", "location", "experience", "availability", "expectedRate"];
const RED_FLAG_RULES = [
  ["q4", [0, 1, 3], "Invented or implied an unconfirmed website problem"],
  ["q7", [2], "Used a misleading denial instead of representing Rav Link accurately"],
  ["q10", [0, 1, 3], "Would continue after a clear Do Not Call request"],
  ["q_crm_yellow", [0, 2, 3], "Would ignore explicit CRM editing instructions"],
  ["q12", [0, 1], "Would enter unconfirmed information as fact"],
];
const escapeHtml = (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
const validId = (value) => /^RLCC-[A-Z0-9-]{10,40}$/.test(String(value || ""));

function scoreAnswers(answers) {
  const totals = {};
  const results = {};
  let correct = 0;
  Object.entries(ANSWER_KEY).forEach(([id, [expected, category]]) => {
    const isCorrect = Number(answers[id]) === expected;
    results[id] = { correct: isCorrect, category };
    totals[category] ||= { correct: 0, total: 0, percentage: 0 };
    totals[category].total += 1;
    if (isCorrect) { correct += 1; totals[category].correct += 1; }
  });
  Object.values(totals).forEach((category) => { category.percentage = Math.round((category.correct / category.total) * 100); });
  const redFlags = RED_FLAG_RULES.filter(([id, values]) => values.includes(Number(answers[id]))).map(([, , label]) => label);
  return { overallScore: Math.round((correct / Object.keys(ANSWER_KEY).length) * 100), categoryScores: totals, individualResults: results, redFlags };
}

function validate(payload) {
  if (!validId(payload.applicationId)) return "Invalid application ID.";
  if (!payload.candidate || REQUIRED_CANDIDATE.some((key) => !String(payload.candidate[key] ?? "").trim())) return "Candidate information is incomplete.";
  if (!/^\S+@\S+\.\S+$/.test(payload.candidate.email)) return "Candidate email is invalid.";
  if (Object.keys(ANSWER_KEY).some((id) => !Number.isInteger(Number(payload.answers?.[id])))) return "One or more knowledge-check answers are missing.";
  if (!String(payload.answers?.practical_crm || "").trim()) return "The practical CRM answer is missing.";
  if (REQUIRED_RECORDINGS.some((id) => !String(payload.recordingRefs?.[id] || "").startsWith("https://"))) return "One or more voice answers are missing.";
  return "";
}

function buildEmail(application) {
  const { candidate, applicationId, scoring, recordingRefs, answers, completedAt } = application;
  const rows = [["Application ID", applicationId], ["Full name", candidate.fullName], ["Email", candidate.email], ["WhatsApp / phone", candidate.phone], ["Location", candidate.location], ["Cold calling experience", candidate.experience], ["Availability", candidate.availability], ["Expected hourly rate", `$${candidate.expectedRate} USD`], ["Completed", completedAt]];
  const rowHtml = rows.map(([label, value]) => `<tr><td style="padding:10px 12px;border-bottom:1px solid #ececf2;color:#6b6873;width:35%;vertical-align:top"><strong>${escapeHtml(label)}</strong></td><td style="padding:10px 12px;border-bottom:1px solid #ececf2;color:#17151b">${escapeHtml(value)}</td></tr>`).join("");
  const categoryHtml = Object.entries(scoring.categoryScores).map(([name, value]) => `<li style="margin:7px 0">${escapeHtml(name)}: <strong>${value.percentage}%</strong> (${value.correct}/${value.total})</li>`).join("");
  const flagsHtml = scoring.redFlags.length ? scoring.redFlags.map((flag) => `<li style="margin:7px 0;color:#a52727"><strong>${escapeHtml(flag)}</strong></li>`).join("") : "<li>None detected</li>";
  const voiceHtml = REQUIRED_RECORDINGS.map((id, index) => `<li style="margin:10px 0"><a href="${escapeHtml(recordingRefs[id])}" style="color:#5b2dff;font-weight:700">Voice Answer ${index + 1} — Listen</a></li>`).join("");
  const html = `<div style="font-family:Arial,sans-serif;background:#f5f4f8;padding:24px 10px"><div style="max-width:700px;margin:auto;background:#fff;border-radius:16px;overflow:hidden"><div style="padding:24px;background:#5b2dff;color:#fff"><div style="font-size:11px;text-transform:uppercase;letter-spacing:1.4px">Rav Link · Cold Caller Application</div><h1 style="margin:9px 0 4px">${escapeHtml(candidate.fullName)} — ${scoring.overallScore}%</h1><p style="margin:0">${escapeHtml(application.qualificationStatus)}</p></div><div style="padding:24px"><table style="width:100%;border-collapse:collapse">${rowHtml}</table><h2 style="font-size:18px;margin-top:28px">Scoring breakdown</h2><ul>${categoryHtml}</ul><h2 style="font-size:18px;margin-top:28px">Red flags</h2><ul>${flagsHtml}</ul><h2 style="font-size:18px;margin-top:28px">Written practical answer</h2><div style="white-space:pre-wrap;background:#f7f6f9;padding:16px;border-radius:10px;line-height:1.55">${escapeHtml(answers.practical_crm)}</div><h2 style="font-size:18px;margin-top:28px">Voice answers</h2><ul>${voiceHtml}</ul></div></div></div>`;
  const text = `${candidate.fullName} — ${scoring.overallScore}%\nStatus: ${application.qualificationStatus}\nApplication ID: ${applicationId}\nEmail: ${candidate.email}\nPhone: ${candidate.phone}\nLocation: ${candidate.location}\nExperience: ${candidate.experience}\nAvailability: ${candidate.availability}\nExpected rate: $${candidate.expectedRate} USD\n\nRed flags: ${scoring.redFlags.join("; ") || "None"}\n\nCRM practical answer:\n${answers.practical_crm}\n\nVoice answers:\n${REQUIRED_RECORDINGS.map((id, index) => `${index + 1}. ${recordingRefs[id]}`).join("\n")}`;
  return { html, text };
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, message: "Method not allowed" });
  const payload = req.body || {};
  const validationError = validate(payload);
  if (validationError) return res.status(400).json({ ok: false, message: validationError });
  const firestore = await db();
  const ref = firestore.collection("careerApplications").doc(payload.applicationId);
  const existing = await ref.get();
  if (existing.exists && existing.data().submissionState === "complete") return res.status(200).json({ ok: true, duplicate: true });
  if (existing.exists && existing.data().submissionState === "processing" && Date.now() - Date.parse(existing.data().submissionStartedAt || 0) < 10 * 60 * 1000) return res.status(409).json({ ok: false, message: "This application is already being submitted." });
  const scoring = scoreAnswers(payload.answers);
  const completedAt = new Date().toISOString();
  const application = { applicationId: payload.applicationId, candidate: payload.candidate, startedAt: payload.startedAt || null, completedAt, answers: payload.answers, recordingRefs: payload.recordingRefs, scoring, qualificationStatus: scoring.overallScore >= 80 && !scoring.redFlags.length ? "Objective criteria met — manual voice review required" : "Manual review required", submissionState: "processing", submissionStartedAt: completedAt };
  await ref.set(application, { merge: true });
  try {
    const transporter = nodemailer.createTransport({ service: "gmail", auth: { user: "bugucam@gmail.com", pass: process.env.GMAIL_APP_PASSWORD } });
    const mail = buildEmail(application);
    await transporter.sendMail({ from: "bugucam@gmail.com", to: "bugucam@gmail.com", subject: `Cold Caller Application – ${payload.candidate.fullName} – ${scoring.overallScore}%`, ...mail });
    await ref.set({ submissionState: "complete", emailSentAt: new Date().toISOString() }, { merge: true });
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Career application submission failed", error);
    await ref.set({ submissionState: "failed", submissionErrorAt: new Date().toISOString() }, { merge: true });
    return res.status(500).json({ ok: false, message: "Your application was saved, but final delivery failed. Please try submitting again." });
  }
}
