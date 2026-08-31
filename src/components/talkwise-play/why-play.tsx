import { Section, SectionHeading } from "@/components/ui/section";
import { DISCLAIMER } from "@/lib/site";

export function WhyTalkWisePlay() {
  return (
    <Section light>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHeading
            eyebrow="Why TalkWise Play"
            title="Practice without it feeling like practice."
            className="[&_p]:text-ink/60"
          />
        </div>
        <div className="lg:col-span-6">
          <p className="text-pretty text-lg leading-relaxed text-ink/70">
            Traditional repetition can quickly become frustrating or boring for children.
            TalkWise Play places communication targets inside interactive experiences, giving
            children a reason to repeat, respond, explore and keep going.
          </p>
          <p className="mt-6 text-pretty text-lg font-medium leading-relaxed text-ink">
            Every game is built around the same goal: more meaningful opportunities to
            communicate.
          </p>
          <p className="mt-8 border-l-2 border-gold/40 pl-5 text-sm leading-relaxed text-ink/50">
            {DISCLAIMER}
          </p>
        </div>
      </div>
    </Section>
  );
}
