import { ComingSoonRibbon } from "@/components/ui/coming-soon-ribbon";
import { Section, SectionHeading } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/ui/reveal";

/**
 * PLACEHOLDER — awaiting real, consented family testimonials.
 *
 * These slots render as empty frames on purpose. Publishing invented quotes
 * from parents about their children's speech would be a genuine trust problem,
 * so the layout is finished and the content is not.
 *
 * To go live: replace `slots` with real entries and delete `pending`.
 */
type Testimonial = {
  quote: string;
  author: string;
  context: string;
};

const slots: Testimonial[] = [];

const pending = [
  { context: "Parent · Kids lessons" },
  { context: "English learner" },
  { context: "Parent · Parent Training" },
];

export function Testimonials() {
  const hasContent = slots.length > 0;

  return (
    <Section id="testimonials" light>
      <SectionHeading
        eyebrow="Families"
        title="What families are saying."
        description={
          hasContent
            ? undefined
            : "We publish testimonials only with written permission from the family. This section goes live as they arrive."
        }
        className="[&_p]:text-ink/60"
      />

      <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
        {hasContent
          ? slots.map((item) => (
              <StaggerItem key={item.author}>
                <figure className="flex h-full flex-col rounded-panel border border-ink/10 bg-white/60 p-8">
                  <blockquote className="flex-1 text-pretty text-lg leading-relaxed">
                    “{item.quote}”
                  </blockquote>
                  <figcaption className="mt-8 border-t border-ink/10 pt-6">
                    <p className="font-medium">{item.author}</p>
                    <p className="mt-1 text-sm text-ink/50">{item.context}</p>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))
          : pending.map((item, index) => (
              <StaggerItem key={index}>
                <div className="relative flex h-full min-h-[16rem] flex-col overflow-hidden rounded-panel border border-dashed border-ink/15 p-8">
                  <ComingSoonRibbon />
                  <div aria-hidden className="flex-1 space-y-3">
                    {[100, 92, 78, 40].map((width, line) => (
                      <div
                        key={line}
                        className="h-3 rounded-full bg-ink/[0.06]"
                        style={{ width: `${width}%` }}
                      />
                    ))}
                  </div>
                  <p className="mt-8 border-t border-ink/10 pt-6 text-sm text-ink/40">
                    {item.context}
                  </p>
                </div>
              </StaggerItem>
            ))}
      </Stagger>
    </Section>
  );
}
