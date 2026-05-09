import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Allow CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields: name, email, and message are required." });
  }

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    console.error("Missing environment variables: EMAIL_USER or EMAIL_PASS");
    return res.status(500).json({ 
      error: "Server configuration error", 
      details: "Email credentials are not configured in environment variables." 
    });
  }

  // Configure your email transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  const mailOptions = {
    from: `"Portfolio Contact" <${emailUser}>`,
    to: emailUser, // Send to yourself
    subject: `New Portfolio Message from ${name}`,
    text: `
      You have a new message from your portfolio contact form.

      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #046BD2;">New Portfolio Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f4f4f4; padding: 15px; border-left: 4px solid #046BD2;">
          ${message.replace(/\n/g, "<br>")}
        </div>
      </div>
    `,
    replyTo: email,
  };

  try {
    // Verify transporter configuration
    await transporter.verify();
    
    // Send mail
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return res.status(500).json({ 
      error: "Failed to send email", 
      details: error.message || "Unknown error occurred"
    });
  }
}
