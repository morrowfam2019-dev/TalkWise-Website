"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const buttonVariants = cva(
  [
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden",
    "whitespace-nowrap rounded-full font-medium tracking-[-0.01em]",
    "transition-[color,background-color,border-color,box-shadow,opacity] duration-300",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        /** The one true CTA. Polished gold. */
        gold: "bg-gold text-ink shadow-[0_10px_40px_-12px_rgba(252,191,17,0.65)] hover:bg-gold-200",
        /** Secondary on dark surfaces. */
        outline:
          "border border-[var(--hairline-strong)] bg-white/[0.03] text-white backdrop-blur-sm hover:border-gold/60 hover:bg-white/[0.07]",
        /** Solid light — for use on gold or image surfaces. */
        light: "bg-white text-ink hover:bg-bone",
        /** Inverted solid for light sections. */
        ink: "bg-ink text-white hover:bg-ink-700",
        ghost: "text-white/80 hover:bg-white/[0.06] hover:text-white",
      },
      size: {
        sm: "h-10 px-5 text-sm",
        md: "h-12 px-7 text-[0.9375rem]",
        lg: "h-14 px-9 text-base",
      },
    },
    defaultVariants: { variant: "gold", size: "md" },
  },
);

type ButtonProps = VariantProps<typeof buttonVariants> & {
  /** Magnetic cursor pull. Disabled automatically for reduced motion + touch. */
  magnetic?: boolean;
  className?: string;
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  "aria-label"?: string;
  target?: string;
  rel?: string;
};

/**
 * The magnetic transform lives on a wrapper element rather than on the
 * interactive node itself. Keeps Link/button typings clean and lets the label
 * trail the surface for a layered, tactile feel.
 */
export function Button({
  variant,
  size,
  magnetic = true,
  className,
  children,
  href,
  type = "button",
  disabled,
  onClick,
  target,
  rel,
  ...aria
}: ButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.4 });
  const labelX = useTransform(springX, (v) => v * 0.35);
  const labelY = useTransform(springY, (v) => v * 0.35);

  const active = magnetic && !reduced;

  function handleMove(event: React.PointerEvent<HTMLSpanElement>) {
    if (!active || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-14, Math.min(14, relX * 0.3)));
    y.set(Math.max(-10, Math.min(10, relY * 0.4)));
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const inner = (
    <>
      {/* Specular sweep on hover — pure decoration. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent_20%,rgba(255,255,255,0.45)_50%,transparent_80%)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full motion-reduce:hidden"
      />
      <motion.span
        style={active ? { x: labelX, y: labelY } : undefined}
        className="relative z-10 inline-flex items-center gap-2"
      >
        {children}
      </motion.span>
    </>
  );

  const classes = cn(buttonVariants({ variant, size }), className);

  // Whop checkout and other off-site destinations must bypass the client
  // router, and open safely.
  const isExternal = Boolean(href && /^(https?:)?\/\//.test(href));

  return (
    <motion.span
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={active ? { x: springX, y: springY } : undefined}
      className="inline-flex"
    >
      {href && isExternal ? (
        <a
          href={href}
          className={classes}
          target={target ?? "_blank"}
          rel={rel ?? "noreferrer noopener"}
          onClick={onClick}
          {...aria}
        >
          {inner}
        </a>
      ) : href ? (
        <Link href={href} className={classes} target={target} rel={rel} onClick={onClick} {...aria}>
          {inner}
        </Link>
      ) : (
        <button type={type} className={classes} disabled={disabled} onClick={onClick} {...aria}>
          {inner}
        </button>
      )}
    </motion.span>
  );
}

export { buttonVariants };
