"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/** A hand-drawn wavy line that grows across as it scrolls into view, with a
    rose bud (✦) that blooms at the end. Shared divider for the rose sections. */
export function Vine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "start 45%"] });
  const grow = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const bud = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

  return (
    <div ref={ref} aria-hidden className={cn("relative flex items-center", className)}>
      <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="h-6 w-full">
        <motion.path
          d="M0 20C100 4 200 36 300 20S500 4 600 20 800 36 900 20s200-16 300 0"
          stroke="var(--color-champagne)"
          strokeOpacity="0.45"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          fill="none"
          style={reduced ? undefined : { pathLength: grow }}
        />
      </svg>
      <motion.span
        style={reduced ? undefined : { scale: bud, opacity: bud }}
        className="absolute -right-1 text-sm text-rose"
      >
        ✦
      </motion.span>
    </div>
  );
}
