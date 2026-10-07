"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** A wine wax seal pressed with a rose. It stamps down (big, tilted, then
    settles) the first time it scrolls into view. */
export function WaxSeal({ className, label = "K" }: { className?: string; label?: string }) {
  const reduced = useReducedMotion();
  const drips = Array.from({ length: 18 }, (_, i) => (i * 360) / 18);

  return (
    <motion.svg
      viewBox="0 0 120 120"
      aria-hidden
      className={cn("drop-shadow-[0_10px_18px_rgba(40,6,14,0.55)]", className)}
      initial={reduced ? false : { scale: 1.9, rotate: -40, opacity: 0 }}
      whileInView={{ scale: 1, rotate: -12, opacity: 1 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.35 }}
    >
      <defs>
        <radialGradient id="wax" cx="40%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#c8475c" />
          <stop offset="50%" stopColor="#8e2236" />
          <stop offset="100%" stopColor="#4a0d1a" />
        </radialGradient>
      </defs>
      <g fill="url(#wax)">
        <circle cx="60" cy="60" r="50" />
        {drips.map((a) => (
          <circle key={a} cx={60 + 49 * Math.cos((a * Math.PI) / 180)} cy={60 + 49 * Math.sin((a * Math.PI) / 180)} r="8" />
        ))}
      </g>
      <circle cx="60" cy="60" r="38" fill="none" stroke="#f3c6bd" strokeOpacity="0.35" strokeWidth="1.2" />
      <g stroke="#f3c6bd" strokeOpacity="0.85" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M60 50c5-2.5 10 1.6 7.5 6.6-2.5 5.8-11.6 5.8-14.1-.8-3.3-7.4 4.1-14.9 12.4-13.2 10 1.6 14.9 12.4 9.9 21.5-5.8 9.9-20.7 11.6-29 3.3" />
        <path d="M60 78v10M60 84c-6-1-10-5-11-9 5 0 9 4 11 9ZM60 84c6-1 10-5 11-9-5 0-9 4-11 9Z" />
      </g>
      <text x="60" y="104" textAnchor="middle" fontSize="7" letterSpacing="2" fill="#f3c6bd" fillOpacity="0.7" fontFamily="var(--font-mono)">
        {label}
      </text>
    </motion.svg>
  );
}
