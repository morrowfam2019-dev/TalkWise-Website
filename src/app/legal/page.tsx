import type { Metadata } from "next";

import { LegalPage } from "@/components/shared/legal-page";
import { EDUCATIONAL_POSITION, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Legal Notices",
  description: "Intellectual property, AI content, community guidelines, and accessibility.",
  alternates: { canonical: "/legal" },
};

/**
 * Source: consolidates several documents from the TalkWise Legal &
 * Compliance library (Drive, effective 2026-08-01) that don't each warrant
 * their own nav-linked page: L-005 Copyright Policy, L-006 Intellectual
 * Property Policy, L-017 Trademark Usage Policy, L-013 AI Usage & Content
 * Policy, L-011 DMCA Copyright Policy, L-007 Community Guidelines, L-009
 * Parent & Minor Participation Policy, L-012 Accessibility Statement.
 * The educational-position, consult-a-professional, and language/accent
 * sections come from the V2 Brand System Standard, not this library — keep
 * both sourced separately if either changes.
 */
export default function LegalNoticesPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Notices and disclosures."
      updated="August 1, 2026"
      documentId="L-005 · L-006 · L-007 · L-009 · L-011 · L-012 · L-013 · L-017"
      intro="The boundaries we operate inside, our intellectual property, and how we keep the community and its children safe — stated once, clearly, in one place."
      sections={[
        {
          heading: "Educational position",
          paragraphs: [
            EDUCATIONAL_POSITION,
            "This is not a disclaimer we tolerate — it governs how every lesson is written. Our content standards prohibit therapy, treatment, cure, diagnostic, and guaranteed-outcome language throughout the platform.",
          ],
        },
        {
          heading: "When to consult a professional",
          paragraphs: [
            "If you have concerns about a learner's speech, language, hearing, or development, consult a licensed speech-language pathologist, physician, or appropriate qualified professional.",
            "TalkWise is designed to sit alongside professional care, not in place of it. Where a professional is the right next step, our materials say so.",
          ],
        },
        {
          heading: "Language and accents",
          paragraphs: [
            "TalkWise teaches American English pronunciation as a learning target. This does not imply that other varieties of English are incorrect or inferior.",
            "We do not shame accents, speech differences, parents, children, or learners. Content that does is not published.",
          ],
        },
        {
          heading: "Intellectual property and trademarks",
          paragraphs: [
            "Unless stated otherwise in writing, everything TalkWise creates is our exclusive property — including educational videos, lesson plans, scripts, worksheets, assessments, curriculum frameworks, motion graphics, illustrations, AI-generated content, and our characters (Miss Maya, Mr. Diego, TJ, and any future TalkWise character) — covering each character's name, design, personality, and educational role.",
            "TalkWise, TalkWise Academy, \"Building Confidence Through Communication,\" our logos, and our brand identity are also our proprietary marks. Without our prior written permission, no one may use them in a business name, a confusingly similar name, advertising, a domain name, a social media username, or merchandise, or in any way that could suggest we endorse something we don't.",
            "Membership grants a license to access this content for personal educational use — never ownership. Copying our videos, redistributing worksheets, reselling materials, removing copyright notices, or using TalkWise content to train an AI model or build a competing product are all prohibited without our written permission.",
            "We enforce these rights through copyright and trademark claims, DMCA notices, platform reporting, cease-and-desist notices, account termination, and legal action where appropriate.",
          ],
        },
        {
          heading: "AI-generated content",
          paragraphs: [
            "TalkWise uses artificial intelligence to help create educational graphics, motion graphics, video assets, scripts, and other production assets. AI-assisted content is reviewed and curated before publication whenever reasonably practical, and educational quality, learner confidence, and clarity always take priority over automation.",
            "Every asset produced this way — images, video, scripts, prompt libraries, character artwork — becomes TalkWise's intellectual property unless we've agreed otherwise in writing. You may not train an AI system on TalkWise materials, redistribute AI-generated TalkWise resources, or claim them as your own.",
          ],
        },
        {
          heading: "Reporting copyright infringement",
          paragraphs: [
            "If you believe content on TalkWise infringes your copyright, send a written notice identifying the copyrighted work, the allegedly infringing material, how to locate it, your contact information, a good-faith statement that the use is unauthorized, a statement that your notice is accurate, and your signature.",
            "We may review the complaint, request more information, or temporarily remove the material while we look into it. If content is removed this way, the affected user may submit a counter-notification where the law allows, which we review before restoring anything. Knowingly false claims or counter-notifications can carry legal liability, and repeat infringers may have their accounts suspended or terminated.",
          ],
        },
        {
          heading: "Community guidelines",
          paragraphs: [
            "Our community exists to be a safe, encouraging place to build communication confidence. We expect respect, kindness, patience, and constructive communication toward other members, staff, and guest instructors — harassment, bullying, discrimination, threats, and abusive behavior are not tolerated.",
            "Members may share their own learning experiences, progress, questions, and encouragement. They may not share paid TalkWise materials, copyrighted lessons, downloadable resources, or anyone else's personal or account information.",
            "We moderate the community — removing posts or comments, and suspending or terminating accounts — to keep it safe and supportive. Report harassment, safety concerns, or copyright violations through our support channels, and we'll look into it as promptly as reasonably possible.",
          ],
        },
        {
          heading: "Child safety and the Parent & Minor Participation Policy",
          paragraphs: [
            "Child-facing content is held to a stricter standard than any other material we produce. Child-likeness safeguards are mandatory wherever our child character appears, and child-facing experiences are designed for use with a parent or caregiver present.",
            "Every TalkWise account is held by an adult, and children participate through that adult's account and supervision. Parents and legal guardians are responsible for supervising participation, deciding whether content is appropriate for their child, monitoring account activity, and seeking professional evaluation when a child needs more support than TalkWise provides.",
            "Personal information should never be posted publicly, and private communication between unrelated adults and minors through TalkWise is prohibited outside approved educational features. Any behavior that threatens a child's safety can result in immediate account suspension or permanent removal — report safety concerns right away through our support channels.",
          ],
        },
        {
          heading: "Accessibility",
          paragraphs: [
            "Accessibility is one of our core values — we believe everyone deserves the opportunity to build confidence through communication. We continually work to make our educational content, digital products, and learning experiences usable by a wide range of learners.",
            "Where available, this can include closed captions, visual demonstrations, high-contrast visuals, clear narration, simplified lesson layouts, mobile-friendly content, and keyboard-accessible navigation where our hosting platform supports it. Some of these features depend on the capabilities of third-party platforms we build on, so we can't guarantee compatibility with every device, browser, or assistive technology — but we make reasonable efforts to use what's available.",
            `If something on this site is not usable for you, tell us at ${site.contactEmail} and we'll treat it as a defect, not a feature request.`,
          ],
        },
        {
          heading: "Testimonials",
          paragraphs: [
            "We publish learner and family testimonials only with written permission. Testimonials describe individual experiences and are not a promise of similar results.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            `Legal enquiries go to ${site.contactEmail}.`,
            "For membership, billing, and account terms, see [Terms of Service](/terms).",
          ],
        },
      ]}
    />
  );
}
