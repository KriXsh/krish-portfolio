"use client";

import { ArrowUpRight, Gauge, Rocket, ShieldCheck, Workflow } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { JourneyClover } from "@/components/JourneyClover";

/** How I work - each principle opens the deep dive that shows it in practice
    (a case study or a blog post). The numbers live in Experience, not here. */
const principles = [
  {
    title: "Production over demos",
    description: "AI that ships and holds up under real users, not just a notebook that impresses once.",
    proof: "Voice AI: speech in, speech out",
    where: "Case study",
    href: "/case-studies/ironbook-voice-ai",
    icon: Rocket,
    glow: "rgba(42,79,143,0.25)",
  },
  {
    title: "Measure, then optimise",
    description: "Profile before refactoring. Numbers before opinions, so the fix lands where it matters.",
    proof: "A secure, fast API platform for fintech products",
    where: "Case study",
    href: "/case-studies/invincible-ocean-api-platform",
    icon: Gauge,
    glow: "rgba(29,55,102,0.25)",
  },
  {
    title: "Security is architecture",
    description: "Access control designed in from the first schema, not bolted on before launch.",
    proof: "RBAC done right: roles, permissions, JWTs and least privilege",
    where: "Blog",
    href: "/blog/rbac-done-right",
    icon: ShieldCheck,
    glow: "rgba(217,167,127,0.25)",
  },
  {
    title: "Automate the path to prod",
    description: "If a person does it twice, a pipeline does it next. Releases should be boring.",
    proof: "Zero-downtime deploys: from a single VM to Kubernetes",
    where: "Blog",
    href: "/blog/zero-downtime-deploys",
    icon: Workflow,
    glow: "rgba(185,205,236,0.22)",
  },
];

const values = ["Innovation", "Quality", "Scalability", "User-Centric"];

export default function WhoAmI() {
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
        {/* Career journey: a five-leaf clover, one leaf per company, 2023 -> now */}
        <Reveal className="lg:col-span-5">
          <JourneyClover />
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

      <Reveal className="mt-24">
        <p className="eyebrow text-subtle">
          How I work <span className="text-rose">✦</span>
        </p>
      </Reveal>
      <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {principles.map(({ title, description, proof, where, href, icon: Icon, glow }, i) => (
          <RevealItem key={title} className="h-full">
            <TiltCard glowColor={glow} className="p-7">
              <div className="flex h-full flex-col">
                <div className="mb-10 flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink/[0.05] ring-1 ring-ink/10">
                    <Icon className="h-5 w-5 text-glow" />
                  </span>
                  <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                </div>
                <h3 className="font-display text-xl font-medium text-foreground">{title}</h3>
                <p className="mt-3 mb-6 text-sm leading-relaxed text-muted-foreground">{description}</p>
                <a
                  href={href}
                  className="group/proof mt-auto block border-t border-border pt-4"
                >
                  <span className="block text-sm leading-snug text-champagne">{proof}</span>
                  <span className="mt-1.5 inline-flex items-center gap-1 font-mono text-[10px] tracking-widest text-subtle uppercase transition-colors group-hover/proof:text-foreground">
                    Read the {where.toLowerCase()}
                    <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover/proof:rotate-45" />
                  </span>
                </a>
              </div>
            </TiltCard>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
