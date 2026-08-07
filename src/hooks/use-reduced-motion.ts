"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe reduced-motion listener.
 * Returns `true` until we know otherwise is NOT the behavior we want —
 * we default to `false` so the first paint matches the server, then correct
 * on mount. Every animation that reads this must be safe for one frame.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
