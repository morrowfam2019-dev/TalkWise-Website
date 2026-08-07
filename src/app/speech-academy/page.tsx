import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductPage } from "@/components/shared/product-page";
import { getProduct } from "@/lib/content/products";

const product = getProduct("speech-academy");

export const metadata: Metadata = {
  title: "Speech Academy",
  description: product?.promise,
  alternates: { canonical: "/speech-academy" },
};

export default function SpeechAcademyPage() {
  if (!product) notFound();

  return (
    <ProductPage
      product={product}
      intro="Speech Academy is the structured path through speech-sound learning. Lessons are sequenced, demonstrated, and explained in plain English — so the adult teaching them doesn't need a background in the subject to feel confident doing it."
      sections={[
        {
          title: "Sound learning, in order",
          body: "Lessons follow a deliberate sequence rather than the alphabet. Each one names the target clearly, shows where the tongue and lips go, and gives you a way to tell when it's right.",
        },
        {
          title: "Guided practice, not homework",
          body: "Every lesson comes with practice built in — words, then phrases, then real sentences. Short enough to actually finish, structured enough to add up.",
        },
        {
          title: "Parent support in every lesson",
          body: "You are never handed a lesson and left to figure out the delivery. Each one includes what to say, what to listen for, and what to do when it doesn't go smoothly.",
        },
        {
          title: "Progress you can see",
          body: "Track which sounds you've worked through and what comes next, so nobody has to hold the whole plan in their head.",
        },
        {
          title: "Taught by Miss Maya",
          body: "Miss Maya is the approved educational presenter for speech and family content — a consistent, familiar face across every lesson in the academy.",
        },
      ]}
    />
  );
}
