"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   Five-leaf clover - shared by the journey (Introduction) and Skills.
   - Leaves burst out of the centre (spring + unfurl) the first time it scrolls in,
     and their gold outlines draw themselves.
   - The clover drifts round; scrolling spins it faster, and every change of the
     active leaf gives it a kick that decays back to the idle drift.
   - A ring ripples out on each change; desktop tilts toward the pointer.
   Everything that moves per frame is transform/opacity only.
   --------------------------------------------------------------------------- */

export const CLOVER_EASE = [0.16, 1, 0.3, 1] as const;
const LEAF = "M50 118C30 104 6 84 4 54 2 26 22 8 40 10c7 1 10 6 10 12 0-6 3-11 10-12 18-2 38 16 36 44-2 30-26 50-46 64Z";
const BOX = { left: "32%", width: "36%", bottom: "50%", height: "43%", transformOrigin: "50% 100%" } as const;

export type CloverLeaf = {
  key: string;
  /** Big line on the leaf: a year, an icon... */
  title: React.ReactNode;
  /** Small mono caption under it (use \n to break a long one). */
  sub: string;
  ariaLabel: string;
};

/** Autoplay + visibility for a clover. Picking a leaf pauses it for a while. */
export function useCloverPlayer(count: number, stepMs = 3400) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -10% 0px" });
  const seen = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const resume = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!seen || paused || !inView) return;
    const t = setInterval(() => setActive((a) => (a + 1) % count), stepMs);
    return () => clearInterval(t);
  }, [seen, paused, inView, count, stepMs]);

  useEffect(
    () => () => {
      if (resume.current) clearTimeout(resume.current);
    },
    [],
  );

  const pick = (i: number) => {
    setActive(i);
    setPaused(true);
    if (resume.current) clearTimeout(resume.current);
    resume.current = setTimeout(() => setPaused(false), 7000);
  };

  return { ref, inView, seen, active, paused, pick, stepMs };
}

export type CloverPlayer = ReturnType<typeof useCloverPlayer>;

function Leaf({
  i,
  uid,
  leaf,
  active,
  bloom,
  reduce,
  onPick,
}: {
  i: number;
  uid: string;
  leaf: CloverLeaf;
  active: boolean;
  bloom: boolean;
  reduce: boolean;
  onPick: () => void;
}) {
  return (
    <div className="pointer-events-none absolute" style={{ ...BOX, rotate: `${i * 72}deg`, zIndex: active ? 2 : 1 }}>
      <motion.div
        className="relative h-full w-full origin-bottom"
        initial={{ scale: 0, rotate: reduce ? 0 : -110, opacity: 0 }}
        animate={bloom ? { scale: active ? 1.12 : 1, rotate: 0, opacity: 1 } : undefined}
        transition={{
          scale: { type: "spring", stiffness: 170, damping: 13 },
          rotate: { type: "spring", stiffness: 90, damping: 11, delay: 0.15 + i * 0.12 },
          opacity: { duration: 0.4, delay: 0.15 + i * 0.12 },
        }}
      >
        <svg viewBox="0 0 100 120" className="h-full w-full overflow-visible">
          <defs>
            <linearGradient id={`${uid}-base`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" style={{ stopColor: "var(--color-primary)" }} stopOpacity="0.55" />
              <stop offset="100%" style={{ stopColor: "var(--color-violet)" }} stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id={`${uid}-hot`} x1="0.2" y1="0" x2="0.8" y2="1">
              <stop offset="0%" style={{ stopColor: "var(--color-glow)" }} stopOpacity="0.9" />
              <stop offset="45%" style={{ stopColor: "var(--color-primary)" }} />
              <stop offset="100%" style={{ stopColor: "var(--color-violet)" }} />
            </linearGradient>
          </defs>
          <g
            role="button"
            tabIndex={0}
            aria-label={leaf.ariaLabel}
            aria-pressed={active}
            className="pointer-events-auto cursor-pointer outline-none [&:focus-visible>path:last-child]:stroke-glow"
            onPointerEnter={(e) => e.pointerType === "mouse" && onPick()}
            onClick={onPick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onPick();
              }
            }}
          >
            <path d={LEAF} fill={`url(#${uid}-base)`} />
            <motion.path
              d={LEAF}
              fill={`url(#${uid}-hot)`}
              initial={false}
              animate={{ opacity: active ? 1 : 0 }}
              transition={{ duration: 0.6, ease: CLOVER_EASE }}
            />
            <path d="M50 116C50 80 50 50 50 24" stroke="var(--color-champagne)" strokeOpacity="0.25" strokeWidth="0.7" fill="none" />
            <motion.path
              d={LEAF}
              fill="none"
              stroke="var(--color-champagne)"
              strokeWidth={active ? 1.4 : 0.8}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={bloom ? { pathLength: 1, opacity: active ? 1 : 0.55 } : undefined}
              transition={{ pathLength: { duration: 1.6, ease: CLOVER_EASE, delay: 0.3 + i * 0.12 }, opacity: { duration: 0.5 } }}
            />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}

