import type { Metadata } from "next";

import { Hero } from "@/components/hero/hero";
import { ClassroomScene } from "@/components/home/classroom-scene";
import { Journey } from "@/components/home/journey";
import { GlobalEnglish } from "@/components/home/global-english";
import { HowItHelps } from "@/components/home/how-it-helps";
import { PlatformPreview } from "@/components/home/platform-preview";
import { Founders } from "@/components/home/founders";
import { Membership } from "@/components/home/membership";
import { UpdatesSignup } from "@/components/home/updates-signup";
import { Testimonials } from "@/components/home/testimonials";
import { FaqPreview } from "@/components/home/faq-preview";
import { FinalCta } from "@/components/home/final-cta";
import { OrganizationSchema, FaqSchema } from "@/components/seo/structured-data";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <OrganizationSchema />
      <FaqSchema />

      <Hero />
      {/* Warmth lands immediately after the hero — faces and a real room,
          before any product explanation. */}
      <ClassroomScene />
      <Journey />
      <HowItHelps />
      {/* The adult audience gets its own room, in Diego's navy rather than the
          site's black, so ESL never reads as an afterthought to the kids' work. */}
      <GlobalEnglish />
      <PlatformPreview />
      <Founders />
      <Membership />
      <UpdatesSignup />
      <Testimonials />
      <FaqPreview />
      <FinalCta />
    </>
  );
}
