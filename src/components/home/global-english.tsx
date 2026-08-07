"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import { Flag, FLAG_LABELS, type FlagCode } from "@/components/brand/flags";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { TEN_MARKETS } from "@/lib/content/growth-markets";

/**
 * Global English — the ESL Academy moment on the homepage.
 *
 * Country selection is sourced, not arbitrary: see
 * `lib/content/growth-markets.ts` for the citation. Built to feel like a room
 * where everyone is welcome rather than a "world tour" — flags are shown as a
 * continuous procession of equals, none larger or more central than another,
 * with no ranking and no map. The V2 Brand System Standard forbids reducing
 * cultures to flags as decoration — here they are the people in the room,
 * paired with a real invitation to join.
 *
 * Copy is deliberately forward-looking ("built to reach," never "our
 * learners come from") — TalkWise has not launched paid international
 * membership yet, and the sourced list scores market OPPORTUNITY, not an
 * existing user base. Do not reword toward a claim of existing users.
 *
 * Rows drift with scroll (so the section is alive without autoplay) and each
 * flag waves on its own offset so the strip never pulses in unison.
 */

// Two rows travelling opposite ways, each the sourced ten split so
// neighbouring flags in the two rows are from different continents.
const ROW_A: FlagCode[] = ["in", "id", "eg", "vn", "co"];
const ROW_B: FlagCode[] = ["pk", "ng", "mx", "bd", "br"];

/**
 * Same ten markets, shown as bubble text beside Mr. Diego's photo — a visual
 * rhyme with the Speech Academy classroom's greeting bubbles.
 */
const MARKETS_LEFT = TEN_MARKETS.slice(0, 5);
const MARKETS_RIGHT = TEN_MARKETS.slice(5);

export function GlobalEnglish() {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // "Moves with the page" — the rows slide as you scroll rather than looping
  // on a timer, so scrolling feels like it drives the world.
  const rowAx = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const rowBx = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const diegoY = useTransform(scrollYProgress, [0, 1], ["16%", "-8%"]);

  return (
    <section ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      {/* Diego's world: deep navy with warm gold light, not the site's black. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(90% 70% at 70% 30%, #16233A 0%, #0C1421 55%, #070B12 100%)",
        }}
      />
      <div className="grain-overlay -z-10" />

      <Container size="full">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-3 text-2xs font-medium uppercase tracking-[0.24em] text-gold-300">
              <span aria-hidden className="h-px w-8 bg-gold/50" />
              ESL Academy
            </p>

            <h2 className="mt-7 max-w-2xl text-balance-pretty font-display text-display-md leading-[1.02] tracking-[-0.025em]">
              English connects the world.
              <br />
              <span className="text-foil">Everyone is welcome here.</span>
            </h2>

            <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-white/70">
              American English pronunciation and real-life speaking, taught for the
              situations that actually matter. We teach a target, not a correction —
              your accent is not a problem to be erased.
            </p>

            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              {["Speak", "Practice", "Connect", "Succeed"].map((word, index) => (
                <li key={word} className="flex items-baseline gap-2.5 text-white/80">
                  <span className="font-display text-sm tabular-nums text-gold/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {word}
                </li>
              ))}
            </ul>

            <div className="mt-11 flex flex-col gap-3 sm:flex-row">
              <Button href="/esl-academy" variant="gold" size="lg">
                Explore ESL Academy
              </Button>
              <Button href="/updates" variant="outline" size="lg">
                Get updates
              </Button>
            </div>
          </div>

          {/* Mr. Diego, in his own studio — the full photo, not a cutout, so
              the neon "Let's Talk" sign and lit world map behind him read as
              real rather than pasted in. Region bubbles flank the frame. */}
          <div className="relative lg:col-span-5">
            <motion.div
              style={reduced ? undefined : { y: diegoY }}
              className="relative mx-auto w-full max-w-sm"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-panel border border-[var(--hairline)] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)]">
                <Image
                  src="/characters/mr-diego-full.webp"
                  alt="Mr. Diego in his studio, seated in front of a lit world map."
                  fill
                  sizes="(max-width: 1024px) 60vw, 380px"
                  className="object-cover"
                />
              </div>

              {/* Market bubbles, staggered down each side. Hidden below lg —
                  there isn't room beside a full-width portrait on a phone. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-3 hidden w-0 lg:block"
              >
                {MARKETS_LEFT.map((market, index) => (
                  <RegionBubble
                    key={market}
                    text={market}
                    side="left"
                    style={{ top: `${6 + index * 19}%` }}
                    delay={index * 0.1}
                  />
                ))}
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -right-3 hidden w-0 lg:block"
              >
                {MARKETS_RIGHT.map((market, index) => (
                  <RegionBubble
                    key={market}
                    text={market}
                    side="right"
                    style={{ top: `${14 + index * 19}%` }}
                    delay={0.2 + index * 0.1}
                  />
                ))}
              </div>
            </motion.div>

            <p className="mt-8 text-center text-2xs uppercase tracking-[0.2em] text-white/35 lg:hidden">
              Built to reach the markets shown below
            </p>
          </div>
        </div>
      </Container>

      {/* Flag procession */}
      <div className="mt-20 space-y-5">
        <FlagRow codes={ROW_A} x={rowAx} reduced={reduced} />
        <FlagRow codes={ROW_B} x={rowBx} reduced={reduced} offset={0.6} />
      </div>

      <Container size="full">
        <p className="mt-12 max-w-xl text-sm leading-relaxed text-white/40">
          ESL Academy is built to reach English learners around the world. Lessons draw
          on language-transfer context — the sounds that are hardest depend on the
          language you already speak.
        </p>
      </Container>
    </section>
  );
}

