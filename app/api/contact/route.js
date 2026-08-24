import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body || {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are all required." },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { error: "That email address doesn't look valid." },
        { status: 400 }
      );
    }

    // Wire this up to an email provider (Resend, Postmark, SendGrid) or a
    // database insert here. Logged for now so the route works out of the box.
    console.log("New contact form submission:", { name, email, message });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Unexpected error processing the request." },
      { status: 500 }
    );
  }
}
