import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { membershipBenefits } from "@/lib/content/journeys";
import { site } from "@/lib/site";

export function Membership() {
  return (
    <Section id="membership" className="overflow-hidden">
      {/* Single warm pool of light — the section's only flourish. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full opacity-[0.16] blur-[120px]"
        style={{
          background: "radial-gradient(circle, var(--color-gold) 0%, transparent 68%)",
        }}
      />

      <SectionHeading
        align="center"
        eyebrow="Membership"
        title="One membership. Everything included."
        description="No tiers, no add-ons, no upsell at checkout. The price you see is the whole product."
        className="mx-auto"
      />

      <Reveal className="mx-auto mt-16 max-w-2xl">
        <div className="glass gold-hairline relative overflow-hidden rounded-panel p-8 sm:p-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-2xs uppercase tracking-[0.24em] text-gold-300">
                TalkWise Membership
              </p>
              <p className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-7xl leading-none tracking-[-0.03em] text-gold-gradient">
                  ${site.membership.price}
                </span>
                <span className="text-mist">/ month</span>
              </p>
            </div>
            <p className="max-w-[14rem] text-sm leading-relaxed text-mist">
              Covers the whole family. Cancel in two clicks, anytime.
            </p>
          </div>

          <ul className="mt-10 grid gap-3.5 border-t border-[var(--hairline)] pt-10 sm:grid-cols-2">
            {membershipBenefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-sm leading-relaxed">
                <svg
                  viewBox="0 0 20 20"
                  aria-hidden
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 10.5l4 4 8-9" />
                </svg>
                <span className="text-white/80">{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="mt-11 flex flex-col gap-3 sm:flex-row">
            <Button
              href={site.membership.checkoutUrl}
              variant="gold"
              size="lg"
              className="flex-1"
            >
              Join TalkWise
            </Button>
            <Button href="/updates" variant="outline" size="lg" className="flex-1">
              Get updates instead
            </Button>
          </div>

          <p className="mt-6 text-center text-2xs text-white/35">
            Checkout and lessons are hosted on Whop. Card details never touch our servers.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
