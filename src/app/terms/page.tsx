import type { Metadata } from "next";

import { LegalPage } from "@/components/shared/legal-page";
import { EDUCATIONAL_POSITION, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms covering TalkWise membership, content, and accounts.",
  alternates: { canonical: "/terms" },
};

/**
 * Source: L-001 Terms of Service, folding in the substance (not just a
 * pointer) of L-004 Refund & Cancellation Policy and the license terms from
 * L-003 EULA — TalkWise Legal & Compliance library (Drive, effective
 * 2026-08-01). Community Guidelines (L-007) and the Parent & Minor
 * Participation Policy (L-009) live on the Legal Notices page instead of
 * here; the closing section links there.
 */
export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="The agreement, without the fog."
      updated="August 1, 2026"
      documentId="L-001"
      intro="These terms cover your TalkWise account, membership, and use of our lessons and materials. We have tried to write them so you can actually read them."
      sections={[
        {
          heading: "What TalkWise is",
          paragraphs: [
            EDUCATIONAL_POSITION,
            "Nothing on this platform is a clinical assessment, diagnosis, treatment plan, or substitute for care from a licensed professional. If you have concerns about a specific learner, consult a licensed speech-language pathologist or appropriate professional.",
          ],
        },
        {
          heading: "Acceptance and eligibility",
          paragraphs: [
            "By purchasing, accessing, browsing, or using any TalkWise product or service, you confirm you've read, understood, and agreed to these Terms. If you don't agree, please don't use TalkWise.",
            "You must be legally capable of entering a binding agreement to hold an account. Children use TalkWise through a parent or legal guardian's account, and that adult is responsible for supervising their use.",
          ],
        },
        {
          heading: "Your account",
          paragraphs: [
            "TalkWise accounts are hosted on Whop, our membership and course-delivery platform. Your use of Whop is also governed by Whop's own terms.",
            "Keep your password to yourself. You're responsible for activity under your account, and for providing accurate account information — tell us promptly if you think someone else has access.",
          ],
        },
        {
          heading: "Membership, billing, and refunds",
          paragraphs: [
            `Membership is $${site.membership.price} per month, processed through Whop, and renews automatically until you cancel. We don't receive or store your full card details.`,
            "You can cancel anytime from your membership settings on Whop. Cancelling stops future charges, and you keep access through the end of the period you've already paid for.",
            "Because TalkWise is a digital product that's immediately accessible on purchase, membership and content purchases are generally non-refundable once access has been granted. We may issue a refund at our discretion for duplicate charges, billing errors, a verified unauthorized transaction, a technical problem on our end that reasonably prevented access, or other exceptional circumstances — approving one refund doesn't set a precedent for the next request.",
            "If a payment fails, Whop will retry and notify you before access changes. Please contact us before opening a chargeback where possible; fraudulent or abusive chargebacks can result in account termination and loss of access.",
          ],
        },
        {
          heading: "Your license to use TalkWise content",
          paragraphs: [
            "Membership grants a limited, non-exclusive, non-transferable, revocable license to access and use TalkWise content for personal, non-commercial, educational purposes within your own household — it does not transfer ownership of anything.",
          ],
          list: [
            "You may watch lessons, download materials marked for download, and print worksheets for personal use.",
            "You may not copy, redistribute, resell, or publicly post our lessons or materials, or upload them to other platforms.",
            "You may not record or rebroadcast paid content, share your login, or use TalkWise materials to build a competing product or to train a machine-learning model.",
            "Schools and organizations need a separate partnership agreement — see the Partner page.",
          ],
        },
        {
          heading: "What we promise, and what we don't",
          paragraphs: [
            "We promise clear teaching, practical materials, and an honest description of what each product does. TalkWise content is provided \"as available,\" and we don't guarantee that every learner will reach a specific speech or communication outcome — progress depends on practice, consistency, age, and other personal factors outside our control.",
          ],
        },
        {
          heading: "Acceptable use",
          paragraphs: [
            "Don't share account access, scrape the platform, attempt to break its security, or use the community to harass anyone. Community spaces are moderated under our Community Guidelines, and we remove people who make them unpleasant.",
          ],
        },
        {
          heading: "Liability and termination",
          paragraphs: [
            "To the maximum extent the law allows, TalkWise and its owners, employees, contractors, and partners aren't liable for indirect, incidental, or consequential damages from using TalkWise — nothing here limits rights that can't legally be limited.",
            "We may suspend or terminate accounts that violate these Terms or engage in fraudulent, abusive, or unlawful conduct.",
          ],
        },
        {
          heading: "Changes and governing law",
          paragraphs: [
            "We may update these Terms at any time; updated versions take effect on publication unless stated otherwise. These Terms are governed by the applicable laws of the jurisdiction in which TalkWise is organized, except where consumer-protection law requires otherwise.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            `Questions about these Terms go to ${site.contactEmail}.`,
            "Our Community Guidelines, Parent & Minor Participation Policy, and intellectual-property rules live on the [Legal Notices](/legal) page.",
          ],
        },
      ]}
    />
  );
}
