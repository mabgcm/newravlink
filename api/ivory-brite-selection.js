import fs from "node:fs";
import nodemailer from "nodemailer";
import { SELECTION_CATALOG } from "./_lib/ivory-brite-contract.js";

const AGENCY_EMAIL = "info@ravlink.ca";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const AGREEMENT_FILENAME = "RavLink_IvoryBrite_Agreement.pdf";

const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const money = (n) => `$${Number(n).toLocaleString("en-CA")}`;

const findById = (list, id) => list.find((item) => item.id === id);

/**
 * Recompute the selection and totals on the server — never trust client totals.
 * Returns { ok, errors[], summary } where summary has line items and totals.
 */
const resolveSelection = (payload) => {
  const errors = [];
  const mode = payload.mode;
  const lines = [];
  let setupTotal = 0;
  let monthlyTotal = 0;
  let title = "";

  if (mode === "package") {
    const pkg = SELECTION_CATALOG.packages.find((p) => p.id === payload.packageId);
    if (!pkg) {
      errors.push("Invalid package selected.");
      return { ok: false, errors };
    }
    title = `${pkg.name} package`;
    lines.push({ label: `${pkg.name} — one-time setup`, price: money(pkg.setupPrice) });
    lines.push({ label: `${pkg.name} — monthly`, price: `${money(pkg.monthlyPrice)}/mo` });
    setupTotal += pkg.setupPrice;
    monthlyTotal += pkg.monthlyPrice;
    const website = findById(SELECTION_CATALOG.website, pkg.websiteId);
    lines.push({
      label: `Website Build (${pkg.name}: ${website.price === 0 ? "free" : money(website.price)})`,
      price: website.price === 0 ? "Free" : money(website.price),
    });
    setupTotal += website.price;
    if (payload.socialAddon) {
      const sSetup = findById(SELECTION_CATALOG.setup, "social-setup");
      const sMonthly = findById(SELECTION_CATALOG.monthly, "social-mo");
      lines.push({ label: `Social Media setup (add-on)`, price: money(sSetup.price) });
      lines.push({ label: `Social Media management (add-on)`, price: `${money(sMonthly.price)}/mo` });
      setupTotal += sSetup.price;
      monthlyTotal += sMonthly.price;
    }
  } else if (mode === "itemized") {
    title = "Itemized selection";
    const setupIds = Array.isArray(payload.setupIds) ? payload.setupIds : [];
    const monthlyIds = Array.isArray(payload.monthlyIds) ? payload.monthlyIds : [];
    if (!setupIds.length && !monthlyIds.length) {
      errors.push("No services selected.");
      return { ok: false, errors };
    }
    for (const id of setupIds) {
      const item = findById(SELECTION_CATALOG.setup, id);
      if (!item) {
        errors.push(`Invalid setup item: ${id}`);
        return { ok: false, errors };
      }
      lines.push({ label: `${item.label} (setup)`, price: money(item.price) });
      setupTotal += item.price;
    }
    for (const id of monthlyIds) {
      const item = findById(SELECTION_CATALOG.monthly, id);
      if (!item) {
        errors.push(`Invalid monthly item: ${id}`);
        return { ok: false, errors };
      }
      lines.push({ label: `${item.label} (monthly)`, price: `${money(item.price)}/mo` });
      monthlyTotal += item.price;
    }
    const website = findById(SELECTION_CATALOG.website, "web-itemized");
    lines.push({ label: "Website Build (itemized)", price: money(website.price) });
    setupTotal += website.price;
  } else {
    errors.push("Invalid selection mode.");
    return { ok: false, errors };
  }

  return { ok: true, errors, summary: { title, lines, setupTotal, monthlyTotal } };
};

