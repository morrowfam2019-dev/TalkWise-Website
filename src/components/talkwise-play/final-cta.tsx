import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";
import { site } from "@/lib/site";

export function TalkWisePlayFinalCta() {
  return (
    <Section className="py-24 sm:py-28">
      <GlassCard spotlight={false} className="flex flex-col items-center gap-7 p-10 text-center sm:p-14">
        <p className="text-2xs font-medium uppercase tracking-[0.24em] text-gold-300">
          Ready to play?
        </p>
        <h2 className="max-w-2xl text-balance-pretty font-display text-display-sm leading-[1.05]">
          TalkWise Play is included with the TalkWise Academy membership.
        </h2>
        <p className="max-w-xl text-pretty leading-relaxed text-mist">
          Practice, learn and play — all in one place.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={site.membership.checkoutUrl} variant="gold" size="lg">
            Join TalkWise Academy
          </Button>
          <Button href="/updates" variant="outline" size="lg">
            Get Updates
          </Button>
        </div>
      </GlassCard>
    </Section>
  );
}
