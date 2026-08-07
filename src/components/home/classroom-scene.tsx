"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import { Container } from "@/components/ui/container";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Classroom scene — the page's first warm moment after the hero.
 *
 * Two layers: the room (slow parallax) and greeting bubbles clustered on the
 * chalkboard (faster drift), like they were written there. No presenter is
 * layered into this shot — the room and the children carry it on their own.
 *
 * Children are photographed from behind, faces never visible. That is a
 * standing requirement for TalkWise child-facing imagery, not an aesthetic
 * choice — do not swap in a shot showing children's faces.
 */

// Named constants rather than inline literals in the array below — an
// in-place Edit on this file previously corrupted a pasted Arabic string
// into Devanagari without erroring. Verified correct by code point after
// writing: Arabic "Marhaba" (U+0645 U+0631 U+062D U+0628 U+0627), Hindi
// "Namaste" (U+0928 U+092E U+0938 U+094D U+0924 U+0947).
const ARABIC_MARHABA = "مرحبا";
const HINDI_NAMASTE = "नमस्ते";

/**
 * Greetings, not flags. The V2 Brand System Standard forbids reducing cultures
 * to flags or generic "international" imagery; a greeting in someone's own
 * script is a person saying hello, which is the whole point of the company.
 *
 * Positions cluster on the chalkboard in `classroom.webp` — roughly x 48%-88%,
 * y 4%-32% of the frame — not over the children. Re-tune if the scene image
 * changes.
 */
const GREETINGS = [
  { text: "Hello", lang: "English", x: "50%", y: "9%", delay: 0 },
  { text: "Hola", lang: "Spanish", x: "62%", y: "5%", delay: 0.08 },
  { text: "你好", lang: "Chinese", x: "73%", y: "10%", delay: 0.16 },
  { text: ARABIC_MARHABA, lang: "Arabic", x: "64%", y: "23%", delay: 0.24 },
  { text: HINDI_NAMASTE, lang: "Hindi", x: "75%", y: "27%", delay: 0.32 },
  { text: "Olá", lang: "Portuguese", x: "84%", y: "13%", delay: 0.4 },
];

export function ClassroomScene() {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const roomY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const roomScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1.02, 1.06]);
  const bubblesY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink-900 py-20 sm:py-28">
      <Container size="full">
        <div className="relative overflow-hidden rounded-panel border border-[var(--hairline)]">
          {/* Taller on phones: at 16:9 the frame is short enough that the
              caption collides with the chalkboard bubbles above it. */}
          <div className="relative aspect-[4/5] sm:aspect-[16/9]">
            {/* Layer 1 — the room */}
            <motion.div
              style={reduced ? undefined : { y: roomY, scale: roomScale }}
              className="absolute inset-0"
            >
              <Image
                src="/scenes/classroom.webp"
                alt="Six children sitting together on a rug, seen from behind, listening at the front of a warm classroom."
                fill
                priority={false}
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover"
              />
            </motion.div>

            {/* Warm wash + edge vignette so overlaid type stays readable */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(10,8,4,.86) 0%, rgba(10,8,4,.2) 45%, rgba(10,8,4,.08) 70%), radial-gradient(80% 60% at 50% 40%, transparent 40%, rgba(10,8,4,.45) 100%)",
              }}
            />

            {/* Layer 2 — greetings on the chalkboard */}
            <motion.div
              aria-hidden
              style={reduced ? undefined : { y: bubblesY }}
              className="absolute inset-0"
            >
              {GREETINGS.map((greeting) => (
                <motion.div
                  key={greeting.lang}
                  initial={reduced ? false : { opacity: 0, y: 14, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.55,
                    delay: greeting.delay,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute -translate-x-1/2"
                  style={{ left: greeting.x, top: greeting.y }}
                >
                  <GreetingBubble text={greeting.text} />
                </motion.div>
              ))}
            </motion.div>

          </div>

          {/* Caption sits below the scene on phones and overlays it from sm up
              — same split used elsewhere, so the bubbles never fight it for
              room on a short mobile crop. */}
          <div className="relative bg-ink-900 p-7 sm:absolute sm:inset-x-0 sm:bottom-0 sm:bg-transparent sm:p-10">
            <div className="max-w-md">
              <p className="text-2xs uppercase tracking-[0.24em] text-gold-300">Speech Academy</p>
              <h2 className="mt-4 text-balance-pretty font-display text-display-sm leading-[1.05]">
                Every child arrives with something to say.
              </h2>
              <p className="mt-4 text-pretty text-sm leading-relaxed text-white/70 sm:text-base">
                One sound at a time, in a room where every language in it is welcome.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Gold speech bubble, drawn to the logo's proportions — oval, tail down-left. */
function GreetingBubble({ text }: { text: string }) {
  return (
    <span className="relative inline-flex">
      <span className="relative flex items-center justify-center rounded-[999px] border-2 border-gold bg-ink/80 px-4 py-2 backdrop-blur-sm sm:px-5 sm:py-2.5">
        <span className="font-wordmark text-sm font-semibold leading-none text-gold sm:text-base">
          {text}
        </span>
        {/* tail */}
        <svg
          viewBox="0 0 14 16"
          aria-hidden
          className="absolute -bottom-[13px] left-3 h-4 w-3.5 text-gold"
        >
          <path d="M11 0 2 15.2 12.6 4.2Z" fill="currentColor" />
        </svg>
      </span>
    </span>
  );
}
