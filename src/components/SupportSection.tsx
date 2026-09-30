"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Coffee, Github } from "lucide-react";
import { CoffeeCup } from "@/components/coffee/CoffeeCup";
import { Reveal } from "@/components/ui/reveal";
import { MENU, SPONSORS_URL } from "@/lib/coffee";
import { cn } from "@/lib/utils";

const repos = [
  { name: "catoff-reclaim-integration", link: "https://github.com/KriXsh/catoff-reclaim-integration-proposal" },
  { name: "bridge-backend", link: "https://github.com/KriXsh/bridge-backend" },
];

/** Homepage teaser for the coffee bar: hover a drink and the cup pours it. */
export default function SupportSection() {
  const [hovered, setHovered] = useState(1);
  const level = MENU[hovered].fill;

  return (
    <div className="py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-surface">
          <div aria-hidden className="absolute -top-32 -left-20 h-[26rem] w-[26rem] rounded-full bg-[#c08457]/15 blur-[120px]" />
          <div aria-hidden className="absolute inset-0 grid-lines opacity-30" />

          <div className="relative grid items-center gap-10 p-8 md:p-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="mb-4 font-mono text-xs tracking-[0.25em] text-[#e0a47a] uppercase">Support</p>
              <h2 className="font-display text-display-md font-bold text-foreground">
                Fuel the{" "}
                <span className="bg-gradient-to-r from-[#f0c9a4] to-[#c08457] bg-clip-text text-transparent">open source</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Projects like <span className="font-mono text-foreground">bridge-backend</span> run on caffeine and
                community. Buy a coffee over UPI, or sponsor on GitHub.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {repos.map((r) => (
                  <a
                    key={r.name}
                    href={r.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {r.name}
                  </a>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/support"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#f5efe6] px-6 py-3 text-sm font-semibold text-[#2a1a10] transition-transform hover:scale-[1.03]"
                >
                  <Coffee className="h-4 w-4 transition-transform group-hover:-rotate-12" /> Buy me a coffee
                </Link>
                <a
                  href={SPONSORS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Github className="h-4 w-4" /> Sponsor on GitHub <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <div className="mx-auto w-44 md:w-52 lg:col-span-3">
              <CoffeeCup level={level} className="w-full drop-shadow-[0_20px_40px_rgba(192,132,87,0.25)]" />
            </div>

            <ul className="space-y-2 lg:col-span-4">
              {MENU.map((m, i) => (
                <li key={m.id}>
                  <Link
                    href={`/support?item=${m.id}`}
                    onMouseEnter={() => setHovered(i)}
                    onFocus={() => setHovered(i)}
                    className={cn(
                      "group relative flex items-center gap-4 rounded-2xl px-4 py-3 transition-colors",
                      hovered === i ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {hovered === i && (
                      <motion.span
                        layoutId="coffee-teaser"
                        className="absolute inset-0 rounded-2xl bg-ink/[0.05] ring-1 ring-[#c08457]/40"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative flex-1">
                      <span className="block font-display font-semibold">{m.name}</span>
                      <span className="block text-xs text-subtle">{m.blurb}</span>
                    </span>
                    <span className="relative font-mono text-sm">₹{m.price}</span>
                    <ArrowUpRight className="relative h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
