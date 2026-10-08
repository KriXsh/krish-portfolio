"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MENU } from "@/lib/coffee";
import { cn } from "@/lib/utils";
import { useOnScreen } from "@/lib/use-on-screen";

const EASE = [0.16, 1, 0.3, 1] as const;
const MIN_PRICE = Math.min(...MENU.map((m) => m.price));
const HEART = "M32 40c-6-4-9-7-9-11 0-3 2-5 4.6-5 2 0 3.4 1.2 4.4 3 1-1.8 2.4-3 4.4-3 2.6 0 4.6 2 4.6 5 0 4-3 7-9 11Z";

/** The footer latte, shrunk to an icon: seen from above, steam curling off,
    the crema turning, latte art poured again each time `pour` changes. */
function LatteMini({ size = 44, pour = 0 }: { size?: number; pour?: number }) {
  const id = useId().replace(/:/g, "");
  const reduced = useReducedMotion();
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden className="overflow-visible">
      <defs>
        <radialGradient id={`${id}-crema`} cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#3b64b0" />
          <stop offset="55%" stopColor="#1d3766" />
          <stop offset="100%" stopColor="#0f1d38" />
        </radialGradient>
      </defs>
      {[24, 32, 40].map((x, i) => (
        <path
          key={x}
          d={`M${x} 8c-3-3 3-5 0-8`}
          stroke="#8fb3e8"
          strokeOpacity="0.6"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
          className="animate-steam"
          style={{ animationDelay: `${i * 0.7}s` }}
        />
      ))}
      <circle cx="32" cy="34" r="27" fill="rgba(228,207,168,0.06)" stroke="var(--color-champagne)" strokeOpacity="0.3" />
      <rect x="51" y="29" width="10" height="9" rx="4.5" fill="none" stroke="var(--color-champagne)" strokeOpacity="0.7" strokeWidth="2" />
      <circle cx="32" cy="34" r="20" fill="#0a1222" stroke="var(--color-champagne)" strokeOpacity="0.8" strokeWidth="1.6" />
      <g className="origin-[32px_34px] animate-[spin_18s_linear_infinite]">
        <circle cx="32" cy="34" r="16.5" fill={`url(#${id}-crema)`} />
        <circle cx="32" cy="34" r="16.5" fill="none" stroke="#f3dccb" strokeOpacity="0.2" strokeWidth="2" />
      </g>
      <motion.path
        key={pour}
        d={HEART}
        transform="translate(0 -1)"
        fill="none"
        stroke="#f6e3d6"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduced ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease: EASE }}
      />
    </svg>
  );
}

/** Spinning gold-and-sapphire rim around a dark disc - shared by the hero icon and the dock. */
function Rim({ children, size }: { children: React.ReactNode; size: number }) {
  return (
    <span className="relative inline-flex shrink-0 overflow-hidden rounded-full p-px" style={{ width: size, height: size }}>
      <span
        aria-hidden
        className="absolute inset-[-60%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_0deg,#2a4f8f,#e4cfa8,#16305c,#d4b07f,#2a4f8f)]"
      />
      <span className="relative flex h-full w-full items-center justify-center rounded-full bg-[#0a0f1a]">{children}</span>
    </span>
  );
}

/** Hero: a small round latte instead of the big pill, with a tooltip on hover. */
export function CoffeeOrbLink() {
  const [pour, setPour] = useState(0);
  const [ref, onScreen] = useOnScreen<HTMLAnchorElement>();
  return (
    <Link
      ref={ref}
      href="/support"
      aria-label={`Buy me a coffee, from ₹${MIN_PRICE}`}
      onPointerEnter={() => setPour((n) => n + 1)}
      className={cn(
        "group relative inline-flex rounded-full shadow-[0_0_40px_-10px_rgba(74,116,196,0.55)] transition-transform duration-300 hover:-translate-y-0.5",
        !onScreen && "[&_*]:[animation-play-state:paused]",
      )}
    >
      <Rim size={52}>
        <LatteMini size={42} pour={pour} />
      </Rim>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 translate-y-1 rounded-full border border-border bg-surface/95 px-3 py-1.5 text-xs whitespace-nowrap text-foreground opacity-0 shadow-[0_10px_30px_-12px_var(--color-shadow)] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
      >
        Buy me a coffee <span className="text-champagne">· from ₹{MIN_PRICE}</span>
      </span>
    </Link>
  );
}
