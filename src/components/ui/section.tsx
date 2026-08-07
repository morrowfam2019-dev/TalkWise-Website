import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionProps = React.ComponentPropsWithoutRef<"section"> & {
  /** Bone-colored surface with dark text. */
  light?: boolean;
  containerSize?: "sm" | "md" | "lg" | "full";
  /** Render children without the inner Container. */
  bleed?: boolean;
};

export function Section({
  light,
  containerSize = "lg",
  bleed,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative isolate py-24 sm:py-32 lg:py-40",
        light && "surface-light",
        className,
      )}
      {...props}
    >
      {bleed ? children : <Container size={containerSize}>{children}</Container>}
    </section>
  );
}

type EyebrowProps = React.ComponentPropsWithoutRef<"p">;

export function Eyebrow({ className, children, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-2xs font-medium uppercase tracking-[0.22em] text-gold-300",
        className,
      )}
      {...props}
    >
      <span aria-hidden className="h-px w-8 bg-gold/50" />
      {children}
    </p>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="max-w-3xl text-balance-pretty font-display text-display-sm leading-[1.05] tracking-[-0.02em]">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-pretty text-base leading-relaxed text-mist sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
