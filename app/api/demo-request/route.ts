import { supabaseAdmin } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    if (!supabaseAdmin) {
      console.error("Supabase admin client not configured");
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { firstName, lastName, email, practiceName, role, message } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "First name, last name, and email are required" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email" },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin.from("demo_requests").insert({
      first_name: firstName,
      last_name: lastName,
      email,
      practice_name: practiceName || null,
      role: role || null,
      message: message || null,
      source: "website",
    });

    if (error) throw error;

    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        const escape = (s: string) =>
          String(s).replace(/[&<>"']/g, (c) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
          }[c] as string));

        await resend.emails.send({
          from: "Tether Health <updates@tetherhealth.co>",
          to: "support@tetherhealth.co",
          replyTo: email,
          subject: `Demo Request: ${firstName} ${lastName} — ${practiceName || "No practice name"}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #0C0D0F; background: #F7F5F0;">
              <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #00A882; margin-bottom: 12px;">New Demo Request</div>
              <h2 style="font-size: 22px; font-weight: 600; margin: 0 0 24px; color: #0C0D0F; letter-spacing: -0.01em;">${escape(firstName)} ${escape(lastName)}</h2>
              <table style="width: 100%; border-collapse: collapse; background: #ffffff; border: 1px solid rgba(0,0,0,0.08); border-radius: 12px; overflow: hidden;">
                <tbody>
                  <tr><td style="padding: 12px 16px; font-size: 12px; font-weight: 600; color: #8C8A85; width: 110px; text-transform: uppercase; letter-spacing: 0.06em; border-bottom: 1px solid rgba(0,0,0,0.06);">Email</td><td style="padding: 12px 16px; font-size: 14px; color: #0C0D0F; border-bottom: 1px solid rgba(0,0,0,0.06);"><a href="mailto:${escape(email)}" style="color: #00A882; text-decoration: none;">${escape(email)}</a></td></tr>
                  <tr><td style="padding: 12px 16px; font-size: 12px; font-weight: 600; color: #8C8A85; text-transform: uppercase; letter-spacing: 0.06em; border-bottom: 1px solid rgba(0,0,0,0.06);">Practice</td><td style="padding: 12px 16px; font-size: 14px; color: #0C0D0F; border-bottom: 1px solid rgba(0,0,0,0.06);">${escape(practiceName || "—")}</td></tr>
                  <tr><td style="padding: 12px 16px; font-size: 12px; font-weight: 600; color: #8C8A85; text-transform: uppercase; letter-spacing: 0.06em; border-bottom: 1px solid rgba(0,0,0,0.06);">Role</td><td style="padding: 12px 16px; font-size: 14px; color: #0C0D0F; border-bottom: 1px solid rgba(0,0,0,0.06);">${escape(role || "—")}</td></tr>
                  <tr><td style="padding: 12px 16px; font-size: 12px; font-weight: 600; color: #8C8A85; text-transform: uppercase; letter-spacing: 0.06em; vertical-align: top;">Message</td><td style="padding: 12px 16px; font-size: 14px; color: #0C0D0F; line-height: 1.6; white-space: pre-wrap;">${escape(message || "—")}</td></tr>
                </tbody>
              </table>
              <p style="font-size: 12px; color: #8C8A85; margin: 24px 0 0;">Reply directly to this email to respond to ${escape(firstName)}.</p>
            </div>
          `,
        });

        await resend.emails.send({
          from: "Tether Health <updates@tetherhealth.co>",
          to: email,
          replyTo: "support@tetherhealth.co",
          subject: "Demo request received — Tether Health",
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 24px; color: #0C0D0F; background: #F7F5F0;">
              <img src="https://www.tetherhealth.co/LOGO.jpeg" alt="Tether" width="40" height="40" style="margin-bottom: 24px;" />
              <h2 style="font-size: 22px; font-weight: 600; margin: 0 0 12px; color: #0C0D0F; letter-spacing: -0.01em;">Thanks for your interest, ${escape(firstName)}.</h2>
              <p style="font-size: 15px; line-height: 1.65; color: #3D3B38; margin: 0 0 16px;">We received your demo request and will be in touch within 24 hours to schedule a walkthrough of Tether.</p>
              <p style="font-size: 15px; line-height: 1.65; color: #3D3B38; margin: 0 0 28px;">In the meantime, you can learn more about how Tether closes the referral loop at <a href="https://www.tetherhealth.co" style="color: #00A882; text-decoration: none;">tetherhealth.co</a>.</p>
              <a href="https://www.tetherhealth.co" style="display: inline-block; background: #E8501A; color: #ffffff; padding: 11px 24px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600;">Visit tetherhealth.co</a>
              <hr style="border: none; border-top: 1px solid rgba(0,0,0,0.08); margin: 36px 0 20px;" />
              <p style="font-size: 12px; color: #8C8A85; margin: 0; line-height: 1.6;">Tether Health, Inc.<br/><a href="mailto:support@tetherhealth.co" style="color: #00A882; text-decoration: none;">support@tetherhealth.co</a></p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Resend email failed:", emailError);
      }
    }

    return NextResponse.json({ message: "success" });
  } catch (err) {
    console.error("Demo request error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
