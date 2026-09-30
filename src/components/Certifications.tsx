"use client";

import type { ComponentType } from "react";
import { ArrowUpRight, BadgeCheck, Code2, Cpu, ShieldCheck, Trophy } from "lucide-react";
import { SiClaude } from "react-icons/si";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

type Achievement = {
  title: string;
  org: string;
  icon: ComponentType<{ className?: string }>;
  link: string;
  type: string;
  /** A second place the credential can be checked, e.g. a Credly badge. */
  verify?: { label: string; link: string };
  featured?: boolean;
};

const achievements: Achievement[] = [
  {
    title: "Claude Certified Associate - Foundations",
    org: "Anthropic",
    icon: SiClaude,
    link: "https://drive.google.com/file/d/1-dOU4aXuG12L0TeGrvpKNHI_dLPIBVlO/view?usp=sharing",
    type: "Certification",
    verify: { label: "Verify on Credly", link: "https://www.credly.com/badges/cd067e9d-a3b6-4224-a063-086cdfdcc67b/public_url" },
    featured: true,
  },
  {
    title: "Jumpstart - Competitive Coding",
    org: "PublicSapients",
    icon: Trophy,
    link: "https://drive.google.com/file/d/1Z0v9-NOUBZaz982hYjLJ35cZU8XnXMJd/view",
    type: "Award",
  },
  {
    title: "Java Foundations",
    org: "HackerRank",
    icon: Code2,
    link: "https://www.hackerrank.com/certificates/a9ef7324ba06",
    type: "Certification",
  },
  {
    title: "Artificial Intelligence Fundamentals",
    org: "Invincible Ocean",
    icon: Cpu,
    link: "https://drive.google.com/file/d/1ESxV2paQckfDhXPmNI0_eVNQRX27XQ_E/view",
    type: "Certification",
  },
  {
    title: "OOP Using Python",
    org: "E-Box",
    icon: Code2,
    link: "https://drive.google.com/file/d/14qmR5CtTvig-TS3PkIbMimDUwG7vw-xp/view",
    type: "Certification",
  },
  {
    title: "Website Hacking / Penetration Testing",
    org: "Udemy",
    icon: ShieldCheck,
    link: "https://drive.google.com/file/d/1q7Yk9bujRJzulgYD7LiLQiV74T5hzcOH/view",
    type: "Professional Training",
  },
];

export default function Certifications() {
  return (
    <div className="pb-28 md:pb-36">
      <SectionHeading index="07" eyebrow="Recognition" title={<>Certifications &amp; <span className="text-gradient">achievements.</span></>} />
      <RevealGroup className="divide-y divide-border border-y border-border" stagger={0.06}>
        {achievements.map(({ title, org, icon: Icon, link, type, verify, featured }, i) => (
          <RevealItem key={title}>
            <div className="group relative flex items-center gap-6 overflow-hidden py-7 md:gap-10 md:py-9">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} - ${org}`}
                className="absolute inset-0 z-[1]"
              />
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-r from-primary/10 via-violet/5 to-transparent transition-transform duration-500 ease-out-expo group-hover:scale-y-100" />
              <span className="relative font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
              <span
                className={
                  featured
                    ? "relative hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#d97757]/30 to-[#d97757]/5 ring-1 ring-[#d97757]/40 sm:flex"
                    : "relative hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink/[0.04] ring-1 ring-ink/10 sm:flex"
                }
              >
                <Icon className={featured ? "h-5 w-5 text-[#f0a584]" : "h-5 w-5 text-glow"} />
              </span>
              <div className="relative min-w-0 flex-1">
                <h3 className="font-display text-xl font-semibold text-foreground transition-transform duration-500 ease-out-expo group-hover:translate-x-2 md:text-3xl">
                  {title}
                </h3>
                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <p className="text-sm text-muted-foreground">{org}</p>
                  {verify && (
                    <a
                      href={verify.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-[2] inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300 transition-colors hover:bg-emerald-400/20"
                    >
                      <BadgeCheck className="h-3.5 w-3.5" />
                      {verify.label}
                    </a>
                  )}
                </div>
              </div>
              <span className="relative hidden rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted-foreground md:block">
                {type}
              </span>
              <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-500 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-foreground group-hover:text-background">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
