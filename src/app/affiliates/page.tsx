import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { AffiliateDashboardMock } from "@/components/shared/affiliate-dashboard-mock";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Affiliate Program",
  description:
    "Earn recurring commission for every TalkWise member you refer. Built for creators and educators who already talk to families and English learners.",
  alternates: { canonical: "/affiliates" },
};

const steps = [
  {
    step: "01",
    title: "Apply",
    body: "Tell us about your audience. We approve partners who genuinely reach families or English learners — not everyone who applies.",
  },
  {
    step: "02",
    title: "Share your link",
    body: "You get a tracked link and a set of ready-made assets that already meet our brand standard, so you're not designing anything.",
  },
  {
    step: "03",
    title: "Earn every month",
    body: "Commission recurs for as long as your referral stays a member. Not a one-time bounty on signup.",
  },
];

export default function AffiliatesPage() {
  return (
    <>
      <PageHero
        eyebrow="Affiliate program"
        title="Recurring commission, not a one-time bounty."
        lede="Most programs pay you once and forget you. Ours pays every month your referral stays a member — because retention is the thing that actually matters to both of us."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" variant="gold" size="lg">
            Apply to the program
          </Button>
          <Button href="/membership" variant="outline" size="lg">
            See what you&apos;d be sharing
          </Button>
        </div>
      </PageHero>

      <Section className="pt-0">
        <ol className="grid gap-5 md:grid-cols-3">
          {steps.map((item, index) => (
            <li key={item.step}>
              <Reveal delay={index * 0.08}>
                <GlassCard className="h-full p-8">
                  <span
                    aria-hidden
                    className="font-display text-4xl leading-none tabular-nums text-gold/45"
                  >
                    {item.step}
                  </span>
                  <h2 className="mt-7 font-display text-2xl">{item.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-mist">{item.body}</p>
                </GlassCard>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="pt-0">
        <SectionHeading
          eyebrow="Your dashboard"
          title="See exactly what you've earned."
          description="Clicks, conversions, active members, and next payout — with no hidden attribution rules and no 30-day cookie games."
        />
        <Reveal className="mt-12">
          <AffiliateDashboardMock />
        </Reveal>
      </Section>

      <Section light>
        <SectionHeading
          eyebrow="The terms"
          title="Plainly stated."
          className="[&_p]:text-ink/60"
        />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Commission", value: "Recurring", detail: "Paid monthly while the member stays active." },
            { label: "Membership price", value: `$${site.membership.price}/mo`, detail: "One tier, so no rate confusion." },
            { label: "Attribution", value: "Transparent", detail: "You see every click and conversion." },
            { label: "Approval", value: "Reviewed", detail: "We approve partners individually." },
          ].map((item) => (
            <StaggerItem key={item.label}>
              <div className="h-full rounded-panel border border-ink/10 bg-white/60 p-7">
                <p className="text-2xs uppercase tracking-[0.2em] text-ink/45">{item.label}</p>
                <p className="mt-4 font-display text-3xl tracking-[-0.02em]">{item.value}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">{item.detail}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mt-12 max-w-2xl text-sm leading-relaxed text-ink/50">
          Final commission rates and payout schedule are confirmed in your partner agreement.
          Affiliates must follow the TalkWise brand and compliance standards — including our
          educational boundary. No affiliate may describe TalkWise as therapy, treatment, or a
          guaranteed outcome.
        </p>

        <Button href="/contact" variant="ink" size="lg" className="mt-10">
          Apply to the program
        </Button>
      </Section>
    </>
  );
}
