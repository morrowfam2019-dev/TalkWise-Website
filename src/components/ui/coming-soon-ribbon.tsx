/**
 * Diagonal ribbon for content that hasn't shipped yet (Gallery tiles,
 * Testimonials slots). Parent must be `position: relative` and should clip
 * overflow (`overflow-hidden`) so the ribbon's rotated ends don't spill out.
 */
export function ComingSoonRibbon({ label = "Coming Soon" }: { label?: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
    >
      <div className="w-[150%] -rotate-6 bg-ink py-2 text-center shadow-[0_8px_30px_-8px_rgba(0,0,0,0.6)] ring-1 ring-gold/25">
        <span className="text-foil text-2xs font-semibold uppercase tracking-[0.32em]">
          {label}
        </span>
      </div>
    </div>
  );
}
