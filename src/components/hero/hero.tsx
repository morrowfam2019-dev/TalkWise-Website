"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import { Swarm } from "@/components/hero/swarm";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useDeviceTier } from "@/hooks/use-device-tier";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { site } from "@/lib/site";

/**
 * Opening sequence — "The Swarm".
 *
 * The section is deliberately ~3 screens tall with a sticky inner frame, so the
 * swarm plays out over a MEDIUM scroll drag: long enough that nobody flicks
 * past Nia's line, short enough that it never feels like the page is stuck.
 * Tune SCROLL_LENGTH to change that pacing; nothing else depends on it.
 *
 * Scroll progress reaches the canvas through a ref, not React state — a 60fps
 * re-render of this subtree would drop frames on mid-tier phones.
 */
const SCROLL_LENGTH = "320vh";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progress = useRef(0);
  const active = useRef(true);
  const { tier } = useDeviceTier();
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (value) => {
      progress.current = value;
    });
  }, [scrollYProgress]);

  // Halt the render loop once the hero leaves the viewport.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        active.current = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Three beats: the promise, Nia's line, then the way in.
  const introOpacity = useTransform(scrollYProgress, [0, 0.04, 0.2, 0.3], [0, 1, 1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.3], [0, -40]);

  const quoteOpacity = useTransform(scrollYProgress, [0.34, 0.44, 0.66, 0.74], [0, 1, 1, 0]);
  const quoteScale = useTransform(scrollYProgress, [0.34, 0.74], [0.96, 1.04]);

  const ctaOpacity = useTransform(scrollYProgress, [0.78, 0.88], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.78, 0.88], [30, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: reduced ? "100vh" : SCROLL_LENGTH }}
      aria-label="TalkWise Academy"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Warm ground — the brand black pulled toward amber, so the gold sits
            in light rather than on a cold slab. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 42%, #1B1305 0%, #0D0A05 55%, #080604 100%)",
          }}
        />
        <div className="grain-overlay -z-10" />

        {!reduced ? <Swarm progress={progress} tier={tier} activeRef={active} /> : null}

        <Container size="full" className="relative">
          {reduced ? (
            // Reduced-motion: one static block in normal flow. The absolute
            // three-beat stack below relies on scroll-driven opacity to keep
            // the beats apart — with no scroll animation, all three would sit
            // on top of each other, so this is a genuinely different layout,
            // not the same one paused.
            <div className="mx-auto max-w-3xl text-center">
              <p className="flex items-center justify-center gap-3 text-2xs font-medium uppercase tracking-[0.28em] text-gold-300">
                <span aria-hidden className="h-px w-8 bg-gold/50" />
                Speech · Parents · English
                <span aria-hidden className="h-px w-8 bg-gold/50" />
              </p>
              <h1 className="mx-auto mt-7 max-w-4xl text-balance-pretty font-display text-display-lg leading-[0.98] tracking-[-0.03em]">
                Confidence Begins With Communication.
              </h1>
              <p className="mx-auto mt-8 max-w-xl text-pretty text-lg leading-relaxed text-mist">
                Practical, visual education for children, families, and adult English
                learners — taught by people who do this for a living.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href={site.membership.checkoutUrl} variant="gold" size="lg">
                  Join TalkWise
                </Button>
                <Button href="/how-talkwise-helps" variant="outline" size="lg">
                  See how it works
                </Button>
              </div>
            </div>
          ) : (
            <div className="relative min-h-[24rem] sm:min-h-[27rem]">
              {/* Beat 1 — the promise. The h1 stays in the DOM for SEO whatever
                  its opacity. Base opacity-100 is fine here: at scroll 0 the
                  motion opacity is already 1, so there is no pre-hydration flash. */}
              <motion.div
                style={{ opacity: introOpacity, y: introY }}
                className="absolute inset-x-0 top-0 text-center"
              >
                <p className="flex items-center justify-center gap-3 text-2xs font-medium uppercase tracking-[0.28em] text-gold-300">
                  <span aria-hidden className="h-px w-8 bg-gold/50" />
                  Speech · Parents · English
                  <span aria-hidden className="h-px w-8 bg-gold/50" />
                </p>
                <h1 className="mx-auto mt-7 max-w-4xl text-balance-pretty font-display text-display-lg leading-[0.98] tracking-[-0.03em]">
                  Confidence Begins
                  <br />
                  With Communication.
                </h1>
              </motion.div>

              {/* Beat 2 — the line this whole scroll exists to deliver.
                  `opacity-0` is a real base state, not a placeholder: before
                  JS mounts and motion sets its own inline style, this beat
                  must not be visible, or it stacks on top of beat 1 exactly
                  like the reported bug. Motion's inline style always wins
                  over the Tailwind class once it takes over, so nothing is
                  lost once the page is interactive. */}
              <motion.figure
                style={{ opacity: quoteOpacity, scale: quoteScale }}
                className="absolute inset-x-0 top-0 m-0 text-center opacity-0"
              >
                <blockquote className="mx-auto max-w-3xl text-balance-pretty font-display text-display-md leading-[1.06] tracking-[-0.025em]">
                  <span className="text-foil">Building confidence through communication</span>
                </blockquote>
                <figcaption className="mt-8 text-2xs uppercase tracking-[0.3em] text-gold-300">
                  — Nia Morrow, Co-Founder &amp; CEO
                </figcaption>
              </motion.figure>

              {/* Beat 3 — the way in. Same base-state reasoning as beat 2. */}
              <motion.div
                style={{ opacity: ctaOpacity, y: ctaY }}
                className="absolute inset-x-0 top-0 text-center opacity-0"
              >
                <p className="mx-auto max-w-xl text-pretty text-lg leading-relaxed text-mist">
                  Practical, visual education for children, families, and adult English
                  learners — taught by people who do this for a living.
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button href={site.membership.checkoutUrl} variant="gold" size="lg">
                    Join TalkWise
                  </Button>
                  <Button href="/how-talkwise-helps" variant="outline" size="lg">
                    See how it works
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </Container>

        {/* The sequence only works if people know to scroll. */}
        <motion.div
          aria-hidden
          style={reduced ? undefined : { opacity: introOpacity }}
          className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-3 text-2xs uppercase tracking-[0.24em] text-white/35"
        >
          Scroll
          <span className="h-10 w-px bg-gradient-to-b from-gold/60 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
