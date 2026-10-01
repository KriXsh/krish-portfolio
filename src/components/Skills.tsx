"use client";

import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import { BrainCircuit, Cloud, Database, Layout, Terminal } from "lucide-react";
import {
  SiNextdotjs, SiReact, SiNodedotjs, SiExpress, SiSelenium, SiTailwindcss, SiBootstrap,
  SiAmazonwebservices, SiDocker, SiJenkins, SiGithubactions, SiGitlab, SiKubernetes, SiNginx,
  SiMongodb, SiRedis, SiPostgresql, SiElasticsearch,
  SiPython, SiJavascript, SiOpenjdk, SiUbuntu, SiApple,
  SiTypescript, SiOpenai, SiHuggingface, SiPytorch, SiLangchain, SiPm2,
} from "react-icons/si";
import { VscTerminalBash } from "react-icons/vsc";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const skillCategories = [
  {
    title: "Web Tech",
    icon: Layout,
    span: "lg:col-span-2",
    accent: "99,102,241",
    items: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React.js", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "TailwindCSS", icon: SiTailwindcss },
      { name: "Bootstrap", icon: SiBootstrap },
      { name: "Selenium", icon: SiSelenium },
    ],
  },
  {
    title: "AI & ML",
    icon: BrainCircuit,
    span: "",
    accent: "139,92,246",
    items: [
      { name: "LLM (Gemini/GPT-4)", icon: SiOpenai },
      { name: "Vector DBs", icon: Database },
      { name: "LangChain & Agents", icon: SiLangchain },
      { name: "Hugging Face", icon: SiHuggingface },
      { name: "RAG Architecture", icon: Cloud },
      { name: "PyTorch/TensorFlow", icon: SiPytorch },
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    span: "lg:row-span-2",
    accent: "6,182,212",
    items: [
      { name: "AWS", icon: SiAmazonwebservices },
      { name: "Kubernetes", icon: SiKubernetes },
      { name: "Docker", icon: SiDocker },
      { name: "Jenkins", icon: SiJenkins },
      { name: "GitHub Actions", icon: SiGithubactions },
      { name: "GitLab", icon: SiGitlab },
      { name: "Nginx", icon: SiNginx },
      { name: "ElasticCloud", icon: SiElasticsearch },
      { name: "pm2", icon: SiPm2 },
    ],
  },
  {
    title: "Databases",
    icon: Database,
    span: "",
    accent: "52,211,153",
    items: [
      { name: "MongoDB", icon: SiMongodb },
      { name: "Redis", icon: SiRedis },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Elasticsearch", icon: SiElasticsearch },
    ],
  },
  {
    title: "Languages & OS",
    icon: Terminal,
    span: "lg:col-span-2",
    accent: "236,72,153",
    items: [
      { name: "Python", icon: SiPython },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Java", icon: SiOpenjdk },
      { name: "Bash", icon: VscTerminalBash },
      { name: "Ubuntu", icon: SiUbuntu },
      { name: "macOS", icon: SiApple },
    ],
  },
];

const allSkills = skillCategories.flatMap((c) => c.items);

// Brand logos are long inline paths and each one shows up several times (its
// card plus both marquee rows, doubled to loop). Drawing each once as a symbol
// and pointing every copy at it keeps the page HTML small.
const iconId = (name: string) => `skill-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

function IconSprite() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute">
      <defs>
        {allSkills.map(({ name, icon: SkillIcon }) => (
          <symbol key={name} id={iconId(name)} viewBox="0 0 24 24">
            <SkillIcon size="24" />
          </symbol>
        ))}
      </defs>
    </svg>
  );
}

function SkillGlyph({ name, className }: { name: string; className: string }) {
  return (
    <svg aria-hidden fill="currentColor" className={className}>
      <use href={`#${iconId(name)}`} />
    </svg>
  );
}

/** Bento card with a spotlight that follows the cursor. */
function SpotlightCard({
  accent,
  className,
  children,
}: {
  accent: string;
  className?: string;
  children: React.ReactNode;
}) {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const background = useMotionTemplate`radial-gradient(380px circle at ${x}px ${y}px, rgba(${accent},0.16), transparent 60%)`;
  const border = useMotionTemplate`radial-gradient(260px circle at ${x}px ${y}px, rgba(${accent},0.7), transparent 60%)`;

  return (
    <div
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      className={cn("group relative h-full overflow-hidden rounded-3xl bg-surface p-px", className)}
    >
      <div className="absolute inset-0 rounded-3xl bg-border" />
      <motion.div
        style={{ background: border }}
        className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-surface">
        <motion.div
          style={{ background }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <div className="relative h-full p-7">{children}</div>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <div className="py-28 md:py-36">
      <IconSprite />
      <SectionHeading
        index="02"
        eyebrow="Technical Arsenal"
        title={
          <>
            The stack I <span className="text-gradient">ship with.</span>
          </>
        }
        description="25+ tools across the whole lifecycle: interfaces, intelligence, infrastructure and data."
      />

      <RevealGroup className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {skillCategories.map(({ title, icon: Icon, items, span, accent }) => (
          <RevealItem key={title} className={span}>
            <SpotlightCard accent={accent}>
              <div className="mb-6 flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl ring-1 ring-ink/10"
                  style={{ background: `rgba(${accent},0.12)`, color: `color-mix(in oklab, rgb(${accent}) 55%, var(--color-foreground))` }}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
                <span className="ml-auto font-mono text-xs text-subtle">{String(items.length).padStart(2, "0")}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map(({ name }) => (
                  <span
                    key={name}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-ink/[0.02] px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors duration-300 hover:border-ink/20 hover:text-foreground"
                  >
                    <SkillGlyph name={name} className="h-3.5 w-3.5" />
                    {name}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Icon marquee, two rows in opposite directions */}
      <div className="mt-16 space-y-4 mask-fade-x">
        {[false, true].map((reverse) => (
          <div key={String(reverse)} className="flex overflow-hidden">
            <div
              className="flex w-max animate-marquee gap-4 [--marquee-duration:60s]"
              style={{ animationDirection: reverse ? "reverse" : "normal" }}
            >
              {[...allSkills, ...allSkills].map(({ name }, i) => (
                <span
                  key={`${name}-${i}`}
                  className="glass flex items-center gap-3 rounded-2xl px-5 py-3 [-webkit-backdrop-filter:none]! [backdrop-filter:none]! text-sm font-medium whitespace-nowrap text-muted-foreground"
                >
                  <SkillGlyph name={name} className="h-4 w-4 text-glow" />
                  {name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
