"use client";

import Link from "next/link";
import { ArrowUpRight, Briefcase, CheckCircle2, CloudCog, Cpu, Layers, Rocket } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { Magnetic } from "@/components/ui/magnetic";

const services = [
  {
    title: "Full-Stack MVPs",
    desc: "Rapidly turning business ideas into scalable, production-ready 0-to-1 products.",
    icon: Rocket,
    features: ["Next.js/React", "Node.js/Python", "DB Architecture"],
  },
  {
    title: "AI Integration",
    desc: "Embedding LLMs, RAG, and autonomous agents into your existing business workflows.",
    icon: Cpu,
    features: ["AWS Bedrock", "LangChain", "Vector DBs"],
  },
  {
    title: "Cloud & DevOps",
    desc: "Optimizing infrastructure for performance, security, and cost efficiency (FinOps).",
    icon: CloudCog,
    features: ["AWS/K8s", "CI/CD Setup", "System Scaling"],
  },
  {
    title: "System Design",
    desc: "Architecting secure, high-throughput backend systems for B2B and B2G domains.",
    icon: Layers,
    features: ["API Design", "Microservices", "Security Audit"],
  },
];

export default function Freelance() {
  return (
    <div>
      <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {services.map(({ title, desc, icon: Icon, features }, i) => (
          <RevealItem key={title}>
            <TiltCard className="p-7">
              <div className="flex h-full flex-col">
                <div className="mb-12 flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/25 to-cyan/10 ring-1 ring-ink/10">
                    <Icon className="h-5 w-5 text-foreground" />
                  </span>
                  <span className="font-display text-5xl font-bold text-ink/[0.06]">0{i + 1}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">{title}</h3>
                <p className="mt-3 mb-8 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                <ul className="mt-auto space-y-2.5 border-t border-border pt-5">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-xs font-medium text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-cyan" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface p-8 md:p-12">
          <div aria-hidden className="absolute -top-32 -right-20 h-80 w-80 rounded-full bg-primary/25 blur-[100px]" />
          <div aria-hidden className="absolute -bottom-40 left-1/3 h-72 w-72 rounded-full bg-cyan/10 blur-[100px]" />
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-emerald-700 dark:text-emerald-300 uppercase">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Available for projects
              </div>
              <h3 className="font-display text-display-md font-bold text-foreground">Project-based or part-time payroll.</h3>
              <p className="text-muted-foreground">
                Long-term engineering support or a quick MVP launch. Available for{" "}
                <span className="text-foreground">20 hours/week</span> engagements with competitive project rates.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Magnetic>
                <Link
                  href="/#contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-4 text-sm font-semibold text-background"
                >
                  Hire for a project
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                </Link>
              </Magnetic>
              <span className="glass inline-flex items-center gap-2 rounded-full px-5 py-4 text-sm font-medium text-foreground">
                <Briefcase className="h-4 w-4 text-glow" />
                Payroll ready
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
