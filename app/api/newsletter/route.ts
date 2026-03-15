import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { NextResponse } from "next/server";

function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

const WELCOME_HTML = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a;">
  <img src="https://www.tetherhealth.co/LOGO.jpeg" alt="Tether" width="40" height="40" style="margin-bottom: 24px;" />
  <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 12px;">You're in.</h2>
  <p style="font-size: 15px; line-height: 1.6; color: #4a4a4a; margin-bottom: 20px;">Thanks for subscribing to updates from Tether Health. We'll send you product updates, referral management insights, and early access to new features.</p>
  <p style="font-size: 15px; line-height: 1.6; color: #4a4a4a; margin-bottom: 20px;">Tether is the referral network that connects primary care and specialty practices with real-time tracking, loop closure, and a shared directory your staff actually wants to use.</p>
  <a href="https://www.tetherhealth.co" style="display: inline-block; background: #0D9488; color: white; padding: 10px 24px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 500;">Learn more</a>
  <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 32px 0;" />
  <p style="font-size: 12px; color: #999;">Tether Health, Inc.<br/>support@tetherhealth.co</p>
</div>
`;

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email" },
        { status: 400 }
      );
    }

    const trimmed = String(email).trim().toLowerCase();
    const supabase = getSupabase();

    if (!supabase) {
      console.error("Newsletter: Supabase env not configured");
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 503 }
      );
    }

    const { error } = await supabase.from("newsletter_subscribers").insert({
      email: trimmed,
      source: "website",
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ duplicate: true }, { status: 200 });
      }
      throw error;
    }

    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "Tether Health <updates@tetherhealth.co>",
          to: trimmed,
          subject: "Welcome to the Tether network",
          html: WELCOME_HTML,
        });
      } catch (emailErr) {
        console.error("Newsletter Resend failed:", emailErr);
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Newsletter error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
