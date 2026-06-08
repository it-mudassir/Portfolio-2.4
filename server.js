require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465;
const smtpSecure = process.env.SMTP_SECURE !== "false";
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const emailTo = process.env.EMAIL_TO || emailUser;

if (!emailUser || !emailPass) {
  console.warn(
    "⚠️ EMAIL_USER and EMAIL_PASS must be set in your environment to send contact emails.",
  );
}

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure,
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.warn("Mail transporter verification failed:", error.message);
  } else {
    console.log("Mail transporter is ready");
  }
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, ".")));

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: "Please provide name, email, and message." });
  }

  if (!emailUser || !emailPass) {
    return res.status(500).json({ error: "Email service is not configured." });
  }

  const mailOptions = {
    from: `${name} <${emailUser}>`,
    to: emailTo,
    subject: `New message from ${name} via portfolio website`,
    replyTo: email,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
  <div style="
    font-family: Arial, sans-serif;
    background-color: #f4f6f8;
    padding: 30px;
  ">
    <div style="
      max-width: 600px;
      margin: auto;
      background: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 8px 20px rgba(0,0,0,0.08);
    ">

      <!-- Header -->
      <div style="
        background: linear-gradient(135deg, #1f2937, #111827);
        padding: 22px;
        color: white;
        text-align: center;
      ">
        <h2 style="margin: 0; font-size: 18px; letter-spacing: 0.5px;">
          New Contact From Portfolio Website
        </h2>
      </div>

      <!-- Body -->
      <div style="padding: 25px; color: #111827;">

        <p style="font-size: 13px; color: #6b7280; margin-bottom: 20px;">
          You have received a new message from your website contact form.
        </p>

        <!-- Name -->
        <div style="margin-bottom: 15px;">
          <div style="display:flex; align-items:center; gap:8px; color:#374151; font-weight:600;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 12c2.76 0 5-2.24 5-5S14.76 2 12 2 7 4.24 7 7s2.24 5 5 5z" stroke="#374151" stroke-width="2"/>
              <path d="M4 22c0-4.42 3.58-8 8-8s8 3.58 8 8" stroke="#374151" stroke-width="2"/>
            </svg>
            Name
          </div>
          <div style="margin-top:4px; color:#111827;">
            ${name}
          </div>
        </div>

        <!-- Email -->
        <div style="margin-bottom: 15px;">
          <div style="display:flex; align-items:center; gap:8px; color:#374151; font-weight:600;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M4 4h16v16H4V4z" stroke="#374151" stroke-width="2"/>
              <path d="M4 7l8 6 8-6" stroke="#374151" stroke-width="2"/>
            </svg>
            Email
          </div>
          <div style="margin-top:4px; color:#111827;">
            ${email}
          </div>
        </div>

        <!-- Message -->
        <div style="margin-bottom: 10px;">
          <div style="display:flex; align-items:center; gap:8px; color:#374151; font-weight:600;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8z" stroke="#374151" stroke-width="2"/>
            </svg>
            Message
          </div>

          <div style="
            margin-top:8px;
            background:#f9fafb;
            padding:15px;
            border-radius:8px;
            border-left:4px solid #111827;
            white-space: pre-line;
            line-height:1.6;
            color:#111827;
          ">
            ${message.replace(/\n/g, "<br />")}
          </div>
        </div>

      </div>

      <!-- Footer -->
      <div style="
        text-align:center;
        padding:14px;
        font-size:12px;
        color:#6b7280;
        background:#f3f4f6;
      ">
        This email was generated from your website contact form.
      </div>

    </div>
  </div>
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("Failed to send email:", error);
    return res.status(500).json({ error: "Unable to send message right now." });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
