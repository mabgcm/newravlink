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
const itemLabel = (item, lang) => (lang === "tr" ? item.labelTr || item.label : item.label);

/**
 * Recompute the selection and totals on the server — never trust client totals.
 * Returns { ok, errors[], summary } where summary has line items and totals.
 */
const resolveSelection = (payload, lang) => {
  const errors = [];
  const mode = payload.mode;
  const lines = [];
  let setupTotal = 0;
  let monthlyTotal = 0;
  let title = "";

  if (mode === "package") {
    const pkg = SELECTION_CATALOG.packages.find((p) => p.id === payload.packageId);
    if (!pkg) {
      errors.push(lang === "tr" ? "Geçersiz paket seçimi." : "Invalid package selected.");
      return { ok: false, errors };
    }
    title = lang === "tr" ? `${pkg.name} paketi` : `${pkg.name} package`;
    lines.push({ label: lang === "tr" ? `${pkg.name} — tek seferlik kurulum` : `${pkg.name} — one-time setup`, price: money(pkg.setupPrice) });
    lines.push({ label: lang === "tr" ? `${pkg.name} — aylık` : `${pkg.name} — monthly`, price: `${money(pkg.monthlyPrice)}/mo` });
    setupTotal += pkg.setupPrice;
    monthlyTotal += pkg.monthlyPrice;
    const website = findById(SELECTION_CATALOG.website, pkg.websiteId);
    lines.push({
      label: lang === "tr"
        ? `Web Sitesi Yapımı (${pkg.name}: ${website.price === 0 ? "ücretsiz" : money(website.price)})`
        : `Website Build (${pkg.name}: ${website.price === 0 ? "free" : money(website.price)})`,
      price: website.price === 0 ? (lang === "tr" ? "Ücretsiz" : "Free") : money(website.price),
    });
    setupTotal += website.price;
    if (payload.socialAddon) {
      const sSetup = findById(SELECTION_CATALOG.setup, "social-setup");
      const sMonthly = findById(SELECTION_CATALOG.monthly, "social-mo");
      lines.push({ label: lang === "tr" ? "Sosyal Medya kurulumu (ek hizmet)" : "Social Media setup (add-on)", price: money(sSetup.price) });
      lines.push({ label: lang === "tr" ? "Sosyal Medya yönetimi (ek hizmet)" : "Social Media management (add-on)", price: `${money(sMonthly.price)}/mo` });
      setupTotal += sSetup.price;
      monthlyTotal += sMonthly.price;
    }
  } else if (mode === "itemized") {
    title = lang === "tr" ? "Kalem kalem seçim" : "Itemized selection";
    const setupIds = Array.isArray(payload.setupIds) ? payload.setupIds : [];
    const monthlyIds = Array.isArray(payload.monthlyIds) ? payload.monthlyIds : [];
    if (!setupIds.length && !monthlyIds.length) {
      errors.push(lang === "tr" ? "Hizmet seçilmedi." : "No services selected.");
      return { ok: false, errors };
    }
    for (const id of setupIds) {
      const item = findById(SELECTION_CATALOG.setup, id);
      if (!item) {
        errors.push(lang === "tr" ? `Geçersiz kurulum kalemi: ${id}` : `Invalid setup item: ${id}`);
        return { ok: false, errors };
      }
      lines.push({ label: `${itemLabel(item, lang)} ${lang === "tr" ? "(kurulum)" : "(setup)"}`, price: money(item.price) });
      setupTotal += item.price;
    }
    for (const id of monthlyIds) {
      const item = findById(SELECTION_CATALOG.monthly, id);
      if (!item) {
        errors.push(lang === "tr" ? `Geçersiz aylık kalem: ${id}` : `Invalid monthly item: ${id}`);
        return { ok: false, errors };
      }
      lines.push({ label: `${itemLabel(item, lang)} ${lang === "tr" ? "(aylık)" : "(monthly)"}`, price: `${money(item.price)}/mo` });
      monthlyTotal += item.price;
    }
    const website = findById(SELECTION_CATALOG.website, "web-itemized");
    lines.push({ label: lang === "tr" ? "Web Sitesi Yapımı (kalem kalem)" : "Website Build (itemized)", price: money(website.price) });
    setupTotal += website.price;
  } else {
    errors.push(lang === "tr" ? "Geçersiz seçim modu." : "Invalid selection mode.");
    return { ok: false, errors };
  }

  return { ok: true, errors, summary: { title, lines, setupTotal, monthlyTotal } };
};

