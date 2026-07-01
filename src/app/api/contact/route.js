import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { name, email, msg } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required fields." },
        { status: 400 }
      );
    }

    // Set up nodemailer transport (we read credentials from process.env)
    const transporter = nodemailer.createTransport({
      host: process.env.NEXT_PUBLIC_SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.NEXT_PUBLIC_SMTP_PORT || "587", 10),
      secure: process.env.NEXT_PUBLIC_SMTP_SECURE === "true", // true for port 465, false for other ports
      auth: {
        user: process.env.NEXT_PUBLIC_SMTP_USER, // e.g. inquiry@yunawise.com or smtp user
        pass: process.env.NEXT_PUBLIC_SMTP_PASS, // smtp password
      },
    });

    const mailOptions = {
      from: `"company" <nisargpatel2466@gmail.com>`, 
      to: "nisargpatel2466@gmail.com", 
      replyTo: email,
      subject: `New Website Inquiry from ${name}`,
      text: `You have received a new inquiry from your website contact form.

Name: ${name} 
Email: ${email}

Message:
${msg}
`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #f8fafc;">
          <h2 style="color: #4f46e5; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-top: 0;">New Website Inquiry</h2>
          <p style="margin: 16px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 16px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #4f46e5; text-decoration: none;">${email}</a></p>
          <div style="margin-top: 20px; padding: 15px; background-color: #ffffff; border-left: 4px solid #4f46e5; border-radius: 4px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);">
            <strong style="display: block; margin-bottom: 8px; color: #334155;">Message Details:</strong>
            <p style="margin: 0; color: #475569; white-space: pre-wrap;">${msg}</p>
          </div>
          <p style="margin-top: 30px; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 15px; text-align: center;">
            This email was generated automatically by the contact form on your website.
          </p>
        </div>
      `,
    };

    // If SMTP credentials aren't set up, log the details so local development succeeds
    if (!process.env.NEXT_PUBLIC_SMTP_USER || !process.env.NEXT_PUBLIC_SMTP_PASS) {
      console.warn("SMTP credentials are not configured in environment variables. Logging mail details locally:", mailOptions);
      return NextResponse.json({
        success: true,
        mocked: true,
        message: "Inquiry logged locally. Configure NEXT_PUBLIC_SMTP_USER and NEXT_PUBLIC_SMTP_PASS to send real emails."
      });
    }

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
