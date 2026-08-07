import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Official TalkWise mark, traced from `official talkwise logo.png`.
 *
 * The mark is an ELLIPSE — not a rounded rectangle — with a sharp triangular
 * tail off the lower left and three dots across the middle. An earlier version
 * of this file drew a rounded rectangle; that was wrong. Match the PNG.
 *
 * Stroke uses currentColor so the mark can go gold, white, or ink depending on
 * surface. Never repaint the dots separately — they read as one object with
 * the outline.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 44" fill="none" aria-hidden="true" className={cn("h-8 w-8", className)}>
      <ellipse cx="24" cy="19" rx="19.4" ry="14.6" stroke="currentColor" strokeWidth="3.9" />
      {/* Tail: a solid wedge, angled down-left, springing from the lower-left curve. */}
      <path
        d="M15.9 31.6 18.2 42.4 26.3 32.6Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="15.6" cy="19" r="2.75" fill="currentColor" />
      <circle cx="24" cy="19" r="2.75" fill="currentColor" />
      <circle cx="32.4" cy="19" r="2.75" fill="currentColor" />
    </svg>
  );
}

/**
 * Full lockup: gold bubble, "Talk" in white + "Wise" in gold, ACADEMY beneath.
 * `stacked` mirrors the official centered lockup; the default is the
 * horizontal variant used in the header.
 */
export function Logo({
  className,
  href = "/",
  showWordmark = true,
  stacked = false,
}: {
  className?: string;
  href?: string;
  showWordmark?: boolean;
  stacked?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex rounded-2xl transition-opacity hover:opacity-90",
        stacked ? "flex-col items-center gap-3" : "items-center gap-2.5",
        className,
      )}
      aria-label="TalkWise Academy — home"
    >
      <LogoMark
        className={cn(
          "text-gold transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-rotate-6 group-hover:scale-105",
          stacked ? "h-14 w-14" : "h-8 w-8",
        )}
      />
      {showWordmark ? (
        <span className={cn("flex flex-col", stacked && "items-center")}>
          <span
            className={cn(
              "font-wordmark font-bold leading-none tracking-[-0.02em]",
              stacked ? "text-3xl" : "text-[1.0625rem]",
            )}
          >
            <span className="text-white">Talk</span>
            <span className="text-gold">Wise</span>
          </span>
          <span
            className={cn(
              "font-wordmark font-semibold uppercase text-white/90",
              stacked
                ? "mt-1.5 text-xs tracking-[0.42em] indent-[0.42em]"
                : "mt-1 text-[0.5rem] tracking-[0.34em] indent-[0.34em]",
            )}
          >
            Academy
          </span>
        </span>
      ) : null}
    </Link>
  );
}
