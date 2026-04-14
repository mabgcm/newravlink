import nodemailer from "nodemailer";

const labelMap = {
  fullName: "Full Name",
  name: "Name",
  phone: "Phone",
  email: "Email",
  businessName: "Business Name",
  websiteOrSocial: "Website / Social",
  location: "Location",
  businessType: "Business Type",
  customerType: "Customer Type",
  geoTarget: "Geo Target",
  ecommercePlatform: "E-commerce Platform",
  googleBusiness: "Google Business",
  monthlyAdBudget: "Monthly Ad Budget",
  goal: "Goal",
  goals: "Goals",
  successMetric: "Success Metric",
  urgencyReason: "Urgency Reason",
  servicesInterested: "Services Interested",
  currentlyRunningAds: "Currently Running Ads",
  hasWebsite: "Website Status",
  socialPlatforms: "Social Platforms",
  socialManager: "Social Media Management",
  hasRunAds: "Has Run Ads",
  adsResult: "Ads Result",
  contentAssets: "Content Assets",
  analyticsSetup: "Analytics Setup",
  budgetRange: "Budget Range",
  involvementLevel: "Involvement Level",
  decisionMaker: "Decision Maker",
  previousAgency: "Previous Agency",
  previousAgencyIssue: "Previous Agency Issue",
  competitorAwareness: "Competitor Awareness",
  message: "Message",
};

const wizardSectionFields = [
  ["businessName", "Isletme"],
  ["phone", "Telefon"],
  ["businessType", "Sektor"],
  ["customerType", "Musteri tipi"],
  ["geoTarget", "Cografi hedef"],
  ["ecommercePlatform", "E-ticaret altyapisi"],
  ["googleBusiness", "Google Business"],
  ["goals", "Hedefler"],
  ["successMetric", "Basari olcutu"],
  ["urgencyReason", "Aciliyet"],
  ["hasWebsite", "Web sitesi"],
  ["socialPlatforms", "Sosyal medya"],
  ["socialManager", "SM yonetimi"],
  ["hasRunAds", "Reklam gecmisi"],
  ["adsResult", "Reklam sonucu"],
  ["contentAssets", "Icerik varligi"],
  ["analyticsSetup", "Analytics"],
  ["budgetRange", "Butce"],
  ["involvementLevel", "Dahillik"],
  ["decisionMaker", "Karar mercii"],
  ["previousAgency", "Onceki ajans"],
  ["previousAgencyIssue", "Onceki sorun"],
  ["competitorAwareness", "Rakip takibi"],
];

const formatValue = (value) => {
  if (Array.isArray(value)) {
    return value.length ? value.join(", ") : "—";
  }

  if (value === null || value === undefined || value === "") {
    return "—";
  }

  return String(value);
};

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bugucam@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const payload = req.body || {};
    const rows = Object.entries(payload).map(([key, value]) => {
      const label = labelMap[key] || key;
      const safeValue = escapeHtml(formatValue(value));
      return `
        <tr>
          <td style="padding:10px 12px; border-bottom:1px solid #e6e6e6; color:#555; width:35%;"><strong>${label}</strong></td>
          <td style="padding:10px 12px; border-bottom:1px solid #e6e6e6; color:#111;">${safeValue}</td>
        </tr>
      `;
    });

    const wizardSectionLines = wizardSectionFields
      .filter(([key]) => payload[key] !== undefined && payload[key] !== null && payload[key] !== "")
      .map(([key, label]) => `${label}: ${formatValue(payload[key])}`);

    const text = Object.entries(payload)
      .map(([key, value]) => `${key}: ${formatValue(value)}`)
      .join("\n");

    const wizardText = wizardSectionLines.length
      ? `\n\n--- LEAD WIZARD CEVAPLARI ---\n${wizardSectionLines.join("\n")}`
      : "";

    const wizardHtml = wizardSectionLines.length
      ? `
          <div style="padding:0 20px 20px 20px;">
            <div style="border-top:1px solid #ececf2; padding-top:18px;">
              <h3 style="margin:0 0 12px 0; font-size:16px; color:#111;">Lead Wizard Cevaplari</h3>
              <table style="width:100%; border-collapse:collapse; font-size:14px;">
                ${wizardSectionFields
                  .filter(([key]) => payload[key] !== undefined && payload[key] !== null && payload[key] !== "")
                  .map(
                    ([key, label]) => `
                      <tr>
                        <td style="padding:10px 12px; border-bottom:1px solid #e6e6e6; color:#555; width:35%;"><strong>${escapeHtml(
                          label,
                        )}</strong></td>
                        <td style="padding:10px 12px; border-bottom:1px solid #e6e6e6; color:#111;">${escapeHtml(
                          formatValue(payload[key]),
                        )}</td>
                      </tr>
                    `,
                  )
                  .join("")}
              </table>
            </div>
          </div>
        `
      : "";

    const html = `
      <div style="font-family:Arial, sans-serif; background:#f7f7fb; padding:24px;">
        <div style="max-width:640px; margin:0 auto; background:#ffffff; border:1px solid #ececf2; border-radius:12px; overflow:hidden;">
          <div style="padding:16px 20px; background:#5b2dff; color:#fff;">
            <h2 style="margin:0; font-size:18px; font-weight:600;">New Lead Form Submission</h2>
          </div>
          <div style="padding:8px 20px 20px 20px;">
            <table style="width:100%; border-collapse:collapse; font-size:14px;">
              ${rows.join("")}
            </table>
          </div>
          ${wizardHtml}
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: "bugucam@gmail.com",
      to: "bugucam@gmail.com",
      subject: "New Lead Form Submission",
      text: `${text}${wizardText}`,
      html,
    });

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ ok: false });
  }
}