function FlagRow({
  codes,
  x,
  reduced,
  offset = 0,
}: {
  codes: FlagCode[];
  x: ReturnType<typeof useTransform<number, string>>;
  reduced: boolean;
  offset?: number;
}) {
  // Tripled so the row stays full-bleed at any width while it drifts.
  const strip = [...codes, ...codes, ...codes];

  return (
    <motion.ul
      style={reduced ? undefined : { x }}
      className="flex w-[130%] -translate-x-[12%] items-center gap-5 sm:gap-8"
      aria-label="Markets ESL Academy is built to reach"
    >
      {strip.map((code, index) => (
        <li key={`${code}-${index}`} className="shrink-0">
          <span
            className="block motion-reduce:animate-none"
            style={
              reduced
                ? undefined
                : {
                    animation: `flag-wave ${5.5 + (index % 4) * 0.7}s ease-in-out infinite`,
                    animationDelay: `${(index % 6) * 0.45 + offset}s`,
                  }
            }
          >
            <Flag
              code={code}
              className="h-11 w-[4.125rem] rounded-[3px] shadow-[0_8px_20px_-8px_rgba(0,0,0,0.8)] sm:h-14 sm:w-21"
            />
          </span>
          <span className="sr-only">{FLAG_LABELS[code]}</span>
        </li>
      ))}
    </motion.ul>
  );
}

/**
 * Market/country label in the same gold-bubble language as the Speech
 * Academy greetings — a speech bubble, not a badge. The tail points toward
 * Diego's photo, so the bubble reads as being said in his direction.
 */
function RegionBubble({
  text,
  side,
  style,
  delay,
}: {
  text: string;
  side: "left" | "right";
  style: React.CSSProperties;
  delay: number;
}) {
  // The bubble anchors to the edge of its (zero-width) column nearest the
  // photo and grows AWAY from it — a left-column bubble hangs off the right
  // edge of its container and extends leftward. The tail sits on that same
  // inner edge, pointing back at the photo.
  const anchorSide = side === "left" ? "right" : "left";

  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? 10 : -10, scale: 0.92 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="absolute w-max"
      style={{ ...style, [anchorSide]: 0 }}
    >
      <span className="relative flex items-center justify-center rounded-[999px] border-2 border-gold bg-ink/85 px-4 py-2 backdrop-blur-sm">
        <span className="whitespace-nowrap font-wordmark text-xs font-semibold leading-none text-gold sm:text-sm">
          {text}
        </span>
        {/* Tail: a small CSS triangle on the inner edge, pointing at the photo.
            Left-side bubbles point right; right-side bubbles point left. */}
        <span
          aria-hidden
          className="absolute top-1/2 h-0 w-0 -translate-y-1/2"
          style={
            side === "left"
              ? {
                  right: "-7px",
                  borderTop: "6px solid transparent",
                  borderBottom: "6px solid transparent",
                  borderLeft: "7px solid var(--color-gold)",
                }
              : {
                  left: "-7px",
                  borderTop: "6px solid transparent",
                  borderBottom: "6px solid transparent",
                  borderRight: "7px solid var(--color-gold)",
                }
          }
        />
      </span>
    </motion.div>
  );
}
