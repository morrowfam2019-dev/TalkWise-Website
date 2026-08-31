import { Section, SectionHeading } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { talkwisePlayFeatures } from "@/lib/content/talkwise-play";

export function TalkWisePlayFeatures() {
  return (
    <Section light>
      <SectionHeading
        eyebrow="Inside TalkWise Play"
        title="Practice speech. Play games. Build confidence."
        className="[&_p]:text-ink/60"
      />

      <Stagger className="mt-14 grid gap-5 sm:grid-cols-2">
        {talkwisePlayFeatures.map((feature) => (
          <StaggerItem key={feature.title}>
            <div className="h-full rounded-panel border border-ink/10 bg-white/60 p-8 transition-colors hover:border-gold/50">
              <h3 className="font-display text-2xl tracking-[-0.01em] text-ink">{feature.title}</h3>
              <p className="mt-3 text-pretty leading-relaxed text-ink/60">{feature.description}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
