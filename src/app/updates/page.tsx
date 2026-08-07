import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { UpdatesSignupForm } from "@/components/forms/updates-signup-form";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { updateBenefits } from "@/lib/content/journeys";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get Updates",
  description:
    "Practice ideas, new lesson announcements, and TalkWise news by email or text. Not a membership — membership lives on Whop.",
  alternates: { canonical: "/updates" },
};

export default function UpdatesPage() {
  return (
    <>
      <PageHero
        eyebrow="Stay in the loop"
        title="Hear from us before you decide."
        lede="Sign up for practice ideas and new lesson announcements. It takes a moment, costs nothing, and you can stop at any time."
      />

      <Section className="pt-0">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="font-display text-3xl tracking-[-0.02em]">What you&apos;ll get</h2>
            <ul className="mt-8 space-y-4">
              {updateBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-4">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span className="text-[0.95rem] leading-relaxed text-white/80">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Be unambiguous: this is a mailing list, not a way in. */}
            <div className="mt-12 rounded-card border border-gold/25 bg-gold/[0.06] p-6">
              <p className="text-sm font-medium text-gold-100">This is not a membership.</p>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Lessons are available to members only. Signing up here adds you to our list — it
                does not give access to any TalkWise course or material.
              </p>
              <Button
                href={site.membership.checkoutUrl}
                variant="gold"
                size="sm"
                className="mt-5"
                magnetic={false}
              >
                Join TalkWise — ${site.membership.price}/month
              </Button>
            </div>

            <p className="mt-10 max-w-md border-l-2 border-gold/30 pl-5 text-sm leading-relaxed text-white/45">
              We never sell your information. Email and text permissions are separate — you choose
              each one, and either can be withdrawn at any time.
            </p>
          </div>

          <Reveal delay={0.1}>
            <UpdatesSignupForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
