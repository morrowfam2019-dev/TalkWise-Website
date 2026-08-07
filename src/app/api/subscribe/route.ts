import { NextResponse } from "next/server";
import { z } from "zod";

import { addSubscriber } from "@/lib/marketing/subscribers";

const schema = z
  .object({
    // Trim before validating: addresses pasted from a contacts app or an email
    // client routinely carry surrounding whitespace, and rejecting those would
    // turn a perfectly valid signup into a confusing error.
    email: z.string().trim().pipe(z.email("Enter a valid email address.")),
    source: z.string().min(1).max(64),
    interests: z.array(z.string().max(48)).max(10).optional(),
    role: z.string().max(48).optional(),
    phone: z.string().max(32).optional(),
    /** Inline forms (footer, lead magnets) imply email consent by submitting. */
    emailConsent: z.boolean().optional(),
    smsConsent: z.boolean().optional(),
  })
  .refine((data) => !data.smsConsent || Boolean(data.phone?.trim()), {
    message: "A phone number is required to consent to text messages.",
    path: ["phone"],
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
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "Invalid submission." },
      { status: 422 },
    );
  }

  try {
    await addSubscriber({
      ...parsed.data,
      emailConsent: parsed.data.emailConsent ?? true,
      smsConsent: parsed.data.smsConsent ?? false,
      // Consent records need provenance to be defensible later.
      consentedAt: new Date().toISOString(),
      consentIp: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
      consentUserAgent: request.headers.get("user-agent") ?? undefined,
    });
  } catch (error) {
    console.error("[subscribe] failed", error);
    return NextResponse.json(
      { message: "We could not save that right now. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: "You're on the list. Check your inbox." });
}
