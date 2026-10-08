"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { useClientValue } from "@/lib/use-client-value";

/** Scroll-linked falling only where it is cheap and visible: a mouse and a wide screen. */
const readFine = () => window.matchMedia("(pointer: fine) and (min-width: 1024px)").matches;

/** One clover leaf - the same heart-shaped leaf as the journey and skills
    clovers, drifting loose: see-through navy, a thin gold outline and vein.
    Pure SVG, no image request. (Component names keep "petal" for history.) */
const LEAF = "M50 118C30 104 6 84 4 54 2 26 22 8 40 10c7 1 10 6 10 12 0-6 3-11 10-12 18-2 38 16 36 44-2 30-26 50-46 64Z";

function PetalShape({ id }: { id: string }) {
  return (
    <svg viewBox="-8 -8 116 136" className="h-full w-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id={`${id}-fill`} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#4a74c4" stopOpacity="0.32" />
          <stop offset="55%" stopColor="#1d3766" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#0a1428" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <path d={LEAF} fill={`url(#${id}-fill)`} stroke="var(--color-champagne)" strokeOpacity="0.5" strokeWidth="1.1" />
      <path d="M50 114C50 80 50 50 50 24" stroke="var(--color-champagne)" strokeOpacity="0.28" strokeWidth="0.8" fill="none" />
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

function Sway({ p, i, id }: { p: PetalSpec; i: number; id: string }) {
  return (
    <div
      className={cn("h-full w-full animate-petal will-change-transform", p.blur && "opacity-60")}
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
}

function FallingPetal({ p, i, id, progress }: { p: PetalSpec; i: number; id: string; progress: MotionValue<number> }) {
  const fall = p.fall ?? 90 + (i % 3) * 50;
  const spin = p.spin ?? (i % 2 ? -50 : 60);
  const y = useTransform(progress, [0, 1], [-fall / 2, fall / 2]);
  const rotate = useTransform(progress, [0, 1], [-spin / 2, spin / 2]);
  return (
    <motion.div style={{ y, rotate }} className={cn("absolute will-change-transform", p.className)}>
      <Sway p={p} i={i} id={id} />
    </motion.div>
  );
}

/** Scroll mode: one scroll tracker for the whole group (mounted only on desktop). */
function FallingPetals({ petals, name, className }: { petals: PetalSpec[]; name: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return (
    <div ref={ref} aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {petals.map((p, i) => (
        <FallingPetal key={i} p={p} i={i} id={`${name}-petal-${i}`} progress={scrollYProgress} />
      ))}
    </div>
  );
}

/** Slowly drifting rose petals, the floral accent from the editorial reference.
    The sway is CSS keyframes on transform only, so it costs nothing on the main
    thread. With `scroll`, on desktop each petal also falls and turns as its section
    passes (one transform per petal, still compositor-only). Reduced-motion users get
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
  const reduced = useReducedMotion();
  const fine = useClientValue(readFine, false);
  // Phones keep the gentle CSS sway only: a scroll tracker per section forced a
  // layout measurement each, which added up at startup.
  if (scroll && !reduced && fine) return <FallingPetals petals={petals} name={name} className={className} />;

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {petals.map((p, i) => (
        <div key={i} className={cn("absolute", p.className)}>
          <Sway p={p} i={i} id={`${name}-petal-${i}`} />
        </div>
      ))}
    </div>
  );
}
