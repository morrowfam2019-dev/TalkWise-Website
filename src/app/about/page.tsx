import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { Founders } from "@/components/home/founders";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { brandPersonality, mission } from "@/lib/content/products";
import { DISCLAIMER } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: mission.statement,
  alternates: { canonical: "/about" },
};

/** Approved characters and their remit, per the V2 Brand System Standard. */
const characters = [
  {
    name: "Miss Maya",
    remit: "Speech & family education",
    body: "The educational presenter for speech content and family-facing lessons.",
  },
  {
    name: "Mr. Diego",
    remit: "English learning",
    body: "The educator for ESL Academy — adult-facing, direct, and globally aware.",
  },
  {
    name: "TJ",
    remit: "Child character",
    body: "Appears in Academy lessons and Interactive Speech Adventures, always under child-likeness safeguards.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About TalkWise"
        title={mission.promise}
        lede={mission.statement}
      >
        <Button href="/how-talkwise-helps" variant="outline" size="lg">
          See how it works
        </Button>
      </PageHero>

      <Section>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Who we serve" title="Four groups, one promise." />
          </div>
          <div className="lg:col-span-7">
            <ol className="divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
              {mission.serves.map((item, index) => (
                <li key={item} className="flex gap-6 py-7">
                  <Reveal delay={index * 0.06} className="flex flex-1 gap-6">
                    <span
                      aria-hidden
                      className="font-display text-xl leading-tight tabular-nums text-gold/50"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="flex-1 text-pretty leading-relaxed text-white/80">{item}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section light>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="Vision" title="Where this goes." className="[&_p]:text-ink/60" />
            <p className="mt-8 text-pretty text-lg leading-relaxed text-ink/70">{mission.vision}</p>
          </div>
          <div>
            <SectionHeading
              eyebrow="How we sound"
              title="Clear before clever."
              className="[&_p]:text-ink/60"
            />
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {brandPersonality.map((trait) => (
                <li
                  key={trait}
                  className="rounded-full border border-ink/15 px-4 py-2 text-sm text-ink/70"
                >
                  {trait}
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-md text-pretty leading-relaxed text-ink/60">
              Never clinical, never fear-based, never childish toward adults, never generic. We
              don&apos;t shame accents, speech differences, parents, children, or learners — a rule,
              not a preference.
            </p>
          </div>
        </div>
      </Section>

      <Founders />

      <Section>
        <SectionHeading
          eyebrow="Who teaches"
          title="The people on screen."
          description="Educational characters carry the lessons, so learners see a familiar face every time rather than a rotating cast."
        />
        <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
          {characters.map((character) => (
            <StaggerItem key={character.name}>
              <GlassCard className="h-full p-8">
                <p className="text-2xs uppercase tracking-[0.2em] text-gold-300">
                  {character.remit}
                </p>
                <h3 className="mt-4 font-display text-2xl">{character.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{character.body}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mt-12 max-w-2xl border-l-2 border-gold/30 pl-5 text-sm leading-relaxed text-white/45">
          {DISCLAIMER}
        </p>
      </Section>

      {/* FAQ has no nav entry of its own — About & FAQ share one row, so this
          is the link that keeps /faq reachable. */}
      <Section light className="py-16 sm:py-20">
        <div className="flex flex-col items-start justify-between gap-6 rounded-panel border border-ink/10 bg-white/60 p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="font-display text-2xl">Have questions?</h2>
            <p className="mt-2 max-w-md text-pretty text-sm leading-relaxed text-ink/60">
              Membership, the lessons, how we teach English — answered plainly.
            </p>
          </div>
          <Button href="/faq" variant="ink" size="lg" className="shrink-0">
            See the full FAQ
          </Button>
        </div>
      </Section>
    </>
  );
}
