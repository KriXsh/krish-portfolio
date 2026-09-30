"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";

/** Window-level Lenis. Anchor links (#experience etc.) glide instead of jump,
    offset so section tops clear the floating navbar. Reduced-motion users get
    native scrolling. */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        wheelMultiplier: 1,
        smoothWheel: true,
        // Offset comes from `scroll-margin-top` on sections (globals.css).
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
