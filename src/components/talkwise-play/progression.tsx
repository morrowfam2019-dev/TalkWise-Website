import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { talkwisePlayProgression } from "@/lib/content/talkwise-play";

/**
 * Three-level progression. Framed as a range families choose within, never
 * as diagnostic placement — see the V2 Brand System Standard's boundary on
 * clinical-sounding claims.
 */
export function TalkWisePlayProgression() {
  return (
    <Section className="overflow-hidden">
      <SectionHeading
        align="center"
        eyebrow="A path that grows with them"
        title="Start simple. Build skills. Keep playing."
        description="Families can select the experience appropriate for their learner — every level stays inside the same games."
        className="mx-auto"
      />

      <Reveal className="mx-auto mt-16 max-w-3xl">
        <ol className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-4">
          {talkwisePlayProgression.map((step, index) => (
            <li key={step.level} className="flex flex-1 flex-col items-center sm:flex-row">
              <div className="w-full rounded-panel border border-[var(--hairline)] bg-white/[0.03] p-7 text-center">
                <p className="text-2xs font-medium uppercase tracking-[0.24em] text-gold-300">
                  {step.level}
                </p>
                <p className="mt-3 font-display text-2xl tracking-[-0.01em] text-white">
                  {step.focus}
                </p>
              </div>
              {index < talkwisePlayProgression.length - 1 ? (
                <span aria-hidden className="my-3 text-2xl leading-none text-gold/50 sm:mx-3 sm:my-0">
                  <span className="sm:hidden">↓</span>
                  <span className="hidden sm:inline">→</span>
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
