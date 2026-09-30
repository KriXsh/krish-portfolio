"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TOP = 58; // inner rim
const BOTTOM = 188; // inner floor

/** A mug that fills to `level` (0..1), with a rolling surface and steam that
    thickens as it fills. */
export function CoffeeCup({ level, className }: { level: number; className?: string }) {
  const surface = BOTTOM - (BOTTOM - TOP) * level;
  const steam = 0.25 + level * 0.75;

  return (
    <svg viewBox="0 0 240 240" className={cn("text-ink", className)} role="img" aria-label={`Cup ${Math.round(level * 100)}% full`}>
      <defs>
        <clipPath id="cup-inside">
          <path d="M44 56 H176 L164 184 Q162 196 150 196 H70 Q58 196 56 184 Z" />
        </clipPath>
        <linearGradient id="coffee" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c08457" />
          <stop offset="18%" stopColor="#7c4a2d" />
          <stop offset="100%" stopColor="#3b2014" />
        </linearGradient>
        <linearGradient id="mug" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity={0.16} />
          <stop offset="45%" stopColor="currentColor" stopOpacity={0.05} />
          <stop offset="100%" stopColor="currentColor" stopOpacity={0.12} />
        </linearGradient>
      </defs>

      {/* Steam */}
      {[88, 112, 136].map((x, i) => (
        <motion.path
          key={x}
          d={`M${x} 44 C ${x - 10} 30, ${x + 10} 20, ${x} 4`}
          fill="none"
          stroke="currentColor" strokeOpacity={0.45}
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: [0, steam, 0], y: [8, -6, -14] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}
        />
      ))}

      {/* Handle */}
      <path d="M172 90 C 214 88, 214 150, 166 150" fill="none" stroke="currentColor" strokeOpacity={0.18} strokeWidth="12" strokeLinecap="round" />

      {/* Coffee */}
      <g clipPath="url(#cup-inside)">
        <motion.g initial={false} animate={{ y: surface - TOP }} transition={{ type: "spring", stiffness: 60, damping: 14 }}>
          <motion.path
            d="M-60 58 Q -30 50 0 58 T 60 58 T 120 58 T 180 58 T 240 58 T 300 58 V 260 H -60 Z"
            fill="url(#coffee)"
            animate={{ x: [0, -60] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
          />
          <ellipse cx="110" cy="62" rx="40" ry="3" fill="rgba(255,236,210,0.25)" />
        </motion.g>
      </g>

      {/* Glass mug */}
      <path d="M44 56 H176 L164 184 Q162 196 150 196 H70 Q58 196 56 184 Z" fill="url(#mug)" stroke="currentColor" strokeOpacity={0.28} strokeWidth="2.5" />
      <path d="M58 70 L66 176" stroke="currentColor" strokeOpacity={0.25} strokeWidth="4" strokeLinecap="round" />
      {/* Saucer */}
      <ellipse cx="110" cy="208" rx="86" ry="10" fill="currentColor" fillOpacity={0.06} stroke="currentColor" strokeOpacity={0.14} />
    </svg>
  );
}
