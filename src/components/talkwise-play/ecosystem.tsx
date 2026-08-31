import Link from "next/link";

import { Section, SectionHeading } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { talkwiseEcosystem } from "@/lib/content/talkwise-play";
import { cn } from "@/lib/utils";

export function TalkWiseEcosystem() {
  return (
    <Section id="ecosystem">
      <SectionHeading
        align="center"
        eyebrow="The TalkWise ecosystem"
        title="One membership. Multiple ways to learn."
        description="TalkWise Academy brings together every way your family practices communication."
        className="mx-auto"
      />

      <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {talkwiseEcosystem.map((pillar) => (
          <StaggerItem key={pillar.title}>
            <Link
              href={pillar.href}
              className={cn(
                "group flex h-full flex-col rounded-panel border p-7 transition-colors",
                pillar.title === "TalkWise Play"
                  ? "border-gold/40 bg-gold/[0.06] hover:border-gold/70"
                  : "border-[var(--hairline)] bg-white/[0.03] hover:border-gold/40",
              )}
            >
              <h3 className="font-display text-xl tracking-[-0.01em] text-white">{pillar.title}</h3>
              <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-mist">
                {pillar.description}
              </p>
              <span className="mt-6 flex items-center gap-2 text-sm font-medium text-gold-300">
                Explore
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
