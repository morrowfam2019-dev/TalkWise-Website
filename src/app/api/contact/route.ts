import { NextResponse } from "next/server";
import { z } from "zod";

import { sendTransactionalEmail } from "@/lib/marketing/brevo";
import { site } from "@/lib/site";

const schema = z.object({
  name: z.string().min(1, "Please tell us your name.").max(120),
  email: z.email("Enter a valid email address."),
  topic: z.string().min(1).max(64),
  message: z.string().min(5, "Please add a little more detail.").max(5000),
  organization: z.string().max(160).optional(),
  /** Honeypot. Any value means a bot filled a hidden field. */
  company: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    // Silently accept honeypot hits so bots learn nothing from the response.
    if (parsed.error.issues.some((issue) => issue.path[0] === "company")) {
      return NextResponse.json({ message: "Message received. We'll reply soon." });
    }
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "Please check the form and try again." },
      { status: 422 },
    );
  }

  const { company: _honeypot, ...enquiry } = parsed.data;
  console.info("[contact]", { ...enquiry, receivedAt: new Date().toISOString() });

  try {
    await sendTransactionalEmail({
      to: [{ email: site.contactEmail }],
      subject: `[TalkWise contact] ${enquiry.topic} — ${enquiry.name}`,
      textContent:
        `From: ${enquiry.name} <${enquiry.email}>\n` +
        (enquiry.organization ? `Organization: ${enquiry.organization}\n` : "") +
        `Topic: ${enquiry.topic}\n\n${enquiry.message}`,
      // Lets Aaron just hit reply instead of copying the address out of the body.
      replyTo: { email: enquiry.email, name: enquiry.name },
    });
  } catch (error) {
    console.error("[contact] email delivery failed — see log above for the message content:", error);
    return NextResponse.json(
      { message: "We could not send that right now. Please try again or email us directly." },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: "Message received. We usually reply within two business days." });
}
