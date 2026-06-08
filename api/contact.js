require("dotenv").config();
const nodemailer = require("nodemailer");

const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465;
const smtpSecure = process.env.SMTP_SECURE !== "false";
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const emailTo = process.env.EMAIL_TO || emailUser;

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure,
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    res.status(400).json({ error: "Please provide name, email, and message." });
    return;
  }

  if (!emailUser || !emailPass) {
    res.status(500).json({ error: "Email service is not configured." });
    return;
  }

  const mailOptions = {
    from: `${name} <${emailUser}>`,
    to: emailTo,
    subject: `New message from ${name} via portfolio website`,
    replyTo: email,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 8px 20px rgba(0,0,0,0.08);">
          <div style="background: linear-gradient(135deg, #1f2937, #111827); padding: 22px; color: white; text-align: center;">
            <h2 style="margin: 0; font-size: 18px; letter-spacing: 0.5px;">New Contact From Portfolio Website</h2>
          </div>
          <div style="padding: 25px; color: #111827;">
            <p style="font-size: 13px; color: #6b7280; margin-bottom: 20px;">You have received a new message from your website contact form.</p>
            <div style="margin-bottom: 15px;">
              <div style="display:flex; align-items:center; gap:8px; color:#374151; font-weight:600;">Name</div>
              <div style="margin-top:4px; color:#111827;">${name}</div>
            </div>
            <div style="margin-bottom: 15px;">
              <div style="display:flex; align-items:center; gap:8px; color:#374151; font-weight:600;">Email</div>
              <div style="margin-top:4px; color:#111827;">${email}</div>
            </div>
            <div style="margin-bottom: 10px;">
              <div style="display:flex; align-items:center; gap:8px; color:#374151; font-weight:600;">Message</div>
              <div style="margin-top:8px; background:#f9fafb; padding:15px; border-radius:8px; border-left:4px solid #111827; white-space: pre-line; line-height:1.6; color:#111827;">
                ${message.replace(/\n/g, "<br />")}
              </div>
            </div>
          </div>
          <div style="text-align:center; padding:14px; font-size:12px; color:#6b7280; background:#f3f4f6;">This email was generated from your website contact form.</div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("Failed to send email:", error);
    res.status(500).json({ error: "Unable to send message right now." });
  }
};
