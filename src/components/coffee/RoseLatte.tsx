"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MENU } from "@/lib/coffee";
import { cn } from "@/lib/utils";
import { useOnScreen } from "@/lib/use-on-screen";

const ease = [0.16, 1, 0.3, 1] as const;
const ROSE_ART =
  "M60 54c4-2 8 1.4 6 5.4-2 4.6-9.4 4.6-11.4-.6-2.6-6 3.4-12 10-10.6 8 1.4 12 10 8 17.4-4.6 8-16.6 9.4-23.4 2.6-7-7-5.6-19.4 3-25";
const LEAVES = "M60 74c-5 5-12 6-17 3 4-4 11-5 17-3ZM60 74c5 5 12 6 17 3-4-4-11-5-17-3Z";

/** The footer's coffee stop: a navy latte seen from above. Steam curls up,
    the crema turns slowly, and a rose is poured into it as latte art - poured
    again every time you hover. The whole card goes to /support. */
export function RoseLatte() {
  const reduced = useReducedMotion();
  const [pour, setPour] = useState(0);
  const from = Math.min(...MENU.map((m) => m.price));
  const [ref, onScreen] = useOnScreen<HTMLAnchorElement>();

  const art = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true },
          transition: { duration: 1.6, ease, delay },
        };

  return (
    <Link
      ref={ref}
      href="/support"
      onMouseEnter={() => setPour((n) => n + 1)}
      className={cn(
        "glass group relative flex items-center gap-5 overflow-hidden rounded-3xl p-5 transition-colors duration-500 hover:border-rose/40",
        !onScreen && "[&_*]:[animation-play-state:paused]",
      )}
    >
      <span
        aria-hidden
        className="absolute -inset-px rounded-3xl bg-[radial-gradient(circle_at_20%_50%,rgba(42,79,143,0.22),transparent_60%)] opacity-60 transition-opacity duration-500 group-hover:opacity-100"
      />

      <svg viewBox="0 0 120 120" aria-hidden className="relative h-24 w-24 shrink-0 overflow-visible transition-transform duration-700 ease-out-expo group-hover:-rotate-6">
        <defs>
          <radialGradient id="latte-coffee" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#3b64b0" />
            <stop offset="55%" stopColor="#1d3766" />
            <stop offset="100%" stopColor="#0f1d38" />
          </radialGradient>
        </defs>

        {/* steam, curling up off the cup */}
        {[44, 60, 76].map((x, i) => (
          <path
            key={x}
            d={`M${x} 22c-5-5 5-9 0-14`}
            stroke="#8fb3e8"
            strokeOpacity="0.55"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            className="animate-steam"
            style={{ animationDelay: `${i * 0.7}s` }}
          />
        ))}

        {/* saucer, handle, cup */}
        <circle cx="60" cy="64" r="52" fill="rgba(228,207,168,0.05)" stroke="var(--color-champagne)" strokeOpacity="0.25" />
        <rect x="96" y="56" width="18" height="14" rx="7" fill="none" stroke="var(--color-champagne)" strokeOpacity="0.6" strokeWidth="2.5" />
        <circle cx="60" cy="64" r="38" fill="#0a1222" stroke="var(--color-champagne)" strokeOpacity="0.7" strokeWidth="2" />

        {/* the crema turns slowly; the rose is poured on top */}
        <g className="origin-[60px_64px] animate-[spin_24s_linear_infinite]">
          <circle cx="60" cy="64" r="32" fill="url(#latte-coffee)" />
          <circle cx="60" cy="64" r="32" fill="none" stroke="#f3dccb" strokeOpacity="0.18" strokeWidth="3" />
        </g>
        <motion.g key={pour} transform="translate(0 4)" stroke="#f6e3d6" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <motion.path d={ROSE_ART} strokeWidth="2.2" {...art(0.1)} />
          <motion.path d={LEAVES} strokeWidth="1.6" {...art(0.7)} />
        </motion.g>
      </svg>

      <span className="relative min-w-0">
        <span className="block eyebrow text-champagne">
          <span className="text-rose">✦</span> Fuel the open source
        </span>
        <span className="mt-1.5 block font-display text-2xl leading-tight text-foreground">Buy me a coffee</span>
        <span className="block font-script text-2xl leading-tight text-rose">a coffee &amp; a rose</span>
        <span className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors group-hover:text-foreground">
          from ₹{from} · UPI or GitHub Sponsors
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-45" />
        </span>
      </span>
    </Link>
  );
}
