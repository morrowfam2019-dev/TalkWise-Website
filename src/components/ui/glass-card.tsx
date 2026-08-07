"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type GlassCardProps = React.ComponentPropsWithoutRef<"div"> & {
  /** Adds a gold spotlight that tracks the cursor. */
  spotlight?: boolean;
  /** Subtle 3D tilt toward the cursor. */
  tilt?: boolean;
  interactive?: boolean;
};

export function GlassCard({
  spotlight = true,
  tilt = false,
  interactive = true,
  className,
  children,
  style,
  ...props
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [pointer, setPointer] = useState({ x: 50, y: 50, active: false });

  const enabled = interactive && !reduced;

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!enabled || !ref.current || event.pointerType !== "mouse") return;
    const rect = ref.current.getBoundingClientRect();
    setPointer({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
      active: true,
    });
  }

  const tiltStyle =
    enabled && tilt && pointer.active
      ? {
          transform: `perspective(1200px) rotateX(${(50 - pointer.y) * 0.05}deg) rotateY(${
            (pointer.x - 50) * 0.06
          }deg) translateZ(0)`,
        }
      : undefined;

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={() => setPointer((p) => ({ ...p, active: false }))}
      style={{ ...style, ...tiltStyle }}
      className={cn(
        "glass group relative overflow-hidden rounded-panel",
        "transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        enabled && "hover:border-[color-mix(in_oklab,var(--color-gold)_38%,transparent)]",
        className,
      )}
      {...props}
    >
      {spotlight && enabled ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(420px circle at ${pointer.x}% ${pointer.y}%, color-mix(in oklab, var(--color-gold) 14%, transparent), transparent 65%)`,
          }}
        />
      ) : null}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
