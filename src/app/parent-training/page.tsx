import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductPage } from "@/components/shared/product-page";
import { getProduct } from "@/lib/content/products";

const product = getProduct("parent-training");

export const metadata: Metadata = {
  title: "Parent Training",
  description: product?.promise,
  alternates: { canonical: "/parent-training" },
};

export default function ParentTrainingPage() {
  if (!product) notFound();

  return (
    <ProductPage
      product={product}
      intro="Parent Training is for the adult in the room. It answers the three questions parents actually have: what should we practice, why does it matter, and what do I do next?"
      sections={[
        {
          title: "No fear-based advice",
          body: "We will never tell you that you're running out of time or that something is wrong with your child. Guidance here is practical, respectful, and focused on what you can do — because that is what actually helps.",
        },
        {
          title: "Demonstrations you can copy",
          body: "Watch a technique performed before you try it. Seeing it done removes the guesswork that makes most at-home practice fall apart in week two.",
        },
        {
          title: "Checklists and home guides",
          body: "Downloadable materials that turn a module into something you can keep on the fridge and actually follow on a normal weeknight.",
        },
        {
          title: "Knowing when to ask a professional",
          body: "One module is dedicated to recognizing when a licensed speech-language pathologist is the right next step. We would rather send you to the right person than keep you here.",
        },
      ]}
    />
  );
}
