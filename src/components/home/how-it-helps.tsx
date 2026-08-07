import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { method } from "@/lib/content/journeys";
import { DISCLAIMER } from "@/lib/site";

/**
 * The method. Steps are numbered because this genuinely is a sequence —
 * each one depends on the one before it.
 */
export function HowItHelps() {
  return (
    <Section id="how-it-helps" light className="overflow-hidden">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              eyebrow="How TalkWise helps"
              title={
                <>
                  A method built for the
                  <span className="italic text-gold-700"> ten minutes </span>
                  you actually have.
                </>
              }
              description="Most programs assume a quiet room and an hour of attention. Ours assumes a kitchen table, a tired parent, and a child who would rather be doing something else — and works anyway."
              className="[&_p]:text-ink/60"
            />
            <p className="mt-10 max-w-md border-l-2 border-gold/40 pl-5 text-sm leading-relaxed text-ink/50">
              {DISCLAIMER}
            </p>
          </div>
        </div>

        <ol className="lg:col-span-7 lg:pt-4">
          {method.map((item, index) => (
            <li
              key={item.step}
              className="border-t border-ink/10 py-10 first:border-t-0 first:pt-0 sm:py-12"
            >
              <Reveal delay={index * 0.1} className="flex gap-6 sm:gap-10">
                <span
                  aria-hidden
                  className="font-display text-2xl leading-none tabular-nums text-gold-700/70 sm:text-3xl"
                >
                  {item.step}
                </span>
                <div className="flex-1">
                  <h3 className="font-display text-2xl tracking-[-0.01em] sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-lg text-pretty leading-relaxed text-ink/60">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
