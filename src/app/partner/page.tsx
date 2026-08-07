import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { DISCLAIMER } from "@/lib/site";

export const metadata: Metadata = {
  title: "Partner With TalkWise",
  description:
    "Work with TalkWise: schools, organizations, professionals, media, sponsors, and affiliates.",
  alternates: { canonical: "/partner" },
};

const audiences = [
  {
    id: "schools",
    title: "Schools",
    body: "Bring TalkWise into classrooms and family-engagement programs. We supply the lessons, printables, and parent-facing materials; you keep your own curriculum and staffing.",
    points: ["Classroom and take-home materials", "Family engagement programs", "Volume access"],
  },
  {
    id: "organizations",
    title: "Organizations",
    body: "Libraries, community groups, nonprofits, and employers running English or family-literacy programs. Localized ESL paths are available by country and first language.",
    points: ["Community program licensing", "Localized ESL paths", "Program reporting"],
  },
  {
    id: "professionals",
    title: "Speech Professionals",
    body: "Licensed SLPs who want structured educational material for families to use between sessions. TalkWise supports your work — it does not replace or replicate it.",
    points: ["Between-session family material", "Printables and trackers", "Referral-friendly"],
  },
  {
    id: "media",
    title: "Media & Press",
    body: "Interviews, company information, character and product assets, and founder availability for stories about communication education.",
    points: ["Press assets", "Founder interviews", "Company background"],
  },
  {
    id: "sponsors",
    title: "Sponsors",
    body: "Sponsorship across TalkWise content, in categories that fit families and learners. Every placement is reviewed against our brand and compliance standards before it runs.",
    points: ["Content sponsorship", "Category exclusivity", "Reviewed placements"],
  },
  {
    id: "affiliates",
    title: "Affiliates",
    body: "Creators and educators who already talk to parents or English learners. Recurring commission on every member you refer.",
    points: ["Recurring commission", "Creator assets", "Transparent tracking"],
    // The Affiliate Program has no nav entry of its own — Partner & Affiliates
    // share one row, so this is what keeps /affiliates reachable.
    href: "/affiliates",
    cta: "See the full program",
  },
];

export default function PartnerPage() {
  return (
    <>
      <PageHero
        eyebrow="Partner with TalkWise"
        title="Work with us."
        lede="TalkWise is built as a system, not a stack of one-off content. That makes it straightforward to bring into a school, a program, a practice, or a channel."
      />

      <Section className="pt-0">
        <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {audiences.map((audience) => (
            <StaggerItem key={audience.id}>
              <GlassCard id={audience.id} className="h-full scroll-mt-32 p-8">
                <h2 className="font-display text-2xl">{audience.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-mist">{audience.body}</p>
                <ul className="mt-7 space-y-2.5 border-t border-[var(--hairline)] pt-6">
                  {audience.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-white/75">
                      <span
                        aria-hidden
                        className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-gold"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
                {audience.href ? (
                  <Button
                    href={audience.href}
                    variant="ghost"
                    size="sm"
                    magnetic={false}
                    className="mt-6 !px-0 !text-gold hover:!text-gold-200"
                  >
                    {audience.cta} →
                  </Button>
                ) : null}
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mt-12 max-w-2xl border-l-2 border-gold/30 pl-5 text-sm leading-relaxed text-white/45">
          {DISCLAIMER} Partnerships never change that boundary.
        </p>
      </Section>

      <Section light id="enquiry" className="scroll-mt-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Business enquiry"
              title="Tell us what you have in mind."
              description="Include your organization, the audience you serve, and roughly how many learners are involved. It helps us answer with something useful rather than a brochure."
              className="[&_p]:text-ink/60"
            />
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              {/* Dark form card intentionally sits on the light section —
                  it reads as the page's one action, not another block of text. */}
              <div className="rounded-panel bg-ink p-1">
                <ContactForm defaultTopic="Partnerships" />
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
