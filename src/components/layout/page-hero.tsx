import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

/**
 * Interior-page opener. Deliberately quieter than the homepage hero — no
 * WebGL, no fly-through. One pool of gold light, the eyebrow, and the promise.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  meta,
  children,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  /** Small facts shown under the lede — audience, presenter, status. */
  meta?: { label: string; value: string }[];
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative isolate overflow-hidden pb-20 pt-40 sm:pb-28 sm:pt-52", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[38rem] w-[70rem] -translate-x-1/2 opacity-[0.17] blur-[120px]"
        style={{
          background: "radial-gradient(50% 60% at 50% 40%, var(--color-gold) 0%, transparent 70%)",
        }}
      />
      <div className="grain-overlay -z-10" />

      <Container size="full">
        <p className="flex items-center gap-3 text-2xs font-medium uppercase tracking-[0.24em] text-gold-300">
          <span aria-hidden className="h-px w-8 bg-gold/50" />
          {eyebrow}
        </p>

        <h1 className="mt-7 max-w-4xl text-balance-pretty font-display text-display-md leading-[1] tracking-[-0.025em]">
          {title}
        </h1>

        {lede ? (
          <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-mist">{lede}</p>
        ) : null}

        {meta?.length ? (
          <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-6 border-t border-[var(--hairline)] pt-8">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="text-2xs uppercase tracking-[0.2em] text-white/35">{item.label}</dt>
                <dd className="mt-2 text-[0.95rem] text-white/85">{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {children ? <div className="mt-12">{children}</div> : null}
      </Container>
    </section>
  );
}
