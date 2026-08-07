import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { Membership } from "@/components/home/membership";
import { FaqPreview } from "@/components/home/faq-preview";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { products } from "@/lib/content/products";
import { DISCLAIMER, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Membership",
  description: `One TalkWise membership, $${site.membership.price} per month. Every academy, the Resource Library, and everything we add.`,
  alternates: { canonical: "/membership" },
};

export default function MembershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Membership"
        title="One membership. Every academy."
        lede="No tiers, no add-ons, no upsell at checkout. The price you see is the whole product — and it covers the whole family."
        meta={[
          { label: "Price", value: `$${site.membership.price} / month` },
          { label: "Included", value: `${products.length} products` },
          { label: "Commitment", value: "Cancel anytime" },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={site.membership.checkoutUrl} variant="gold" size="lg">
            Join TalkWise
          </Button>
          <Button href="/updates" variant="outline" size="lg">
            Get updates instead
          </Button>
        </div>
      </PageHero>

      <Section className="pt-0">
        <SectionHeading
          eyebrow="What's included"
          title="All of it."
          description="Every product below is covered by the single membership. Nothing here is sold separately."
        />
        <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <StaggerItem key={product.id}>
              <div className="glass h-full rounded-panel p-8">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl">{product.name}</h3>
                  <span className="shrink-0 rounded-full border border-[var(--hairline)] px-3 py-1 text-2xs text-white/45">
                    {product.status}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-mist">{product.promise}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mt-12 max-w-2xl border-l-2 border-gold/30 pl-5 text-sm leading-relaxed text-white/45">
          {DISCLAIMER}
        </p>
      </Section>

      <Section light className="py-20 sm:py-24">
        <SectionHeading
          eyebrow="How access works"
          title="Three steps, then you're in."
          description="Membership and lessons are hosted on Whop. This site tells you what TalkWise is; Whop is where you use it."
          className="[&_p]:text-ink/60"
        />
        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Join on Whop",
              body: "Checkout takes about a minute. Your card details go to Whop, never to us.",
            },
            {
              step: "02",
              title: "Everything unlocks at once",
              body: "All six products open immediately. There is no drip schedule and nothing held back for a higher tier.",
            },
            {
              step: "03",
              title: "Sign in there from then on",
              body: "Your lessons, progress, and billing all live in one place. Cancel from the same settings, anytime.",
            },
          ].map((item, index) => (
            <li key={item.step}>
              <Reveal delay={index * 0.08} className="h-full rounded-panel border border-ink/10 bg-white/60 p-8">
                <span
                  aria-hidden
                  className="font-display text-3xl leading-none tabular-nums text-gold-700/60"
                >
                  {item.step}
                </span>
                <h3 className="mt-6 font-display text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">{item.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Membership />
      <FaqPreview />
    </>
  );
}