export function createMailOptions({ clientName, clientEmail, businessName, summary, acceptedAt, ip }) {
  const pdfBuffer = fs.readFileSync(new URL("./_lib/ivory-brite-agreement.pdf", import.meta.url));

  const lineRows = summary.lines
    .map(
      (l) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #ececf2;color:#17151b;font-size:14px;">${escapeHtml(l.label)}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #ececf2;color:#17151b;font-size:14px;text-align:right;white-space:nowrap;">${escapeHtml(l.price)}</td>
        </tr>`,
    )
    .join("");

  const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;background:#f5f4f8;padding:28px 12px;">
        <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e8e6ed;border-radius:16px;overflow:hidden;">
          <div style="padding:24px;background:#5b2dff;color:#fff;">
            <div style="font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;opacity:.78;margin-bottom:8px;">Rav Link · Proposal accepted</div>
            <h1 style="margin:0 0 8px;font-size:24px;">${escapeHtml(clientName)}</h1>
            <p style="margin:0;font-size:14px;opacity:.9;">${escapeHtml(businessName)} · ${escapeHtml(clientEmail)}</p>
          </div>
          <div style="padding:24px;">
            <h3 style="margin:0 0 10px;font-size:16px;color:#17151b;">Selected: ${escapeHtml(summary.title)}</h3>
            <table style="width:100%;border-collapse:collapse;border:1px solid #ececf2;border-radius:10px;overflow:hidden;margin-bottom:16px;">
              ${lineRows}
              <tr>
                <td style="padding:10px 14px;color:#17151b;font-size:14px;font-weight:700;">One-time total</td>
                <td style="padding:10px 14px;color:#17151b;font-size:14px;font-weight:700;text-align:right;">${escapeHtml(money(summary.setupTotal))}</td>
              </tr>
              <tr>
                <td style="padding:10px 14px;color:#17151b;font-size:14px;font-weight:700;">Monthly total</td>
                <td style="padding:10px 14px;color:#17151b;font-size:14px;font-weight:700;text-align:right;">${escapeHtml(money(summary.monthlyTotal))}/mo</td>
              </tr>
            </table>
            <div style="background:#f4f0ff;border:1px solid #ddd2ff;border-radius:10px;padding:14px 16px;margin-bottom:18px;">
              <p style="margin:0;font-size:13px;line-height:1.6;color:#21164d;">
                <strong>Acceptance:</strong> ${escapeHtml(clientName)} (${escapeHtml(businessName)})
                ticked the acceptance box and submitted this selection on ${escapeHtml(acceptedAt)}
                (IP: ${escapeHtml(ip)}), confirming that they have read the Digital Marketing
                Services Agreement between Rav Link Inc. and Ivory Brite and accept it in full.
              </p>
            </div>
            <p style="margin:0;font-size:14px;color:#17151b;">
              The full agreement is attached to this email as a PDF (${escapeHtml(AGREEMENT_FILENAME)}).
            </p>
          </div>
          <div style="padding:18px 24px;background:#f7f6f9;color:#77727f;font-size:11px;line-height:1.5;">
            This acceptance was submitted through the Rav Link online proposal page. Payment is by Interac e-transfer to ${escapeHtml(AGENCY_EMAIL)}.
          </div>
        </div>
      </div>`;

  const text =
    `PROPOSAL ACCEPTED — ${businessName}\n` +
    `Name: ${clientName}\nEmail: ${clientEmail}\n` +
    `Accepted at: ${acceptedAt} (IP: ${ip})\n\n` +
    `SELECTION: ${summary.title}\n` +
    summary.lines.map((l) => `  - ${l.label}: ${l.price}`).join("\n") +
    `\n  One-time total: ${money(summary.setupTotal)}\n` +
    `  Monthly total: ${money(summary.monthlyTotal)}/mo\n\n` +
    `ACCEPTANCE: ${clientName} (${businessName}) confirmed acceptance of the Digital Marketing Services Agreement.\n\n` +
    `The full agreement is attached as ${AGREEMENT_FILENAME}.\n` +
    `Payment: Interac e-transfer to ${AGENCY_EMAIL}.`;

  return {
    from: "bugucam@gmail.com",
    to: [AGENCY_EMAIL, clientEmail],
    subject: `${businessName} — Agreement accepted: ${summary.title}`,
    text,
    html,
    attachments: [
      {
        filename: AGREEMENT_FILENAME,
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  try {
    const payload = req.body || {};
    const clientName = String(payload.clientName || "").trim();
    const clientEmail = String(payload.clientEmail || "").trim();
    const businessName = String(payload.businessName || "Ivory Brite").trim() || "Ivory Brite";

    if (!clientName) {
      return res.status(400).json({ ok: false, message: "Name is required." });
    }
    if (!EMAIL_RE.test(clientEmail)) {
      return res.status(400).json({ ok: false, message: "A valid email address is required." });
    }
    if (payload.accepted !== true) {
      return res.status(400).json({ ok: false, message: "The agreement must be accepted to send." });
    }

    const resolved = resolveSelection(payload);
    if (!resolved.ok) {
      return res.status(400).json({ ok: false, message: resolved.errors.join(" ") });
    }

    const acceptedAt = new Date().toISOString();
    const ip =
      (req.headers["x-forwarded-for"] || "").toString().split(",")[0].trim() || "unknown";

    const mailOptions = createMailOptions({
      clientName,
      clientEmail,
      businessName,
      summary: resolved.summary,
      acceptedAt,
      ip,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bugucam@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ ok: false });
  }
}