export function createMailOptions({ clientName, clientEmail, businessName, summary, acceptedAt, ip, lang }) {
  const pdfBuffer = fs.readFileSync(new URL("./_lib/ivory-brite-agreement.pdf", import.meta.url));
  const tr = lang === "tr";

  const lineRows = summary.lines
    .map(
      (l) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #ececf2;color:#17151b;font-size:14px;">${escapeHtml(l.label)}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #ececf2;color:#17151b;font-size:14px;text-align:right;white-space:nowrap;">${escapeHtml(l.price)}</td>
        </tr>`,
    )
    .join("");

  const t = {
    kicker: tr ? "Rav Link · Teklif onaylandı" : "Rav Link · Proposal accepted",
    selected: tr ? "Seçilen" : "Selected",
    oneTime: tr ? "Tek seferlik toplam" : "One-time total",
    monthly: tr ? "Aylık toplam" : "Monthly total",
    acceptance: tr
      ? `<strong>Kabul:</strong> ${escapeHtml(clientName)} (${escapeHtml(businessName)}) onay kutusunu işaretleyip bu seçimi ${escapeHtml(acceptedAt)} tarihinde gönderdi (IP: ${escapeHtml(ip)}); Rav Link Inc. ile Ivory Brite arasındaki Dijital Pazarlama Hizmetleri Sözleşmesi'ni okuduğunu ve bütünüyle kabul ettiğini onayladı.`
      : `<strong>Acceptance:</strong> ${escapeHtml(clientName)} (${escapeHtml(businessName)}) ticked the acceptance box and submitted this selection on ${escapeHtml(acceptedAt)} (IP: ${escapeHtml(ip)}), confirming that they have read the Digital Marketing Services Agreement between Rav Link Inc. and Ivory Brite and accept it in full.`,
    attached: tr
      ? `Sözleşmenin tam metni bu e-postaya PDF olarak eklenmiştir (${escapeHtml(AGREEMENT_FILENAME)}).`
      : `The full agreement is attached to this email as a PDF (${escapeHtml(AGREEMENT_FILENAME)}).`,
    footer: tr
      ? `Bu onay, Rav Link çevrimiçi teklif sayfası üzerinden gönderildi. Ödeme: ${escapeHtml(AGENCY_EMAIL)} adresine Interac e-transfer.`
      : `This acceptance was submitted through the Rav Link online proposal page. Payment is by Interac e-transfer to ${escapeHtml(AGENCY_EMAIL)}.`,
    subject: tr ? `${businessName} — Sözleşme onaylandı: ${summary.title}` : `${businessName} — Agreement accepted: ${summary.title}`,
  };

  const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;background:#f5f4f8;padding:28px 12px;">
        <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e8e6ed;border-radius:16px;overflow:hidden;">
          <div style="padding:24px;background:#5b2dff;color:#fff;">
            <div style="font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;opacity:.78;margin-bottom:8px;">${t.kicker}</div>
            <h1 style="margin:0 0 8px;font-size:24px;">${escapeHtml(clientName)}</h1>
            <p style="margin:0;font-size:14px;opacity:.9;">${escapeHtml(businessName)} · ${escapeHtml(clientEmail)}</p>
          </div>
          <div style="padding:24px;">
            <h3 style="margin:0 0 10px;font-size:16px;color:#17151b;">${t.selected}: ${escapeHtml(summary.title)}</h3>
            <table style="width:100%;border-collapse:collapse;border:1px solid #ececf2;border-radius:10px;overflow:hidden;margin-bottom:16px;">
              ${lineRows}
              <tr>
                <td style="padding:10px 14px;color:#17151b;font-size:14px;font-weight:700;">${t.oneTime}</td>
                <td style="padding:10px 14px;color:#17151b;font-size:14px;font-weight:700;text-align:right;">${escapeHtml(money(summary.setupTotal))}</td>
              </tr>
              <tr>
                <td style="padding:10px 14px;color:#17151b;font-size:14px;font-weight:700;">${t.monthly}</td>
                <td style="padding:10px 14px;color:#17151b;font-size:14px;font-weight:700;text-align:right;">${escapeHtml(money(summary.monthlyTotal))}/mo</td>
              </tr>
            </table>
            <div style="background:#f4f0ff;border:1px solid #ddd2ff;border-radius:10px;padding:14px 16px;margin-bottom:18px;">
              <p style="margin:0;font-size:13px;line-height:1.6;color:#21164d;">${t.acceptance}</p>
            </div>
            <p style="margin:0;font-size:14px;color:#17151b;">${t.attached}</p>
          </div>
          <div style="padding:18px 24px;background:#f7f6f9;color:#77727f;font-size:11px;line-height:1.5;">
            ${t.footer}
          </div>
        </div>
      </div>`;

  const text = tr
    ? `TEKLİF ONAYLANDI — ${businessName}\n` +
      `Ad: ${clientName}\nE-posta: ${clientEmail}\n` +
      `Onay tarihi: ${acceptedAt} (IP: ${ip})\n\n` +
      `SEÇİM: ${summary.title}\n` +
      summary.lines.map((l) => `  - ${l.label}: ${l.price}`).join("\n") +
      `\n  Tek seferlik toplam: ${money(summary.setupTotal)}\n` +
      `  Aylık toplam: ${money(summary.monthlyTotal)}/mo\n\n` +
      `KABUL: ${clientName} (${businessName}), Dijital Pazarlama Hizmetleri Sözleşmesi'ni kabul ettiğini onayladı.\n\n` +
      `Sözleşmenin tam metni ${AGREEMENT_FILENAME} olarak eklenmiştir.\n` +
      `Ödeme: ${AGENCY_EMAIL} adresine Interac e-transfer.`
    : `PROPOSAL ACCEPTED — ${businessName}\n` +
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
    subject: t.subject,
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
    const lang = payload.lang === "tr" ? "tr" : "en";

    if (!clientName) {
      return res.status(400).json({ ok: false, message: lang === "tr" ? "Ad Soyad gereklidir." : "Name is required." });
    }
    if (!EMAIL_RE.test(clientEmail)) {
      return res.status(400).json({ ok: false, message: lang === "tr" ? "Geçerli bir e-posta adresi gereklidir." : "A valid email address is required." });
    }
    if (payload.accepted !== true) {
      return res.status(400).json({ ok: false, message: lang === "tr" ? "Göndermek için sözleşmenin kabul edilmesi gerekir." : "The agreement must be accepted to send." });
    }

    const resolved = resolveSelection(payload, lang);
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
      lang,
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
