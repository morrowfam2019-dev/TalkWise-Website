import { homepageFaqs } from "@/lib/content/faq";
import { site } from "@/lib/site";

/**
 * JSON-LD. Server components, so this ships as static markup with no runtime
 * cost. `EducationalOrganization` (not `MedicalBusiness`) is deliberate — it
 * matches what TalkWise actually is.
 */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Data is authored in this repo, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        name: site.name,
        url: site.url,
        description: site.description,
        slogan: site.tagline,
        email: site.contactEmail,
        sameAs: Object.values(site.social),
        offers: {
          "@type": "Offer",
          name: "TalkWise Membership",
          price: site.membership.price,
          priceCurrency: site.membership.currency,
          category: "Subscription",
        },
      }}
    />
  );
}

export function FaqSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: homepageFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }}
    />
  );
}

export function WebSiteSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: site.name,
        url: site.url,
      }}
    />
  );
}