/** A leaf's text, on a layer above every leaf so neighbours never cover it. */
function LeafLabel({ i, leaf, active, spin, bloom }: { i: number; leaf: CloverLeaf; active: boolean; spin: MotionValue<number>; bloom: boolean }) {
  const angle = i * 72;
  // Keep the text upright whatever the clover is doing.
  const counter = useTransform(spin, (v) => -(v + angle));
  return (
    <div className="pointer-events-none absolute" style={{ ...BOX, rotate: `${angle}deg`, zIndex: 3 }}>
      <motion.div
        style={{ rotate: counter }}
        className="absolute inset-x-[-10%] top-[22%] flex flex-col items-center text-center will-change-transform"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={bloom ? { opacity: 1, scale: active ? 1.1 : 1 } : undefined}
        transition={{ opacity: { duration: 0.5, delay: 0.6 + i * 0.12 }, scale: { type: "spring", stiffness: 200, damping: 14 } }}
      >
        <span
          className={cn(
            "flex items-center justify-center font-display text-2xl leading-none transition-colors duration-500 md:text-[1.7rem]",
            active ? "text-white" : "text-champagne",
          )}
        >
          {leaf.title}
        </span>
        <span
          className={cn(
            "mt-1 font-mono text-[8px] leading-tight tracking-[0.12em] whitespace-pre uppercase transition-colors duration-500 md:text-[9px]",
            active ? "text-white/90" : "text-foreground/70",
          )}
        >
          {leaf.sub}
        </span>
      </motion.div>
    </div>
  );
}

