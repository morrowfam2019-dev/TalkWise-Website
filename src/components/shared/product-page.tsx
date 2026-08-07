import Link from "next/link";

import { PageHero } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Section, SectionHeading } from "@/components/ui/section";
import { Stagger, StaggerItem, Reveal } from "@/components/ui/reveal";
import { products, type Product } from "@/lib/content/products";
import { DISCLAIMER, site } from "@/lib/site";

/**
 * Shared layout for the six V2 product pages. Content comes from
 * lib/content/products.ts so page copy can never drift from the portfolio
 * standard — change the product there and every surface updates.
 */
export function ProductPage({
  product,
  intro,
  sections,
  showDisclaimer = true,
}: {
  product: Product;
  /** Optional richer opening paragraph, shown above the detail sections. */
  intro?: React.ReactNode;
  sections: { title: string; body: string }[];
  /** Speech-related products must carry the educational boundary line. */
  showDisclaimer?: boolean;
}) {
  const related = products.filter((item) => item.id !== product.id).slice(0, 3);

  const meta = [
    { label: "Who it's for", value: product.audience },
    ...(product.presenter ? [{ label: "Taught by", value: product.presenter }] : []),
    { label: "Status", value: product.status },
  ];

  return (
    <>
      <PageHero eyebrow={product.name} title={product.promise} lede={product.description} meta={meta}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={site.membership.checkoutUrl} variant="gold" size="lg">
            Join TalkWise
          </Button>
          <Button href="/updates" variant="outline" size="lg">
            Get updates
          </Button>
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading eyebrow="What you get" title="Built around one need." />
              <p className="mt-7 max-w-md text-pretty leading-relaxed text-mist">{product.need}</p>

              <ul className="mt-10 space-y-3">
                {product.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-[0.95rem]">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    <span className="text-white/80">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7">
            {intro ? (
              <Reveal className="mb-12 text-pretty text-lg leading-relaxed text-white/85">
                {intro}
              </Reveal>
            ) : null}

            <div className="divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
              {sections.map((section, index) => (
                <Reveal key={section.title} delay={index * 0.06} className="py-9 first:pt-0">
                  <h3 className="font-display text-2xl tracking-[-0.01em]">{section.title}</h3>
                  <p className="mt-3 max-w-xl text-pretty leading-relaxed text-mist">
                    {section.body}
                  </p>
                </Reveal>
              ))}
            </div>

            {showDisclaimer ? (
              <p className="mt-10 border-l-2 border-gold/30 pl-5 text-sm leading-relaxed text-white/45">
                {DISCLAIMER}
              </p>
            ) : null}
          </div>
        </div>
      </Section>

      <Section light>
        <SectionHeading eyebrow="Also in TalkWise" title="Where this fits." className="[&_p]:text-ink/60" />
        <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {related.map((item) => (
            <StaggerItem key={item.id}>
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-panel border border-ink/10 bg-white/60 p-8 transition-colors hover:border-gold/50"
              >
                <h3 className="font-display text-2xl">{item.name}</h3>
                <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-ink/60">
                  {item.promise}
                </p>
                <span className="mt-7 flex items-center gap-2 text-sm font-medium text-gold-700">
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

      <Section className="py-24 sm:py-28">
        <GlassCard spotlight={false} className="flex flex-col items-center gap-7 p-10 text-center sm:p-14">
          <h2 className="max-w-2xl text-balance-pretty font-display text-display-sm leading-[1.05]">
            One membership covers every academy.
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={site.membership.checkoutUrl} variant="gold" size="lg">
              Join TalkWise — ${site.membership.price}/month
            </Button>
            <Button href="/updates" variant="outline" size="lg">
              Get Updates
            </Button>
          </div>
        </GlassCard>
      </Section>
    </>
  );
}
