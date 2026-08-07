"use client";

import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { DeviceTier } from "@/hooks/use-device-tier";

/**
 * The Swarm — the site's opening move.
 *
 * A hundred gold particles orbit and scatter, then are pulled in to settle
 * into the header lockup as you scroll. Chosen over Sonic Bloom / Shatter /
 * Molten Pour / Ink Draw for feeling alive and communal rather than a single
 * clean effect.
 *
 * Particle count is tier-scaled since this is the heaviest of the five
 * options to run smoothly on a phone.
 *
 * Everything is driven by a `progress` ref (0→1) written by the parent from
 * scroll position — never React state, which would re-render on every frame.
 */

const GOLD = "#FCBF11";
const WHITE = "#FFFFFF";

type Props = {
  progress: React.RefObject<number>;
  tier: DeviceTier;
  /** Set false when the hero scrolls out, to stop the loop entirely. */
  activeRef: React.RefObject<boolean>;
};

function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}
function seg(p: number, a: number, b: number) {
  return clamp01((p - a) / (b - a));
}
function easeOut(t: number) {
  return 1 - Math.pow(1 - clamp01(t), 3);
}
function easeInOut(t: number) {
  t = clamp01(t);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function rnd(s: number) {
  const x = Math.sin(s * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export function Swarm({ progress, tier, activeRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;

    // Low-tier phones get fewer particles; the shape of the motion is unchanged.
    const particleCount = tier === "high" ? 150 : tier === "medium" ? 90 : 50;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, tier === "high" ? 2 : 1.5);
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(rect.width * dpr);
      canvas!.height = Math.round(rect.height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    /** Hero-centre → header-left, the path the mark travels as you scroll. */
    function home(t: number) {
      return {
        x: lerp(width * 0.5, width * 0.085, t),
        y: lerp(height * 0.42, height * 0.055, t),
        r: lerp(Math.min(width * 0.115, height * 0.2), Math.min(width * 0.016, 22), t),
      };
    }

    function bubble(cx: number, cy: number, r: number) {
      ctx!.beginPath();
      ctx!.ellipse(cx, cy, r, r * 0.74, 0, 0, Math.PI * 2);
    }

    function tail(cx: number, cy: number, r: number) {
      const ry = r * 0.74;
      ctx!.beginPath();
      ctx!.moveTo(cx - r * 0.4, cy + ry * 0.8);
      ctx!.lineTo(cx - r * 0.3, cy + ry * 1.62);
      ctx!.lineTo(cx + r * 0.06, cy + ry * 0.96);
      ctx!.closePath();
    }

    function render(time: number) {
      raf = requestAnimationFrame(render);
      if (!activeRef.current || !width) return;

      const p = clamp01(progress.current ?? 0);
      ctx!.clearRect(0, 0, width, height);

      const burst = seg(p, 0.12, 0.5);
      const vacuum = easeInOut(seg(p, 0.46, 0.84));
      const land = easeInOut(seg(p, 0.78, 1));
      const h = home(land);

      // 1 — particles burst outward from centre, orbit, then are vacuumed
      // into position around the bubble's outline
      for (let i = 0; i < particleCount; i++) {
        const a = rnd(i) * Math.PI * 2;
        const orbit = a + burst * 4.2 * (0.5 + rnd(i + 5) * 0.9);
        const spread = easeOut(burst) * (0.2 + rnd(i + 2) * 0.85) * (1 - vacuum);
        const rr = spread * Math.max(width, height) * 0.5;
        const ta = (i / particleCount) * Math.PI * 2;
        const fx = h.x + Math.cos(ta) * h.r;
        const fy = h.y + Math.sin(ta) * h.r * 0.74;
        const x = lerp(h.x + Math.cos(orbit) * rr, fx, vacuum);
        const y = lerp(h.y + Math.sin(orbit) * rr * 0.78, fy, vacuum);
        const sz = lerp(h.r * 0.1, h.r * 0.06, vacuum) * (0.5 + rnd(i + 8));

        ctx!.globalAlpha = (0.35 + rnd(i + 12) * 0.65) * (1 - vacuum * 0.35);
        ctx!.fillStyle = i % 7 === 0 ? WHITE : GOLD;
        ctx!.beginPath();
        ctx!.arc(x, y, Math.max(0.4, sz), 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;

      // 2 — the shell solidifies once the particles have mostly gathered
      const solid = easeInOut(seg(p, 0.66, 0.9));
      if (solid > 0.02) {
        ctx!.globalAlpha = solid;
        ctx!.strokeStyle = GOLD;
        ctx!.lineWidth = Math.max(1.4, h.r * 0.155);
        if (tier !== "low") {
          ctx!.shadowColor = "rgba(252,191,17,.7)";
          ctx!.shadowBlur = h.r * 0.6 * solid;
        }
        bubble(h.x, h.y, h.r);
        ctx!.stroke();
        ctx!.shadowBlur = 0;
        ctx!.fillStyle = GOLD;
        tail(h.x, h.y, h.r);
        ctx!.fill();

        // 3 — the three dots settle into place with the finished mark
        for (let i = -1; i <= 1; i++) {
          ctx!.beginPath();
          ctx!.arc(h.x + i * h.r * 0.44, h.y, h.r * 0.14, 0, Math.PI * 2);
          ctx!.fill();
        }
        ctx!.globalAlpha = 1;
      }
    }

    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [progress, tier, activeRef, reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
