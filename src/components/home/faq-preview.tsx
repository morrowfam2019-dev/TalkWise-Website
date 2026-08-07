import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { homepageFaqs } from "@/lib/content/faq";

export function FaqPreview() {
  return (
    <Section id="faq">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              eyebrow="Questions"
              title="The things people ask first."
            />
            <Button href="/faq" variant="outline" size="md" className="mt-9">
              Read every answer
            </Button>
          </div>
        </div>

        <div className="lg:col-span-8">
          <Accordion items={homepageFaqs} defaultOpen={0} />
        </div>
      </div>
    </Section>
  );
}
