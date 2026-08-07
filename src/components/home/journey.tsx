import Link from "next/link";

import { GlassCard } from "@/components/ui/glass-card";
import { Section, SectionHeading } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { journeys } from "@/lib/content/journeys";

/** Icons drawn per-journey rather than pulled from a set — they double as the
 *  section's only ornament, so they should feel authored. */
const glyphs: Record<string, React.ReactNode> = {
  parents: (
    <>
      <circle cx="9" cy="9" r="3.4" />
      <circle cx="18" cy="11" r="2.6" />
      <path d="M3 21c0-3.6 2.7-6 6-6s6 2.4 6 6" />
      <path d="M16 21c0-2.4 1.4-4.2 3.4-4.6" />
    </>
  ),
  kids: (
    <>
      <path d="M12 4c4.4 0 8 2.8 8 6.2 0 3.5-3.6 6.3-8 6.3-.7 0-1.3 0-1.9-.2L6 19.4v-3.7C4.2 14.5 4 12.5 4 10.2 4 6.8 7.6 4 12 4Z" />
      <circle cx="9.2" cy="10.3" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="10.3" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.8" cy="10.3" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  english: (
    <>
      <path d="M12 3.5a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0v-5a3 3 0 0 1 3-3Z" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0" />
      <path d="M12 17.5V21" />
      <path d="M8.5 21h7" />
    </>
  ),
};

export function Journey() {
  return (
    <Section id="journey">
      <SectionHeading
        eyebrow="Choose your journey"
        title="Three paths. One place to build confidence."
        description="Every family arrives somewhere different. Start where you are — the platform meets you there."
      />

      <Stagger className="mt-16 grid gap-5 lg:grid-cols-3">
        {journeys.map((journey) => (
          <StaggerItem key={journey.id}>
            <GlassCard tilt className="h-full">
              <Link
                href={journey.href}
                className="flex h-full flex-col p-8 sm:p-10"
                aria-label={`${journey.title} — ${journey.audience}`}
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/25 bg-gold/[0.07] text-gold">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                    className="h-7 w-7"
                  >
                    {glyphs[journey.id]}
                  </svg>
                </span>

                <p className="mt-8 text-2xs font-medium uppercase tracking-[0.22em] text-white/40">
                  {journey.audience}
                </p>
                <h3 className="mt-2 font-display text-3xl tracking-[-0.02em]">{journey.title}</h3>
                <p className="mt-4 text-pretty text-[0.95rem] leading-relaxed text-mist">
                  {journey.description}
                </p>

                <ul className="mt-8 space-y-2.5 border-t border-[var(--hairline)] pt-7">
                  {journey.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3 text-sm text-white/75">
                      <span aria-hidden className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-gold" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <span className="mt-auto flex items-center gap-2 pt-9 text-sm font-medium text-gold">
                  Explore this path
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            </GlassCard>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
