import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bugucam@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

app.post("/api/contact", async (req, res) => {
  try {
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

    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false });
  }
});

app.listen(port, () => {
  console.log(`Contact API listening on ${port}`);
});
