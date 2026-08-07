import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { method } from "@/lib/content/journeys";
import { mission, products } from "@/lib/content/products";
import { DISCLAIMER } from "@/lib/site";

export const metadata: Metadata = {
  title: "How TalkWise Helps",
  description:
    "The method behind every TalkWise lesson: know what to practice, understand why it matters, and know exactly what to do next.",
  alternates: { canonical: "/how-talkwise-helps" },
};

export default function HowTalkWiseHelpsPage() {
  return (
    <>
      <PageHero
        eyebrow="How TalkWise helps"
        title="Every learner should leave knowing what to do next."
        lede={mission.northStar}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/updates" variant="gold" size="lg">
            Get updates
          </Button>
          <Button href="/membership" variant="outline" size="lg">
            See membership
          </Button>
        </div>
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="The method"
          title="Three things, in order."
          description="This is the shape of every lesson we make, whether it's a speech sound for a six-year-old or a vowel contrast for an adult learner."
        />

        <ol className="mt-16 grid gap-5 lg:grid-cols-3">
          {method.map((item, index) => (
            <li key={item.step}>
              <Reveal delay={index * 0.08}>
                <GlassCard className="h-full p-9">
                  <span
                    aria-hidden
                    className="font-display text-4xl leading-none tabular-nums text-gold/45"
                  >
                    {item.step}
                  </span>
                  <h3 className="mt-7 font-display text-2xl tracking-[-0.01em]">{item.title}</h3>
                  <p className="mt-4 text-pretty leading-relaxed text-mist">{item.description}</p>
                </GlassCard>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section light>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="What we are"
              title="An education company. Not a clinic."
              className="[&_p]:text-ink/60"
            />
            <p className="mt-8 max-w-md text-pretty leading-relaxed text-ink/60">
              TalkWise provides education, practice, tools, and guided learning experiences. That
              boundary is not a legal footnote we tolerate — it shapes how every lesson is written.
            </p>
            <p className="mt-6 max-w-md border-l-2 border-gold/40 pl-5 text-sm leading-relaxed text-ink/50">
              {DISCLAIMER}
            </p>
          </div>

          <div className="lg:col-span-7">
            <ul className="divide-y divide-ink/10 border-y border-ink/10">
              {[
                {
                  title: "We explain, we don't diagnose",
                  body: "Lessons teach general skills. They do not assess an individual learner or tell you what is happening with your specific child.",
                },
                {
                  title: "We never use fear to motivate",
                  body: "No countdown clocks, no warnings about missed windows. Fear-based messaging is prohibited in everything we publish.",
                },
                {
                  title: "We tell you when to ask someone else",
                  body: "Where a licensed professional is the right next step, we say so plainly rather than keeping you inside our product.",
                },
                {
                  title: "We don't promise outcomes",
                  body: "No guarantees, no cures, no before-and-after claims. We promise clear teaching and practical practice — that's what we control.",
                },
              ].map((item, index) => (
                <li key={item.title} className="py-8">
                  <Reveal delay={index * 0.06}>
                    <h3 className="font-display text-2xl tracking-[-0.01em]">{item.title}</h3>
                    <p className="mt-3 max-w-xl text-pretty leading-relaxed text-ink/60">
                      {item.body}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="The products"
          title="Six connected ways in."
          description="Each one serves a different learner. Together they cover a family from a child's first sound to an adult's job interview."
        />

        <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <StaggerItem key={product.id}>
              <Link href={product.href} className="group block h-full">
                <GlassCard className="h-full p-8">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-2xl">{product.name}</h3>
                    <span className="shrink-0 rounded-full border border-[var(--hairline)] px-3 py-1 text-2xs text-white/45">
                      {product.status}
                    </span>
                  </div>
                  <p className="mt-2 text-2xs uppercase tracking-[0.2em] text-gold-300">
                    {product.audience}
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-mist">{product.promise}</p>
                  <span className="mt-7 flex items-center gap-2 text-sm font-medium text-gold">
                    Explore
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </GlassCard>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
