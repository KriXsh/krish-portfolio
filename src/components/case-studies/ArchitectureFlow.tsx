"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import type { FlowStage } from "@/content/case-studies";

const EASE = [0.16, 1, 0.3, 1] as const;

/** A travelling pulse along the connector between two stages. Horizontal on
    desktop, vertical on mobile. */
function Connector({ index }: { index: number }) {
  return (
    <div aria-hidden className="relative flex shrink-0 items-center justify-center md:w-10 lg:w-14">
      {/* vertical (mobile) */}
      <div className="relative h-8 w-px bg-border-strong md:hidden">
        <motion.span
          className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_10px_2px_rgb(42_79_143/0.5)]"
          animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: index * 0.35, ease: "easeInOut" }}
        />
      </div>
      {/* horizontal (desktop) */}
      <div className="relative hidden h-px w-full bg-border-strong md:block">
        <motion.span
          className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_10px_2px_rgb(42_79_143/0.5)]"
          animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: index * 0.35, ease: "easeInOut" }}
        />
        <span className="absolute top-1/2 -right-px h-0 w-0 -translate-y-1/2 border-y-[4px] border-l-[6px] border-y-transparent border-l-border-strong" />
      </div>
    </div>
  );
}

/** The architecture of a case study, drawn from its stages: each stage is a
    column of nodes, and pulses flow from one stage into the next. */
export function ArchitectureFlow({ stages }: { stages: FlowStage[] }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface p-5 md:p-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-lines opacity-70" />
      <ol className="relative flex flex-col items-stretch md:flex-row md:items-center" aria-label="Architecture flow">
        {stages.map((stage, i) => (
          <Fragment key={stage.label}>
            {i > 0 && <Connector index={i} />}
            <motion.li
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.12 }}
              className="glass min-w-0 flex-1 rounded-2xl p-4"
            >
              <p className="mb-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-subtle uppercase">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[10px] text-glow">{i + 1}</span>
                {stage.label}
              </p>
              <ul className="space-y-1.5">
                {stage.nodes.map((node) => (
                  <li
                    key={node}
                    className="rounded-lg border border-border bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
                  >
                    {node}
                  </li>
                ))}
              </ul>
            </motion.li>
          </Fragment>
        ))}
      </ol>
    </div>
  );
}
