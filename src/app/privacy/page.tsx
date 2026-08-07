import type { Metadata } from "next";

import { LegalPage } from "@/components/shared/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What TalkWise collects, why, and what we never do with it.",
  alternates: { canonical: "/privacy" },
};

/**
 * Source: L-002 Privacy Policy, TalkWise Legal & Compliance library
 * (Drive, effective 2026-08-01). Section 4 (Children's Privacy / COPPA) is
 * transcribed in full — it is the most legally load-bearing part of this
 * page and must not be paraphrased loosely. Sections on consent toggles,
 * Whop, and Brevo describe this site's actual implementation and are not
 * from the source document; keep them in sync with the real code if either
 * changes.
 */
export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="What we collect, and what we never do."
      updated="August 1, 2026"
      documentId="L-002"
      intro="Short version: we collect what we need to run your account and send what you asked for. We do not sell your information, and children's data is handled more carefully than anything else here."
      sections={[
        {
          heading: "What we collect",
          paragraphs: [
            "We collect information you give us directly and a small amount generated automatically when you use the site.",
          ],
          list: [
            "Account, membership, and billing information — handled by Whop, our membership and payment platform. Full card numbers never reach our servers.",
            "Mailing list details — your email address, and optionally your phone number, role, and interests.",
            "Consent records — which permissions you gave, and when, so we can show your sign-up was genuine.",
            "Device, browser, and IP information, and usage analytics — which pages and lessons you use, for security and improvement.",
            "Community activity and customer support communications, where applicable.",
            "Parent or guardian information, and any child account information a parent or guardian chooses to provide.",
          ],
        },
        {
          heading: "How we use it",
          paragraphs: ["We use your information for a short, specific list of purposes."],
          list: [
            "Creating and running your account, and providing educational services.",
            "Processing payments.",
            "Personalizing learning experiences and improving the platform.",
            "Responding to support requests and maintaining account security.",
            "Sending the emails you asked for, and important account notifications.",
            "Complying with legal obligations.",
          ],
        },
        {
          heading: "Children's privacy (COPPA)",
          paragraphs: [
            "TalkWise Academy is designed for families. Our account structure is built to protect children.",
            "Adult-held accounts. All TalkWise accounts must be created and held by an adult at least 18 years old (or the age of majority in their jurisdiction) — typically a parent or legal guardian. Children access TalkWise educational content through, and under the supervision of, the account-holding adult.",
            "No direct collection from children. We do not knowingly collect personal information directly from children under 13. All account information, billing information, and communications are provided by the adult account holder. Any information about a child — such as a first name or learning progress — is provided voluntarily by the parent or legal guardian, who consents to its use for educational purposes by providing it.",
            "Community participation. Community features are intended for the adult account holder. Parents who permit a child to participate under their account remain responsible for supervising that participation. Children should never post personal information — full name, age, school, location, contact information, or photos — in community areas.",
            "Parental rights. A parent or legal guardian may at any time: review the information associated with their account; request correction of inaccurate information; request deletion of information relating to their child; and withdraw consent for further use of their child's information, subject to legal retention requirements. Requests go through official TalkWise support channels and are honored as promptly as reasonably possible.",
            "If we learn of under-13 data. If we learn that personal information has been collected directly from a child under 13 without verified parental consent, we delete it as quickly as reasonably possible.",
          ],
        },
        {
          heading: "Email and text messages",
          paragraphs: [
            "Email and text permissions on this site are separate, and both start switched off. Ticking one never opts you into the other.",
            "Marketing emails require your explicit consent, and every one carries a working unsubscribe link that takes effect immediately.",
            "Text messages require their own explicit consent and are recurring. Consent to texts is never a condition of purchase. Message and data rates may apply. Reply STOP to cancel or HELP for help at any time.",
            "We store your phone number for messaging only if you consented to texts. Withdraw that consent and we stop using it.",
          ],
        },
        {
          heading: "Payment information",
          paragraphs: [
            "Payment processing is handled by Whop, a secure third-party payment provider. We do not intentionally store complete payment card information on our servers.",
          ],
        },
        {
          heading: "Cookies and analytics",
          paragraphs: [
            "We may use cookies and similar technologies to remember your preferences, improve website functionality, analyze platform usage, and enhance the learning experience. You can manage cookie preferences through your browser settings where available.",
          ],
        },
        {
          heading: "Who else handles your data",
          paragraphs: [
            "We do not sell personal information. We share it only where necessary, with providers who process it on our instructions and are expected to maintain appropriate security standards.",
          ],
          list: [
            "Whop — membership accounts, payment processing, and course delivery.",
            "Our email and SMS provider — sending the updates you have opted into.",
            "Hosting and analytics providers, and legal authorities where required by law.",
          ],
        },
        {
          heading: "Data security and retention",
          paragraphs: [
            "We take reasonable administrative, technical, and organizational measures to protect personal information against unauthorized access, disclosure, alteration, or destruction. No method of electronic storage or transmission can be guaranteed completely secure.",
            "Personal information is retained only as long as reasonably necessary to run your account, provide our services, meet legal obligations, resolve disputes, and enforce our agreements. It may be securely deleted once no longer required.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "Where permitted by applicable law, you may request to access, correct, update, or delete your personal information, and request data portability where applicable. Some information may be retained where legally required.",
          ],
        },
        {
          heading: "International users",
          paragraphs: [
            "If you access TalkWise from outside the United States, you acknowledge that your information may be processed in countries where TalkWise or its service providers operate.",
          ],
        },
        {
          heading: "Policy changes",
          paragraphs: [
            "We may update this Privacy Policy periodically. Updated versions take effect upon publication unless stated otherwise.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [`Questions about privacy go to ${site.contactEmail}. A person reads them.`],
        },
      ]}
    />
  );
}
