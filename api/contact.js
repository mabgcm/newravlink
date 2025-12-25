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
    const text = Object.entries(payload)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    await transporter.sendMail({
      from: "bugucam@gmail.com",
      to: "bugucam@gmail.com",
      subject: "New Lead Form Submission",
      text,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ ok: false });
  }
}
