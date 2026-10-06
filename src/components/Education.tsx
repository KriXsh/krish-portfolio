"use client";

import { GraduationCap, School } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";

const educationData = [
  {
    institution: "Lovely Professional University",
    degree: "B.Tech in Computer Science & Engineering",
    date: "2019 - 2023",
    grade: "7.0",
    unit: "CGPA",
    label: "Cumulative Grade",
    icon: GraduationCap,
  },
  {
    institution: "Kenduadihi Boys' High School",
    degree: "Higher Secondary (Science)",
    date: "2017 - 2019",
    grade: "78",
    unit: "%",
    label: "Aggregate Percentage",
    icon: School,
  },
];

export default function Education() {
  return (
    <div className="py-28 md:py-36">
      <SectionHeading index="05" eyebrow="Education" title={<>Foundations.</>} />
      <RevealGroup className="grid gap-5 md:grid-cols-2">
        {educationData.map(({ institution, degree, date, grade, unit, label, icon: Icon }) => (
          <RevealItem key={institution}>
            <TiltCard max={6} className="p-8 md:p-10">
              <div className="flex h-full flex-col">
                <div className="mb-14 flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink/[0.05] ring-1 ring-ink/10">
                    <Icon className="h-5 w-5 text-glow" />
                  </span>
                  <span className="font-mono text-xs tracking-widest text-subtle uppercase">{date}</span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-foreground">{institution}</h3>
                <p className="mt-2 text-muted-foreground">{degree}</p>
                <div className="mt-10 flex items-end justify-between border-t border-border pt-6">
                  <span className="font-mono text-[11px] tracking-widest text-subtle uppercase">{label}</span>
                  <span className="font-display text-5xl font-bold text-gradient">
                    {grade}
                    <span className="ml-1 text-xl">{unit}</span>
                  </span>
                </div>
              </div>
            </TiltCard>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
