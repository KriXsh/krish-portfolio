"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";
import { cn } from "@/lib/utils";

/** A giant serif ribbon that drifts on its own and surges with scroll speed,
    flipping direction when you scroll back up. One transform per frame, and the
    frame loop idles while the band is off screen. */
export function VelocityBand({
  words,
  baseVelocity = 2.5,
  className,
}: {
  words: string[];
  /** Percent of one copy's width per second; negative runs right-to-left reversed. */
  baseVelocity?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "200px 0px" });
  // The frame loop drives the band by hand, so MotionConfig's reducedMotion can't stop it.
  const reduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (!inView || reduced) return;
    let move = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * f;
    baseX.set(baseX.get() + move);
  });

  const line = (
    <span className="flex shrink-0 items-center">
      {words.map((w, i) => (
        <span key={i} className="flex items-center">
          <span className={i % 2 ? "text-transparent [-webkit-text-stroke:1px_var(--color-champagne)]" : "text-champagne"}>{w}</span>
          <span className="mx-[0.35em] text-[0.4em] text-rose">✦</span>
        </span>
      ))}
    </span>
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("relative overflow-hidden border-y border-border py-6 select-none md:py-8", className)}
    >
      <motion.div
        style={{ x }}
        className="flex w-max font-sans text-[clamp(3rem,9vw,8.5rem)] leading-none font-light tracking-[-0.045em] whitespace-nowrap will-change-transform"
      >
        {line}
        {line}
        {line}
        {line}
      </motion.div>
    </div>
  );
}
