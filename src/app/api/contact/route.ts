import { NextResponse } from "next/server";
import { Resend } from "resend";

// Env (see .env.example):
//   RESEND_API_KEY     required - https://resend.com/api-keys
//   CONTACT_TO_EMAIL   where leads land. Until you verify a domain in Resend,
//                      this must be the email you signed up to Resend with.
//   CONTACT_FROM_EMAIL optional - defaults to Resend's shared test sender.
const TO = process.env.CONTACT_TO_EMAIL ?? "krishnendughosal999@gmail.com";
const FROM = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

type Body = { name?: unknown; email?: unknown; message?: unknown; botcheck?: unknown };

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("Contact form: RESEND_API_KEY is not set");
    return NextResponse.json({ error: "Email service is not configured" }, { status: 503 });
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: the "botcheck" field is hidden from people, so only bots fill it.
  // Pretend it worked so they don't retry. (It used to be "company", which
  // Chrome autofilled for real visitors, silently dropping their messages.)
  if (typeof body.botcheck === "string" && body.botcheck.trim()) {
    console.warn("Contact form: honeypot filled, message dropped");
    return NextResponse.json({ success: true });
  }

  const name = typeof body.name === "string" ? body.name.trim().slice(0, 100) : "";
  const email = typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 5000) : "";

  if (name.length < 2 || !EMAIL_RE.test(email) || message.length < 10) {
    return NextResponse.json({ error: "Please check your name, email and message" }, { status: 400 });
  }

  const html = `
    <div style="font-family:-apple-system,Segoe UI,sans-serif;max-width:560px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px">
      <p style="margin:0 0 4px;color:#a3293d;font-size:12px;letter-spacing:.12em;text-transform:uppercase">New portfolio lead</p>
      <h2 style="margin:0 0 20px;color:#0f172a">${escapeHtml(name)}</h2>
      <p style="margin:0 0 6px;color:#475569"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
      <div style="margin-top:16px;padding:16px;background:#f8fafc;border-radius:8px;color:#0f172a;white-space:pre-wrap;line-height:1.6">${escapeHtml(message)}</div>
      <p style="margin:20px 0 0;color:#94a3b8;font-size:12px">Hit reply to answer ${escapeHtml(name)} directly.</p>
    </div>`;

  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Portfolio lead: ${name}`,
      html,
      text: `New portfolio lead\n\nName: ${name}\nEmail: ${email}\n\n${message}`,
    });
    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form failure:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
