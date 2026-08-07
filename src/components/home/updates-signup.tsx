import { UpdatesSignupForm } from "@/components/forms/updates-signup-form";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { updateBenefits } from "@/lib/content/journeys";

/**
 * Homepage list capture. Not an account, and not a free tier — the copy says
 * so plainly so nobody arrives at Whop feeling misled.
 */
export function UpdatesSignup() {
  return (
    <Section id="updates">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Stay in the loop"
            title="Not ready yet? Hear from us anyway."
            description="Practice ideas and new lesson announcements, by email or text. No card, and no obligation to ever join."
          />

          <ul className="mt-10 space-y-4">
            {updateBenefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-4">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                <span className="text-[0.95rem] leading-relaxed text-white/80">{benefit}</span>
              </li>
            ))}
          </ul>

          <p className="mt-10 max-w-md border-l-2 border-gold/30 pl-5 text-sm leading-relaxed text-white/45">
            This adds you to our list — it isn&apos;t a membership and doesn&apos;t unlock lessons.
            One click unsubscribes you for good.
          </p>
        </div>

        <Reveal delay={0.1}>
          <UpdatesSignupForm compact />
        </Reveal>
      </div>
    </Section>
  );
}
