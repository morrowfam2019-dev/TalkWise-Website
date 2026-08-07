import "server-only";

import { isBrevoConfigured, sendTransactionalEmail, toE164, upsertContact } from "@/lib/marketing/brevo";

export type SubscriberInput = {
  email: string;
  source: string;
  interests?: string[];
  role?: string;
  phone?: string;
  emailConsent: boolean;
  smsConsent: boolean;
  /** Provenance for the consent record. */
  consentedAt: string;
  consentIp?: string;
  consentUserAgent?: string;
};

/**
 * Single write path for every list-building surface on the site.
 *
 * This list is contact permission only — it is not an account and grants no
 * lesson access. Membership lives entirely on Whop.
 *
 * Contacts go to Brevo, which holds both the list and the SMS channel.
 * Consent provenance (timestamp, IP) travels with the contact: if a recipient
 * ever disputes opting in, that record is the evidence. Never write a
 * subscriber with `emailConsent: false`, and never text a number stored
 * without `smsConsent: true`.
 */
export async function addSubscriber(input: SubscriberInput) {
  const email = input.email.trim().toLowerCase();
  // The number is only kept — and only sent to Brevo — with SMS consent.
  const smsPhone = input.smsConsent && input.phone ? toE164(input.phone) : undefined;

  const record = { ...input, email, phone: smsPhone };

  if (!isBrevoConfigured()) {
    // Before keys are set, don't drop the signup silently — make it visible in
    // the server log so nothing is lost during setup and local development.
    console.warn("[subscriber] Brevo not configured; logging only:", record);
    return record;
  }

  try {
    await upsertContact({
      email,
      smsPhone,
      role: input.role,
      interests: input.interests,
      source: input.source,
      emailConsent: input.emailConsent,
      smsConsent: input.smsConsent,
      consentedAt: input.consentedAt,
      consentIp: input.consentIp,
    });
  } catch (error) {
    // Log the full payload so a failed signup can be recovered by hand rather
    // than lost. The route turns this into a friendly retry message.
    console.error("[subscriber] RECOVERABLE — Brevo write failed:", record, error);
    throw error;
  }

  // The contact is already saved at this point, so a confirmation-email
  // hiccup shouldn't fail the signup itself — just log it for follow-up.
  if (input.emailConsent) {
    try {
      await sendTransactionalEmail({
        to: [{ email }],
        subject: "You're on the TalkWise list",
        textContent:
          "Thanks for signing up for TalkWise updates.\n\n" +
          "You'll hear from us with practice ideas, new lesson announcements, and the occasional printable — nothing else.\n\n" +
          "This isn't a membership and doesn't unlock lessons. If you'd like to join TalkWise, visit https://whop.com/talkwise-academy.\n\n" +
          "You can unsubscribe any time from the link in any email we send.\n\n" +
          "— The TalkWise Academy team",
      });
    } catch (error) {
      console.error("[subscriber] confirmation email failed (contact was still saved):", email, error);
    }
  }

  return record;
}
