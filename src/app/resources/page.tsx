import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { UpdatesSignupForm } from "@/components/forms/updates-signup-form";
import { GlassCard } from "@/components/ui/glass-card";
import { Section, SectionHeading } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { getProduct } from "@/lib/content/products";
import { DISCLAIMER, site } from "@/lib/site";

const product = getProduct("resource-library")!;

export const metadata: Metadata = {
  title: "Resource Library",
  description: product.promise,
  alternates: { canonical: "/resources" },
};

/**
 * "Free" here means printables only — never lessons, courses, or platform
 * access. There is no free content tier; every TalkWise lesson requires
 * membership. Keep that distinction obvious to the visitor so nobody reaches
 * Whop feeling misled.
 */
const resources = [
  {
    title: "Sound Practice Cards",
    kind: "Printable PDF",
    access: "free" as const,
    description: "Printable cards for at-home practice. Cut once, use for months.",
  },
  {
    title: "Parent Quick-Start Guide",
    kind: "Guide",
    access: "free" as const,
    description: "The ten-minute routine, explained on two pages. Start here if you're new.",
  },
  {
    title: "Weekly Practice Tracker",
    kind: "Printable PDF",
    access: "free" as const,
    description: "A single sheet to mark what you practiced, so progress is visible.",
  },
  {
    title: "American English Sound Chart",
    kind: "Reference",
    access: "free" as const,
    description: "Every sound, with mouth position notes. Built for adult English learners.",
  },
  {
    title: "Speech Sound Progress Trackers",
    kind: "Tracker set",
    access: "member" as const,
    description: "Per-sound trackers covering the full Speech Academy sequence.",
  },
  {
    title: "Parent Training Checklists",
    kind: "Checklist set",
    access: "member" as const,
    description: "One checklist per module, sized to fit on the fridge.",
  },
  {
    title: "Real-Life Conversation Scripts",
    kind: "Template set",
    access: "member" as const,
    description: "Practice scripts for interviews, phone calls, appointments, and introductions.",
  },
  {
    title: "Interactive Adventure Companion Sheets",
    kind: "Activity set",
    access: "member" as const,
    description: "Printable follow-alongs that extend each Speech Adventure episode.",
  },
];

export default function ResourcesPage() {
  const free = resources.filter((item) => item.access === "free");
  const member = resources.filter((item) => item.access === "member");

  return (
    <>
      <PageHero
        eyebrow="Resource Library"
        title={product.promise}
        lede={product.description}
        meta={[
          { label: "Who it's for", value: product.audience },
          { label: "Free printables", value: `${free.length} available` },
          { label: "Status", value: product.status },
        ]}
      />

      <Section>
        <SectionHeading
          eyebrow="Free printables"
          title="A few printables, on the house."
          description="Practical sheets you can use straight away. These are printables, not lessons — the academies themselves are members-only."
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2">
          {free.map((item) => (
            <StaggerItem key={item.title}>
              <GlassCard className="h-full p-8">
                <p className="text-2xs uppercase tracking-[0.2em] text-gold-300">{item.kind}</p>
                <h3 className="mt-4 font-display text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{item.description}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <h3 className="font-display text-3xl tracking-[-0.02em]">Send me the printables</h3>
            <p className="mt-4 max-w-md text-pretty leading-relaxed text-mist">
              Tell us where to send them and we&apos;ll email the whole free set. We&apos;ll follow
              up with practical practice ideas — and you can stop that at any time.
            </p>
          </div>
          <UpdatesSignupForm compact />
        </div>
      </Section>

      <Section light>
        <SectionHeading
          eyebrow="Member library"
          title="Included with membership."
          description="The complete set of trackers, checklists, scripts, and companion sheets that go with the academies."
          className="[&_p]:text-ink/60"
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2">
          {member.map((item) => (
            <StaggerItem key={item.title}>
              <div className="h-full rounded-panel border border-ink/10 bg-white/60 p-8">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-2xs uppercase tracking-[0.2em] text-gold-700">{item.kind}</p>
                  <span className="rounded-full bg-ink px-3 py-1 text-2xs text-white">Members</span>
                </div>
                <h3 className="mt-4 font-display text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">{item.description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Button href={site.membership.checkoutUrl} variant="ink" size="lg">
            Join TalkWise — ${site.membership.price}/month
          </Button>
          <Button href="/updates" variant="outline" size="lg" className="!text-ink hover:!bg-ink/5">
            Get Updates
          </Button>
        </div>

        <p className="mt-10 max-w-2xl border-l-2 border-gold/40 pl-5 text-sm leading-relaxed text-ink/50">
          {DISCLAIMER}
        </p>
      </Section>
    </>
  );
}
