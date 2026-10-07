"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Rocket, Sparkles, Terminal } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";

const highlights = [
  {
    title: "Full-Stack Architect",
    description: "End-to-end products from React/Next.js frontends to scalable Node.js and Python backends.",
    icon: Code2,
    glow: "rgba(163,41,61,0.25)",
  },
  {
    title: "AI/ML Engineer",
    description: "Intelligent systems with LLMs, RAG architectures, agents and ML pipelines on SageMaker & Bedrock.",
    icon: Sparkles,
    glow: "rgba(122,31,47,0.25)",
  },
  {
    title: "Cloud & DevOps",
    description: "Shipping on AWS, orchestrating with Kubernetes and automating CI/CD from commit to production.",
    icon: Rocket,
    glow: "rgba(217,167,127,0.25)",
  },
  {
    title: "System Designer",
    description: "High-throughput, fault-tolerant, event-driven systems built for enterprise scale.",
    icon: Terminal,
    glow: "rgba(232,180,171,0.22)",
  },
];

const values = ["Innovation", "Quality", "Scalability", "User-Centric"];

export default function WhoAmI() {
  const photoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const frameRotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  return (
    <div className="relative py-28 md:py-36">
      <SectionHeading
        index="01"
        eyebrow="Introduction"
        title={
          <>
            Engineer by craft,
            <br />
            <span className="text-gradient">builder by instinct.</span>
          </>
        }
      />

      <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        {/* Portrait with parallax */}
        <Reveal className="lg:col-span-5">
          <div ref={photoRef} className="relative mx-auto aspect-[4/5] w-full max-w-sm">
            <motion.div
              style={{ rotate: frameRotate }}
              className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-primary/45 via-violet/25 to-champagne/20 blur-2xl"
            />
            <div className="glass relative h-full overflow-hidden rounded-[2rem] p-2">
              <div className="relative h-full overflow-hidden rounded-[1.6rem]">
                {/* Parallax on a wrapper so next/image can serve a resized, modern-format
                    version instead of the 3024×4032 original (~1.1 MB). */}
                <motion.div style={{ y: imgY }} className="absolute inset-0 h-[124%] w-full -translate-y-[12%]">
                  <Image
                    src="/krish-portrait.webp"
                    alt="Krishnendu Ghosal seated against a wine-red wall, holding a red rose"
                    fill
                    sizes="(min-width: 1024px) 384px, 90vw"
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl glass px-4 py-3">
                  <div>
                    <p className="font-display text-sm font-semibold text-foreground">Krishnendu Ghosal</p>
                    <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">Open to remote</p>
                  </div>
                  <span className="flex h-2 w-2 rounded-full bg-glow shadow-[0_0_12px_2px_rgba(232,169,161,0.6)]" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Story */}
        <div className="space-y-8 lg:col-span-7">
          <Reveal>
            <p className="font-display text-2xl leading-snug text-foreground md:text-[2rem]">
              It started with wondering how systems work. Now I build the ones behind{" "}
              <span className="text-gradient">gov-tech, fintech and AI</span> products.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              From government-tech infrastructure to fintech platforms, I&apos;ve delivered across diverse domains, driven by
              the thrill of solving complex problems, the satisfaction of optimizing performance, and the impact of
              technology that genuinely improves people&apos;s lives.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <blockquote className="border-l border-rose/70 pl-6 font-display text-xl leading-snug text-foreground/90 italic md:text-2xl">
              &ldquo;Code is poetry, systems are symphonies, and great software is the intersection of engineering
              excellence and user delight.&rdquo;
            </blockquote>
          </Reveal>
          <Reveal delay={0.16} className="flex flex-wrap gap-2">
            {values.map((v) => (
              <span key={v} className="glass rounded-full px-4 py-2 text-sm font-medium text-muted-foreground">
                {v}
              </span>
            ))}
          </Reveal>
        </div>
      </div>

      <RevealGroup className="mt-24 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map(({ title, description, icon: Icon, glow }, i) => (
          <RevealItem key={title}>
            <TiltCard glowColor={glow} className="p-7">
              <div className="flex h-full flex-col">
                <div className="mb-10 flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink/[0.05] ring-1 ring-ink/10">
                    <Icon className="h-5 w-5 text-glow" />
                  </span>
                  <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            </TiltCard>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
