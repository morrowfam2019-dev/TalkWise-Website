import type { Metadata } from "next";

import { TalkWisePlayHero } from "@/components/talkwise-play/hero";
import { WhatIsTalkWisePlay } from "@/components/talkwise-play/what-is";
import { TalkWisePlayFeatures } from "@/components/talkwise-play/features";
import { TalkWisePlayProgression } from "@/components/talkwise-play/progression";
import { WhyTalkWisePlay } from "@/components/talkwise-play/why-play";
import { TalkWiseEcosystem } from "@/components/talkwise-play/ecosystem";
import { TalkWisePlayFinalCta } from "@/components/talkwise-play/final-cta";

export const metadata: Metadata = {
  title: "TalkWise Play",
  description:
    "Discover TalkWise Play, the interactive game-based learning experience inside TalkWise Academy. Practice speech sounds, words, sentences, listening and communication through engaging games.",
  alternates: { canonical: "/talkwise-play" },
};

export default function TalkWisePlayPage() {
  return (
    <>
      <TalkWisePlayHero />
      <WhatIsTalkWisePlay />
      <TalkWisePlayFeatures />
      <TalkWisePlayProgression />
      <WhyTalkWisePlay />
      <TalkWiseEcosystem />
      <TalkWisePlayFinalCta />
    </>
  );
}
