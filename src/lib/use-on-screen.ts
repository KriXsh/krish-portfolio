"use client";

import { useEffect, useRef, useState } from "react";

/** True while the element is on (or near) the screen. Used to pause decorative
    SVG animations (steam, turning crema) that would otherwise keep costing
    main-thread work every frame after they scroll out of view. */
export function useOnScreen<T extends Element>(rootMargin = "120px") {
  const ref = useRef<T>(null);
  const [onScreen, setOnScreen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return [ref, onScreen] as const;
}
