"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

/** One rose petal: cupped, with a darker heel and a lit edge. Pure SVG, no image request. */
function PetalShape({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 120 150" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id={`${id}-fill`} cx="38%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#9c2b3e" />
          <stop offset="45%" stopColor="#5c1220" />
          <stop offset="100%" stopColor="#1d050a" />
        </radialGradient>
        <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0a6a0" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#f0a6a0" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M60 146C26 132 4 98 8 62 12 28 36 4 62 4c28 0 52 26 50 60-2 38-22 70-52 82Z"
        fill={`url(#${id}-fill)`}
      />
      <path d="M62 4c28 0 52 26 50 60-1 14-5 28-12 40C108 70 96 26 62 4Z" fill={`url(#${id}-edge)`} />
      <path d="M60 140C52 110 50 70 58 30" stroke="#1a0408" strokeOpacity="0.35" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

export type PetalSpec = {
  /** Tailwind position + size classes, e.g. "top-10 -right-6 w-28 h-36". */
  className: string;
  rotate?: number;
  /** Seconds for one sway cycle; varied so petals never move in lockstep. */
  duration?: number;
  delay?: number;
  blur?: boolean;
  /** Scroll mode only: px the petal falls while its section crosses the screen. */
  fall?: number;
  /** Scroll mode only: degrees it turns over that distance (sign = direction). */
  spin?: number;
};

function Petal({
  p,
  i,
  id,
  progress,
  active,
}: {
  p: PetalSpec;
  i: number;
  id: string;
  progress: MotionValue<number>;
  active: boolean;
}) {
  const fall = p.fall ?? 90 + (i % 3) * 50;
  const spin = p.spin ?? (i % 2 ? -50 : 60);
  const y = useTransform(progress, [0, 1], [-fall / 2, fall / 2]);
  const rotate = useTransform(progress, [0, 1], [-spin / 2, spin / 2]);

  const sway = (
    <div
      className={cn("h-full w-full animate-petal will-change-transform", p.blur && "opacity-70 md:blur-[2px]")}
      style={
        {
          "--petal-rot": `${p.rotate ?? 0}deg`,
          "--petal-duration": `${p.duration ?? 14}s`,
          "--petal-x": `${i % 2 ? -12 : 12}px`,
          "--petal-y": `${-14 - i * 3}px`,
          animationDelay: `${p.delay ?? i * -2.3}s`,
        } as React.CSSProperties
      }
    >
      <PetalShape id={id} />
    </div>
  );

  if (!active) return <div className={cn("absolute", p.className)}>{sway}</div>;
  return (
    <motion.div style={{ y, rotate }} className={cn("absolute will-change-transform", p.className)}>
      {sway}
    </motion.div>
  );
}

/** Slowly drifting rose petals, the floral accent from the editorial reference.
    The sway is CSS keyframes on transform only, so it costs nothing on the main
    thread. With `scroll`, each petal also falls and turns as its section passes
    (one transform per petal, still compositor-only). Reduced-motion users get
    them static. Blur is desktop-only: a filter on a moving layer is expensive on
    phone GPUs. */
export function Petals({
  petals,
  name,
  className,
  scroll = false,
}: {
  petals: PetalSpec[];
  name: string;
  className?: string;
  scroll?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <div ref={ref} aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {petals.map((p, i) => (
        <Petal key={i} p={p} i={i} id={`${name}-petal-${i}`} progress={scrollYProgress} active={scroll && !reduced} />
      ))}
    </div>
  );
}
