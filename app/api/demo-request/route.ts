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

        await resend.emails.send({
          from: "Tether Health <updates@tetherhealth.co>",
          to: "support@tetherhealth.co",
          subject: `Demo Request: ${firstName} ${lastName} - ${practiceName || "No practice name"}`,
          html: `
            <p><strong>New demo request:</strong></p>
            <p>Name: ${firstName} ${lastName}</p>
            <p>Email: ${email}</p>
            <p>Practice: ${practiceName || "Not provided"}</p>
            <p>Role: ${role || "Not provided"}</p>
            <p>Message: ${message || "None"}</p>
          `,
        });

        await resend.emails.send({
          from: "Tether Health <updates@tetherhealth.co>",
          to: email,
          subject: "Demo request received - Tether Health",
          html: `
            <div style="font-family: -apple-system, sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a;">
              <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 12px;">Thanks for your interest, ${firstName}.</h2>
              <p style="font-size: 15px; line-height: 1.6; color: #4a4a4a;">We received your demo request and will be in touch within 24 hours to schedule a walkthrough of Tether.</p>
              <p style="font-size: 15px; line-height: 1.6; color: #4a4a4a;">In the meantime, you can learn more about how Tether works at <a href="https://www.tetherhealth.co" style="color: #0D9488;">tetherhealth.co</a>.</p>
              <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 32px 0;" />
              <p style="font-size: 12px; color: #999;">Tether Health, Inc.<br/>support@tetherhealth.co</p>
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
