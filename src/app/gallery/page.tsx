import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { pillars } from "@/lib/content/products";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Lesson previews, characters, and behind the scenes at TalkWise.",
  alternates: { canonical: "/gallery" },
};

/**
 * PLACEHOLDER MEDIA — awaiting V2 asset delivery.
 *
 * The V2 Brand System Standard forbids migrating V1 stills, and new Maya and
 * Diego visuals must be generated under V2 standards. So the masonry grid is
 * built and the tiles are empty frames labelled with what belongs there —
 * rather than filled with stock imagery or V1 assets that aren't approved.
 *
 * To go live: replace each item's `src` and render <Image /> in place of the
 * placeholder block. Aspect ratios below are the intended crops.
 */
const items = [
  { title: "Speech Academy — lesson still", kind: "Lesson preview", ratio: "aspect-[4/5]" },
  { title: "Miss Maya — V2 character art", kind: "Character", ratio: "aspect-square" },
  { title: "Interactive Adventure — scene card", kind: "Episode still", ratio: "aspect-video" },
  { title: "Mr. Diego — V2 character art", kind: "Character", ratio: "aspect-[4/5]" },
  { title: "ESL Academy — lesson still", kind: "Lesson preview", ratio: "aspect-square" },
  { title: "Production — recording setup", kind: "Behind the scenes", ratio: "aspect-video" },
  { title: "TJ — V2 character art", kind: "Character", ratio: "aspect-[4/5]" },
  { title: "Resource Library — printables", kind: "Materials", ratio: "aspect-square" },
  { title: "Parent Training — demonstration", kind: "Lesson preview", ratio: "aspect-video" },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Lessons, characters, and the work behind them."
        lede="Every visual asset at TalkWise is created in-house under the V2 brand standard, tagged by audience and product, and approved before it ships."
      />

      <Section className="pt-0">
        {/* CSS columns give a true masonry flow without JS or layout shift. */}
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
          {items.map((item) => (
            <figure
              key={item.title}
              className="group overflow-hidden rounded-panel border border-dashed border-[var(--hairline-strong)]"
            >
              <div
                className={`${item.ratio} relative flex items-center justify-center bg-gradient-to-br from-ink-800 to-ink`}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-30"
                  style={{
                    background:
                      "radial-gradient(60% 60% at 50% 40%, color-mix(in oklab, var(--color-gold) 24%, transparent) 0%, transparent 70%)",
                  }}
                />
                <span className="relative text-2xs uppercase tracking-[0.24em] text-white/35">
                  Awaiting V2 asset
                </span>
              </div>
              <figcaption className="p-5">
                <p className="text-2xs uppercase tracking-[0.2em] text-gold-300">{item.kind}</p>
                <p className="mt-2 text-sm text-white/80">{item.title}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section light className="py-20 sm:py-24">
        <SectionHeading
          eyebrow="How we organize it"
          title="Everything maps to a pillar."
          description="Each asset is tagged by audience, product, platform, campaign, and approval status — so nothing ships unreviewed and nothing gets lost."
          className="[&_p]:text-ink/60"
        />
        <Stagger className="mt-12 flex flex-wrap gap-2.5">
          {pillars.map((pillar) => (
            <StaggerItem key={pillar}>
              <span className="inline-block rounded-full border border-ink/15 px-4 py-2 text-sm text-ink/70">
                {pillar}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
