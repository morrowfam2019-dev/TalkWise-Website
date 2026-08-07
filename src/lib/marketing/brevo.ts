import "server-only";

/**
 * Brevo client — the single place this app talks to Brevo.
 *
 * Brevo holds both the contact list and the SMS channel, so there is no
 * separate database for subscribers. Contacts are upserted (`updateEnabled`),
 * meaning a repeat signup updates the existing contact instead of erroring.
 *
 * Required env:
 *   BREVO_API_KEY        — from Brevo → SMTP & API → API Keys
 *   BREVO_LIST_ID        — numeric id of the list to add contacts to
 *
 * See docs/brevo-setup.md for the attributes that must exist in Brevo first.
 */

const API_ROOT = "https://api.brevo.com/v3";

export type BrevoContact = {
  email: string;
  /** E.164, digits only with country code. Omitted unless SMS consent is given. */
  smsPhone?: string;
  role?: string;
  interests?: string[];
  source: string;
  emailConsent: boolean;
  smsConsent: boolean;
  consentedAt: string;
  consentIp?: string;
};

export function isBrevoConfigured() {
  return Boolean(process.env.BREVO_API_KEY && process.env.BREVO_LIST_ID);
}

/**
 * Normalizes a typed phone number to E.164, which is the only format Brevo
 * accepts for SMS. Assumes US/Canada when no country code is present, since
 * that is our required baseline market.
 */
export function toE164(input: string): string | undefined {
  const digits = input.replace(/\D/g, "");
  if (!digits) return undefined;
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  // Already international, or something we shouldn't guess at.
  return digits.length >= 8 ? `+${digits}` : undefined;
}

export async function upsertContact(contact: BrevoContact) {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID);

  if (!apiKey || !Number.isFinite(listId)) {
    throw new Error("Brevo is not configured (BREVO_API_KEY / BREVO_LIST_ID).");
  }

  const response = await fetch(`${API_ROOT}/contacts`, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email: contact.email,
      listIds: [listId],
      updateEnabled: true,
      attributes: {
        // SMS is a Brevo built-in attribute and is what enables texting.
        ...(contact.smsPhone ? { SMS: contact.smsPhone } : {}),
        ROLE: contact.role ?? "",
        INTERESTS: contact.interests?.join(", ") ?? "",
        SIGNUP_SOURCE: contact.source,
        EMAIL_CONSENT: contact.emailConsent,
        SMS_CONSENT: contact.smsConsent,
        CONSENT_DATE: contact.consentedAt,
        CONSENT_IP: contact.consentIp ?? "",
      },
    }),
  });

  if (response.ok) return;

  // Brevo returns 400 duplicate_parameter when a contact exists and cannot be
  // updated in place. That is not a failure from the visitor's point of view.
  const body = (await response.json().catch(() => null)) as { code?: string; message?: string } | null;
  if (response.status === 400 && body?.code === "duplicate_parameter") return;

  throw new Error(
    `Brevo responded ${response.status}: ${body?.message ?? "unknown error"} (${body?.code ?? "no code"})`,
  );
}
