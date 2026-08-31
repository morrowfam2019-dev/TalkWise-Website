"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Back-to-back looping gameplay reel: two clips that behave as one
 * continuous demo. Clip 1 plays → ends → clip 2 plays → ends → clip 1 again,
 * forever. Implemented as two stacked <video> elements crossfaded on
 * `onEnded` rather than a single merged file, so each source can be swapped
 * or re-encoded independently later.
 *
 * Autoplay only runs when the visitor hasn't asked for reduced motion — with
 * reduced motion, the reel opens paused on its poster frame with a visible
 * play control instead of moving on its own.
 */
const CLIPS = [
  { src: "/media/talkwise-play/talkwise-play-1.mp4", label: "TalkWise Play gameplay, clip one" },
  { src: "/media/talkwise-play/talkwise-play-2.mp4", label: "TalkWise Play gameplay, clip two" },
] as const;

const POSTER = "/media/talkwise-play/poster.jpg";

export function VideoShowcase({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);
  // A visitor who taps play always overrides a reduced-motion preference;
  // otherwise autoplay follows that preference directly, with no separate
  // "started" state to reconcile against it after mount.
  const [manualStart, setManualStart] = useState(false);
  const started = manualStart || !reduced;

  useEffect(() => {
    if (!started) return;
    const current = videoRefs.current[active];
    const other = videoRefs.current[active === 0 ? 1 : 0];
    other?.pause();
    if (current) {
      current.currentTime = 0;
      void current.play().catch(() => {
        // Autoplay can be rejected by browser policy even when muted, in
        // which case the poster + manual play control remains the fallback.
      });
    }
  }, [active, started]);

  function handleEnded(index: number) {
    setActive(index === 0 ? 1 : 0);
  }

  function handleManualPlay() {
    setManualStart(true);
  }

  return (
    <div
      className={cn(
        "group relative aspect-video overflow-hidden rounded-panel border border-[var(--hairline)] bg-ink-900 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.65)]",
        className,
      )}
    >
      <span className="sr-only">
        Looping gameplay reel showing two TalkWise Play demos: interactive speech-practice
        adventures and Speech Basketball.
      </span>

      {CLIPS.map((clip, index) => (
        <video
          key={clip.src}
          ref={(el) => {
            videoRefs.current[index] = el;
          }}
          aria-hidden
          muted
          playsInline
          preload={index === 0 ? "auto" : "metadata"}
          poster={index === 0 ? POSTER : undefined}
          onEnded={() => handleEnded(index)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            started && active === index ? "opacity-100" : "opacity-0",
          )}
        >
          <source src={clip.src} type="video/mp4" />
        </video>
      ))}

      {!started ? (
        <button
          type="button"
          onClick={handleManualPlay}
          aria-label="Play the TalkWise Play gameplay reel"
          className="absolute inset-0 flex items-center justify-center bg-ink/30 transition-colors hover:bg-ink/20"
          style={{ backgroundImage: `url(${POSTER})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <motion.span
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-ink shadow-[0_10px_40px_-12px_rgba(252,191,17,0.65)]"
          >
            <svg viewBox="0 0 24 24" aria-hidden className="ml-1 h-6 w-6 fill-current">
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.span>
        </button>
      ) : null}

      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
    </div>
  );
}
