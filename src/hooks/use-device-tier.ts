"use client";

import { useEffect, useState } from "react";

export type DeviceTier = "high" | "medium" | "low";

/**
 * Decides how much GPU work the hero is allowed to do.
 *
 * - `high`   full WebGL scene, particles, post-processing
 * - `medium` WebGL with reduced particle count and no post-processing
 * - `low`    no WebGL at all; CSS/SVG fallback
 *
 * Starts at "low" so the server render and first client paint agree, and so a
 * slow device never briefly mounts the expensive scene.
 */
export function useDeviceTier(): { tier: DeviceTier; resolved: boolean } {
  const [tier, setTier] = useState<DeviceTier>("low");
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setTier("low");
      setResolved(true);
      return;
    }

    // Save-Data / low memory / low core count are strong "keep it simple" signals.
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    const memory = nav.deviceMemory ?? 8;
    const cores = navigator.hardwareConcurrency ?? 8;
    const saveData = nav.connection?.saveData === true;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.innerWidth < 768;

    if (saveData || memory <= 2 || cores <= 2 || !hasWebGL()) {
      setTier("low");
    } else if (narrow || coarse || memory <= 4 || cores <= 4) {
      setTier("medium");
    } else {
      setTier("high");
    }
    setResolved(true);
  }, []);

  return { tier, resolved };
}

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ??
        canvas.getContext("webgl") ??
        canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}
