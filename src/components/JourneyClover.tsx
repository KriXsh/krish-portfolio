"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { JOBS } from "@/content/experience";
import { Clover, CloverProgress, CLOVER_EASE, useCloverPlayer, type CloverLeaf } from "@/components/ui/clover";

/* Career journey as a five-leaf clover: one leaf per company, oldest first.
   The centre photo moves from 2023 to now as the chapters play. */

function photoFor(id: string, start: string) {
  if (id === "exp-ironbook") return "/krish-journey-2026.webp";
  if (id === "exp-aaizel") return "/krish-journey-aaizel.webp";
  return Number(start.slice(0, 4)) < 2025 ? "/krish-journey-2023.webp" : "/krish-journey-2025.webp";
}

const CHAPTERS = [...JOBS]
  .sort((a, b) => a.start.localeCompare(b.start))
  .map((j) => ({
    id: j.id,
    year: j.start.slice(0, 4),
    company: j.short,
    role: j.roles[0]?.title ?? "",
    photo: photoFor(j.id, j.start),
    current: !j.end,
  }));

const LEAVES: CloverLeaf[] = CHAPTERS.map((c) => ({
  key: c.id,
  title: c.year,
  sub: c.company,
  ariaLabel: `${c.year}: ${c.role} at ${c.company}`,
}));

export function JourneyClover() {
  const player = useCloverPlayer(CHAPTERS.length, 3400);
  const ch = CHAPTERS[player.active];

  return (
    <div className="mx-auto w-full max-w-[26rem]">
      <Clover player={player} leaves={LEAVES}>
        <AnimatePresence initial={false}>
          <motion.div
            key={ch.photo}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.25, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.9, ease: CLOVER_EASE }}
          >
            <Image
              src={ch.photo}
              alt={`Krishnendu Ghosal, ${ch.year}`}
              fill
              sizes="180px"
              className={`object-cover ${ch.photo.includes("2023") ? "saturate-[0.8] sepia-[0.15]" : ""}`}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/85 to-transparent" />
        <AnimatePresence mode="wait">
          <motion.span
            key={ch.year + ch.current}
            className="absolute inset-x-0 bottom-[11%] text-center font-mono text-[10px] tracking-[0.25em] text-white uppercase"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
          >
            {ch.current ? "Now" : ch.year}
          </motion.span>
        </AnimatePresence>
      </Clover>

      <div className="mt-10 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={player.active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: CLOVER_EASE }}
          >
            <p className="eyebrow text-subtle">
              Chapter 0{player.active + 1} <span className="text-champagne">/ 0{CHAPTERS.length}</span>
            </p>
            <p className="mt-2 font-display text-2xl text-foreground md:text-3xl">{ch.company}</p>
            {/* The details live in Experience; this just points there. */}
            <a
              href={`#${ch.id}`}
              className="group mt-2 inline-flex items-center gap-1.5 text-sm text-champagne transition-colors hover:text-foreground"
            >
              See this chapter
              <ArrowDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </motion.div>
        </AnimatePresence>
        <CloverProgress
          className="mt-6"
          player={player}
          labels={CHAPTERS.map((c) => `${c.company}, ${c.year}`)}
          start="2023"
          end="Now"
          ariaLabel="Career chapters"
        />
      </div>
    </div>
  );
}
