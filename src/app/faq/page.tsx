import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { faqCategories, faqs } from "@/lib/content/faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about TalkWise membership, lessons, academies, and how we teach.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Questions"
        title="Answers, in plain English."
        lede="If what you need isn't here, write to us — a person reads every message."
      >
        <Button href="/contact" variant="outline" size="lg">
          Ask us directly
        </Button>
      </PageHero>

      {/* Full FAQ JSON-LD — the homepage carries only the preview subset. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }),
        }}
      />

      <Section className="pt-0">
        <div className="space-y-20">
          {faqCategories.map((category) => {
            const items = faqs.filter((faq) => faq.category === category);
            if (items.length === 0) return null;

            return (
              <div key={category} className="grid gap-8 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-4">
                  <h2 className="font-display text-3xl tracking-[-0.02em] lg:sticky lg:top-32">
                    {category}
                  </h2>
                </div>
                <div className="lg:col-span-8">
                  <Accordion items={items} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="glass mt-24 flex flex-col items-center gap-6 rounded-panel p-10 text-center sm:p-14">
          <h2 className="max-w-xl text-balance-pretty font-display text-display-sm leading-[1.05]">
            Still deciding?
          </h2>
          <p className="max-w-md text-pretty text-mist">
            Join the list and hear from us first. No card, and no obligation to ever join.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/updates" variant="gold" size="lg">
              Get Updates
            </Button>
            <Button href={site.membership.checkoutUrl} variant="outline" size="lg">
              Join for ${site.membership.price}/month
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
