import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about TalkWise membership, lessons, partnerships, or press.",
  alternates: { canonical: "/contact" },
};

const routes = [
  { label: "Membership & billing", detail: "Account questions, cancellations, receipts." },
  { label: "Lessons & academies", detail: "Which path to start on, how something works." },
  { label: "Partnerships", detail: "Schools, organizations, sponsors, and media." },
  { label: "Press", detail: "Interviews, assets, and company information." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="A person reads every message."
        lede="No ticket queue, no chatbot. Tell us what you need and we'll answer properly."
      />

      <Section className="pt-0">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <ul className="divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
              {routes.map((route) => (
                <li key={route.label} className="py-6">
                  <p className="font-medium">{route.label}</p>
                  <p className="mt-1.5 text-sm text-mist">{route.detail}</p>
                </li>
              ))}
            </ul>

            <p className="mt-10 text-sm text-mist">
              Prefer email?{" "}
              <a
                href={`mailto:${site.contactEmail}`}
                className="text-gold underline underline-offset-4 hover:text-gold-200"
              >
                {site.contactEmail}
              </a>
            </p>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
