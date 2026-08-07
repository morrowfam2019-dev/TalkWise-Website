import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductPage } from "@/components/shared/product-page";
import { getProduct } from "@/lib/content/products";

const product = getProduct("esl-academy");

export const metadata: Metadata = {
  title: "ESL Academy",
  description: product?.promise,
  alternates: { canonical: "/esl-academy" },
};

export default function EslAcademyPage() {
  if (!product) notFound();

  return (
    <ProductPage
      product={product}
      // Adult ESL content stays professional and adult-facing per the V2
      // Brand System Standard — never child-coded.
      showDisclaimer={false}
      intro="ESL Academy teaches American English pronunciation and real-life communication for adults. We teach a target, not a correction: other varieties of English are not inferior, and your accent is not a problem to be erased."
      sections={[
        {
          title: "Pronunciation you can hear yourself fix",
          body: "Lessons work at the sound level — mouth position, rhythm, and stress — with the specific contrasts that most affect whether you're understood the first time.",
        },
        {
          title: "Built on your first language",
          body: "The sounds that are hardest depend on the language you already speak. Lessons use language-transfer context so you're working on what actually matters for you, not a generic list.",
        },
        {
          title: "English for real situations",
          body: "Practice is anchored to real life: work, school, travel, interviews, phone calls, and the everyday conversations where being understood matters most.",
        },
        {
          title: "Global, not generic",
          body: "Country-specific content uses verified cultural and language context. Localization here means real context — never translated text pasted over the same lesson.",
        },
        {
          title: "Taught by Mr. Diego",
          body: "Mr. Diego is the approved educator for English learning at TalkWise — direct, encouraging, and pitched at adults, not children.",
        },
      ]}
    />
  );
}
