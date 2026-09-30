"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { MENU } from "@/lib/coffee";

const MIN_PRICE = Math.min(...MENU.map((m) => m.price));

/** Hero call-to-action for the coffee bar: a warm spinning rim, a steaming cup,
    and "+1" bubbles that rise from it. The bubbles are decoration only; they
    don't stand for real purchases. */
export function CoffeeButton() {
  const [bursts, setBursts] = useState<number[]>([]);

  const burst = () => {
    const id = Date.now();
    setBursts((b) => [...b.slice(-3), id]);
    setTimeout(() => setBursts((b) => b.filter((x) => x !== id)), 1400);
  };

  return (
    <Link
      href="/support"
      onPointerEnter={burst}
      className="group relative inline-flex overflow-hidden rounded-full p-px shadow-[0_0_40px_-10px_rgba(224,164,122,0.7)]"
    >
      {/* Spinning rim */}
      <span
        aria-hidden
        className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,#c08457,#f0c9a4,#7c4a2d,#e0a47a,#c08457)]"
        style={{ animation: "spin 4s linear infinite" }}
      />
      <span className="relative inline-flex items-center gap-3 rounded-full bg-[#1a120c] py-3 pr-4 pl-3 text-sm font-semibold text-[#f5efe6]">
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#2a1a10] ring-1 ring-[#e0a47a]/30">
          {/* Steaming cup */}
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
            <motion.path
              d="M9 3c-.8 1 .8 2 0 3M12.5 3c-.8 1 .8 2 0 3"
              stroke="#f0c9a4"
              strokeWidth="1.5"
              strokeLinecap="round"
              animate={{ opacity: [0.2, 1, 0.2], y: [1, -1, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5V9Z" fill="#c08457" />
            <path d="M16 11h1.5a2.5 2.5 0 0 1 0 5H16" stroke="#c08457" strokeWidth="1.6" />
          </svg>

          {/* Ambient +1, and extra bubbles on hover */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute -top-1 left-1/2 -translate-x-1/2 font-mono text-[10px] font-bold whitespace-nowrap text-[#f0c9a4]"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], y: [0, -18, -26] }}
            transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.4, ease: "easeOut" }}
          >
            +1 ☕
          </motion.span>
          <AnimatePresence>
            {bursts.map((id, i) => (
              <motion.span
                key={id}
                aria-hidden
                className="pointer-events-none absolute -top-1 left-1/2 font-mono text-[10px] font-bold whitespace-nowrap text-[#f0c9a4]"
                initial={{ opacity: 0, y: 0, x: "-50%" }}
                animate={{ opacity: [0, 1, 0], y: -30, x: `${-50 + (i % 2 ? 40 : -40)}%` }}
                transition={{ duration: 1.3, ease: "easeOut" }}
              >
                +1
              </motion.span>
            ))}
          </AnimatePresence>
        </span>
        <span>Buy me a coffee</span>
        <span className="rounded-full bg-[#f5efe6] px-2 py-0.5 font-mono text-[10px] text-[#2a1a10] transition-transform group-hover:scale-105">
          from ₹{MIN_PRICE}
        </span>
      </span>
    </Link>
  );
}
