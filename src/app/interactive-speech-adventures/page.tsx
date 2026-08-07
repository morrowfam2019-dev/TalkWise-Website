import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductPage } from "@/components/shared/product-page";
import { getProduct } from "@/lib/content/products";

const product = getProduct("interactive-speech-adventures");

export const metadata: Metadata = {
  title: "Interactive Speech Adventures",
  description: product?.promise,
  alternates: { canonical: "/interactive-speech-adventures" },
};

export default function InteractiveSpeechAdventuresPage() {
  if (!product) notFound();

  return (
    <ProductPage
      product={product}
      intro="An Interactive Speech Adventure turns practice into a story. Each episode is built from ten polished scene cards with narration, captions, gentle camera movement, and pauses that are deliberately protected."
      sections={[
        {
          title: "The pause is the point",
          body: "Most practice tools rush a child to the next thing. Ours stop and wait. Protected pauses are built into the format so a child has time to respond without pressure.",
        },
        {
          title: "Ten scene cards per episode",
          body: "A fixed, polished structure — ten still-image scenes with gentle motion — that keeps every episode consistent, calm, and easy to follow.",
        },
        {
          title: "Narrated and captioned",
          body: "Every episode carries narration and captions, so children who are reading along, listening, or both are all supported.",
        },
        {
          title: "One episode approved, more in preparation",
          body: "The K Sound episode is our approved reference model. The remaining sounds are in production against that same standard — we would rather ship them right than ship them fast.",
        },
      ]}
    />
  );
}
