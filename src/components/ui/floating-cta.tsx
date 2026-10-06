"use client";

import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

// Where the chips hover on wide screens, as % of the card. They sit right of the title.
const SPOTS = [
  { top: "16%", left: "50%", rotate: -6 },
  { top: "60%", left: "45%", rotate: 4 },
  { top: "22%", left: "68%", rotate: 5 },
  { top: "64%", left: "64%", rotate: -4 },
];

/** Compact, fully clickable banner that points to another page. Chips drift
    around the title and a spotlight follows the cursor. */
export function FloatingCta({
  href,
  eyebrow,
  title,
  cta,
  chips,
  live = false,
  aside,
  className,
}: {
  href: string;
  eyebrow: string;
  title: React.ReactNode;
  cta: string;
  chips: string[];
  /** Pulsing green dot next to the eyebrow. */
  live?: boolean;
  /** Extra link(s) shown under the title, above the card's own link. */
  aside?: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const spotlight = useMotionTemplate`radial-gradient(22rem circle at ${mx}px ${my}px, color-mix(in srgb, var(--color-primary) 18%, transparent), transparent 70%)`;

  return (
    <Reveal className={className}>
      <div
        className="group relative overflow-hidden rounded-[2rem] border border-border bg-surface transition-colors duration-500 hover:border-ink/20"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set(e.clientX - r.left);
          my.set(e.clientY - r.top);
        }}
      >
        <div aria-hidden className="absolute inset-0 grid-lines opacity-40 mask-fade-b" />
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: spotlight }} />
        <div aria-hidden className="absolute -right-24 -bottom-32 h-72 w-72 rounded-full bg-primary/20 blur-[100px] transition-transform duration-700 group-hover:scale-125" />

        {/* Floating chips (wide screens) */}
        <ul aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
          {chips.slice(0, SPOTS.length).map((chip, i) => (
            <motion.li
              key={chip}
              className="glass absolute rounded-full px-4 py-2 text-xs font-medium whitespace-nowrap text-muted-foreground shadow-[0_10px_30px_-12px_var(--color-shadow)] transition-colors duration-300 group-hover:text-foreground"
              style={{ top: SPOTS[i].top, left: SPOTS[i].left, rotate: SPOTS[i].rotate }}
              animate={reduce ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 4 + i * 0.7, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
            >
              {chip}
            </motion.li>
          ))}
        </ul>

        <div className="relative flex flex-col gap-8 p-8 md:p-10 lg:min-h-56 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md space-y-4 lg:max-w-[40%]">
            <p className="flex items-center gap-2 font-mono text-xs tracking-widest text-muted-foreground uppercase">
              {live && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />}
              {eyebrow}
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">{title}</h2>
            {/* Chips sit inline on narrow screens */}
            <ul className="flex flex-wrap gap-2 lg:hidden">
              {chips.map((chip) => (
                <li key={chip} className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                  {chip}
                </li>
              ))}
            </ul>
            {aside && <div className="relative z-10">{aside}</div>}
          </div>

          <Link href={href} className="flex items-center gap-4 self-start text-sm font-semibold text-foreground after:absolute after:inset-0 lg:self-center">
            <span className="lg:sr-only">{cta}</span>
            <span
              className={cn(
                "flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-500 ease-out-expo",
                "group-hover:scale-110 group-hover:rotate-45 lg:h-24 lg:w-24",
              )}
            >
              <ArrowUpRight className="h-6 w-6 lg:h-8 lg:w-8" />
            </span>
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
