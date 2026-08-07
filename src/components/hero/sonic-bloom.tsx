"use client";

import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { DeviceTier } from "@/hooks/use-device-tier";

/**
 * Sonic Bloom — the site's opening move.
 *
 * The three dots inside the logo emit sound rings that fill the screen; the
 * rings are then drawn back in and become the bubble outline, which settles
 * into the header lockup. The motion is literally about speech, which is why
 * it was chosen over the shatter/swarm alternatives.
 *
 * Everything is driven by a `progress` ref (0→1) written by the parent from
 * scroll position — never React state, which would re-render on every frame.
 *
 * Geometry matches `official talkwise logo.png`: an ellipse (ry = 0.74 × rx)
 * with a sharp triangular tail down-left and three dots across the middle.
 */

const GOLD = "#FCBF11";
const GOLD_HI = "#FFE08A";

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

export function SonicBloom({ progress, tier, activeRef }: Props) {
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

    // Low-tier phones get fewer rings; the shape of the motion is unchanged.
    const ringCount = tier === "high" ? 8 : tier === "medium" ? 6 : 4;

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

      const emit = seg(p, 0.06, 0.56);
      const collapse = seg(p, 0.48, 0.84);
      const land = easeInOut(seg(p, 0.78, 1));
      const h = home(land);
      const t = reduced ? 0 : time;

      // 1 — rings leave the dots and fill the frame
      for (let i = 0; i < ringCount; i++) {
        const phase = clamp01((emit - i * 0.085) / 0.5);
        if (phase <= 0) continue;
        const out = easeOut(phase) * (1 - easeInOut(collapse));
        const rr = out * Math.max(width, height) * 0.62 + h.r;
        const alpha = (1 - out * 0.72) * (1 - collapse * 0.55) * 0.8;
        if (alpha <= 0.02 || rr <= 0) continue;

        ctx!.globalAlpha = alpha;
        ctx!.strokeStyle = i % 2 ? GOLD_HI : GOLD;
        ctx!.lineWidth = Math.max(1, h.r * 0.1 * (1 - out * 0.5));
        ctx!.beginPath();
        ctx!.ellipse(h.x, h.y, rr, rr * 0.74, 0, 0, Math.PI * 2);
        ctx!.stroke();
      }
      ctx!.globalAlpha = 1;

      // 2 — the shell is drawn back in as the rings collapse
      const shell = easeInOut(collapse);
      if (shell > 0.04) {
        ctx!.globalAlpha = shell;
        ctx!.strokeStyle = GOLD;
        ctx!.lineWidth = Math.max(1.4, h.r * 0.155);
        if (tier !== "low") {
          ctx!.shadowColor = "rgba(252,191,17,.7)";
          ctx!.shadowBlur = h.r * 0.7 * shell;
        }
        bubble(h.x, h.y, h.r);
        ctx!.stroke();
        ctx!.shadowBlur = 0;
        ctx!.fillStyle = GOLD;
        tail(h.x, h.y, h.r);
        ctx!.fill();
        ctx!.globalAlpha = 1;
      }

      // 3 — the dots ride the pulse outward, then close ranks
      const spread = 1 + Math.sin(emit * Math.PI) * 1.5 * (1 - collapse);
      const breathe = reduced ? 0 : Math.sin(t * 0.0016) * h.r * 0.02 * (1 - p);
      ctx!.fillStyle = GOLD;
      for (let i = -1; i <= 1; i++) {
        ctx!.beginPath();
        ctx!.arc(h.x + i * h.r * 0.44 * spread, h.y + breathe, h.r * 0.14, 0, Math.PI * 2);
        ctx!.fill();
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