export function Clover({
  player,
  leaves,
  children,
  className,
}: {
  player: CloverPlayer;
  leaves: CloverLeaf[];
  /** What sits inside the centre medallion. */
  children: React.ReactNode;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const reduce = !!useReducedMotion();
  const { ref, inView, seen, active, pick } = player;
  // Touch screens get a gentler scroll surge; fine pointers get the full spin + tilt.
  const coarse = useRef(false);
  useEffect(() => {
    coarse.current = window.matchMedia("(pointer: coarse)").matches;
  }, []);

  // Spin: idle drift + scroll velocity + a decaying kick on every change.
  const spin = useMotionValue(0);
  const kick = useRef(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  useAnimationFrame((_, dt) => {
    if (!inView || reduce) return;
    const s = dt / 1000;
    const v = Math.min(Math.abs(velocity.get()), 2500);
    const speed = 6 + v * (coarse.current ? 0.03 : 0.08) + kick.current;
    kick.current = kick.current < 0.5 ? 0 : kick.current * Math.pow(0.05, s);
    spin.set((spin.get() + speed * s) % 360);
  });
  useEffect(() => {
    kick.current = 260;
  }, [active]);

  // 3D tilt toward a mouse pointer.
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const rotX = useSpring(useTransform(ty, (v) => v * -14), { stiffness: 120, damping: 14 });
  const rotY = useSpring(useTransform(tx, (v) => v * 14), { stiffness: 120, damping: 14 });

  return (
    <div
      ref={ref}
      className={cn(
        "relative mx-auto aspect-square w-full [contain:layout_style] [perspective:900px]",
        !inView && "[&_*]:[animation-play-state:paused]",
        className,
      )}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        tx.set((e.clientX - r.left) / r.width - 0.5);
        ty.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        tx.set(0);
        ty.set(0);
      }}
    >
      <motion.div style={{ rotateX: rotX, rotateY: rotY }} className="relative h-full w-full [transform-style:preserve-3d]">
        <div aria-hidden className="absolute -inset-[4%] rounded-full bg-[radial-gradient(closest-side,rgba(42,79,143,0.42),rgba(42,79,143,0.12)_60%,transparent)]" />

        {/* orbit + comet, counter-drifting */}
        <div aria-hidden className="absolute -inset-[3%] animate-spin-slow rounded-full border border-dashed border-ink/10 [animation-direction:reverse]">
          <span className="absolute top-[-3px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-champagne shadow-[0_0_14px_4px_rgba(228,207,168,0.55)]" />
        </div>

        {/* stem - stays put while the leaves turn */}
        <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          <motion.path
            d="M50 52C53 70 47 86 33 101"
            fill="none"
            stroke="var(--color-champagne)"
            strokeOpacity="0.55"
            strokeWidth="0.9"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={seen ? { pathLength: 1 } : undefined}
            transition={{ duration: 1.4, ease: CLOVER_EASE }}
          />
        </svg>

        <motion.div style={{ rotate: spin }} className="absolute inset-0 will-change-transform">
          {leaves.map((leaf, i) => (
            <Leaf key={leaf.key} i={i} uid={`${uid}${i}`} leaf={leaf} active={active === i} bloom={seen} reduce={reduce} onPick={() => pick(i)} />
          ))}
          {leaves.map((leaf, i) => (
            <LeafLabel key={`${leaf.key}-label`} i={i} leaf={leaf} active={active === i} spin={spin} bloom={seen} />
          ))}
        </motion.div>

        {/* ripple on every change */}
        <AnimatePresence>
          {seen && (
            <motion.span
              key={active}
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-1/2 h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-champagne/60"
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 2.3, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: CLOVER_EASE }}
            />
          )}
        </AnimatePresence>

        {/* centre medallion */}
        <motion.div
          className="absolute top-1/2 left-1/2 h-[40%] w-[40%] -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0, opacity: 0 }}
          animate={seen ? { scale: 1, opacity: 1 } : undefined}
          transition={{ type: "spring", stiffness: 140, damping: 14, delay: 0.05 }}
        >
          <span
            aria-hidden
            className="absolute -inset-[5px] animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,var(--color-champagne),transparent_28%,var(--color-glow)_52%,transparent_76%,var(--color-champagne))]"
          />
          <div className="relative h-full w-full overflow-hidden rounded-full bg-surface ring-4 ring-background">{children}</div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/** Thin segmented progress line used under a clover. */
export function CloverProgress({
  player,
  labels,
  start,
  end,
  ariaLabel,
  className,
}: {
  player: CloverPlayer;
  labels: string[];
  start?: string;
  end?: string;
  ariaLabel: string;
  className?: string;
}) {
  const { active, paused, pick, stepMs } = player;
  return (
    <div className={cn("mx-auto flex max-w-xs items-center gap-2", className)} role="tablist" aria-label={ariaLabel}>
      {start && <span className="font-mono text-[10px] text-subtle">{start}</span>}
      {labels.map((label, i) => (
        <button
          key={label + i}
          role="tab"
          aria-selected={active === i}
          aria-label={label}
          onClick={() => pick(i)}
          className="relative h-1 flex-1 overflow-hidden rounded-full bg-ink/10"
        >
          {i < active && <span className="absolute inset-0 bg-champagne/60" />}
          {i === active && (
            <motion.span
              key={`${active}-${paused}`}
              className="absolute inset-y-0 left-0 bg-champagne"
              initial={{ width: paused ? "100%" : "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: paused ? 0 : stepMs / 1000, ease: "linear" }}
            />
          )}
        </button>
      ))}
      {end && <span className="font-mono text-[10px] text-subtle">{end}</span>}
    </div>
  );
}
