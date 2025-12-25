import nodemailer from "nodemailer";

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
    const labelMap = {
      fullName: "Full Name",
      phone: "Phone",
      email: "Email",
      businessName: "Business Name",
      websiteOrSocial: "Website / Social",
      location: "Location",
      businessType: "Business Type",
      monthlyAdBudget: "Monthly Ad Budget",
      goal: "Goal",
      servicesInterested: "Services Interested",
      currentlyRunningAds: "Currently Running Ads",
      message: "Message",
    };

    const rows = Object.entries(payload).map(([key, value]) => {
      const label = labelMap[key] || key;
      const safeValue = value ? String(value) : "—";
      return `
        <tr>
          <td style="padding:10px 12px; border-bottom:1px solid #e6e6e6; color:#555; width:35%;"><strong>${label}</strong></td>
          <td style="padding:10px 12px; border-bottom:1px solid #e6e6e6; color:#111;">${safeValue}</td>
        </tr>
      `;
    });

    const text = Object.entries(payload)
      .map(([key, value]) => `${key}: ${value || "—"}`)
      .join("\n");

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
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: "bugucam@gmail.com",
      to: "bugucam@gmail.com",
      subject: "New Lead Form Submission",
      text,
      html,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ ok: false });
  }
}
