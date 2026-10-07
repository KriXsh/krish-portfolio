"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
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
import { cn } from "@/lib/utils";

const skillCategories = [
  {
    title: "Web Tech",
    icon: Layout,
    accent: "200,71,92",
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
    accent: "232,169,161",
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
    accent: "217,167,127",
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
    accent: "196,128,112",
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
    accent: "184,62,94",
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

// Brand logos are long inline paths. Drawing each once as a symbol and pointing
// every use at it keeps the page HTML small.
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

const PETAL = "M0 -30C48 -52 72 -130 0 -184C-72 -130 -48 -52 0 -30Z";
const INNER = "M0 -14C22 -26 34 -62 0 -88C-34 -62 -22 -26 0 -14Z";
const SPIRAL = "M0 -6c6-3 12 2 9 8-3 7-14 7-17-1-4-9 5-18 15-16 12 2 18 15 12 26-7 12-25 14-35 4-11-11-8-30 6-38";
const LABEL_R = 26; // % of the box from centre to where each petal's button sits
const ease = [0.16, 1, 0.3, 1] as const;

/** The categories as the five petals of one rose. The outline draws itself in,
    the inner bloom turns with scroll, and the chosen petal fills with wine.
    Each petal's button sits on the petal so it is a real 44px tap target. */
function SkillRose({ active, onPick }: { active: number; onPick: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const turn = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const draw = reduced
    ? {}
    : { initial: { pathLength: 0 }, whileInView: { pathLength: 1 }, viewport: { once: true, margin: "-10% 0px" } };

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[22rem] md:max-w-[30rem]">
      <svg viewBox="-200 -200 400 400" aria-hidden className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <radialGradient id="skill-petal-on" cx="50%" cy="85%" r="90%">
            <stop offset="0%" stopColor="#c8475c" />
            <stop offset="55%" stopColor="#7a1a2c" />
            <stop offset="100%" stopColor="#2a0910" />
          </radialGradient>
          <radialGradient id="skill-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(163,41,61,0.28)" />
            <stop offset="100%" stopColor="rgba(163,41,61,0)" />
          </radialGradient>
        </defs>
        <circle r="200" fill="url(#skill-halo)" />
        <circle r="192" fill="none" stroke="var(--color-border-strong)" strokeWidth="0.6" strokeDasharray="2 6" />

        {skillCategories.map((c, i) => {
          const on = i === active;
          return (
            <g key={c.title} transform={`rotate(${i * 72})`}>
              <motion.path
                d={PETAL}
                animate={{ scale: on ? 1.06 : 1, opacity: on ? 1 : 0.9 }}
                transition={{ duration: 0.6, ease }}
                fill={on ? "url(#skill-petal-on)" : `rgba(${c.accent},0.06)`}
                stroke={on ? "#e8a9a1" : "var(--color-champagne)"}
                strokeOpacity={on ? 0.8 : 0.45}
                strokeWidth="1.2"
                style={{ transformOrigin: "0px 0px", transition: "fill 0.6s" }}
                {...draw}
              />
              <motion.path d="M0 -36C-4 -90 -2 -140 0 -176" stroke="var(--color-champagne)" strokeOpacity="0.2" fill="none" {...draw} />
            </g>
          );
        })}

        <motion.g style={reduced ? undefined : { rotate: turn }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <path key={i} d={INNER} transform={`rotate(${i * 72 + 36})`} fill="rgba(200,71,92,0.12)" stroke="var(--color-rose)" strokeOpacity="0.5" strokeWidth="1" />
          ))}
          <motion.path d={SPIRAL} transform="scale(1.3)" stroke="var(--color-rose)" strokeWidth="1.4" fill="none" strokeLinecap="round" {...draw} />
        </motion.g>
      </svg>

      {skillCategories.map(({ title, icon: Icon, accent }, i) => {
        const a = (i * 72 * Math.PI) / 180;
        const on = i === active;
        return (
          <button
            key={title}
            type="button"
            role="tab"
            aria-label={title}
            aria-selected={on}
            aria-controls="skill-panel"
            onClick={() => onPick(i)}
            onMouseEnter={() => onPick(i)}
            onFocus={() => onPick(i)}
            className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
            style={{ left: `${50 + LABEL_R * Math.sin(a)}%`, top: `${50 - LABEL_R * Math.cos(a)}%` }}
          >
            <span
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-[2px] transition-all duration-500",
                on ? "scale-110 border-[#e8a9a1]/70 bg-[#2a0910]/60 text-[#f6d6cf]" : "border-border bg-surface/70 text-muted-foreground group-hover:text-foreground",
              )}
              style={on ? { boxShadow: `0 0 24px rgba(${accent},0.45)` } : undefined}
            >
              <Icon className="h-[18px] w-[18px]" />
            </span>
            <span className={cn("hidden text-[10px] tracking-[0.18em] whitespace-nowrap uppercase transition-colors sm:block", on ? "text-champagne" : "text-subtle")}>
              {title}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function Skills() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const reduced = useReducedMotion();
  const cat = skillCategories[active];

  // Let the rose bloom petal by petal until someone picks one themselves.
  useEffect(() => {
    if (!auto || !inView || reduced) return;
    const t = setInterval(() => setActive((i) => (i + 1) % skillCategories.length), 3800);
    return () => clearInterval(t);
  }, [auto, inView, reduced]);

  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
  };

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
        description="25+ tools across the whole lifecycle: interfaces, intelligence, infrastructure and data. Pick a petal."
      />

      <div ref={ref} className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div role="tablist" aria-label="Skill categories">
          <SkillRose active={active} onPick={pick} />
        </div>

        <div id="skill-panel" role="tabpanel" aria-live="polite" className="relative min-h-[17rem] md:min-h-[19rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease }}
            >
              <p className="eyebrow text-champagne">
                <span className="text-rose">✦</span> {String(active + 1).padStart(2, "0")} / {String(skillCategories.length).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-none text-foreground">
                {cat.title.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-gradient italic">{cat.title.split(" ").slice(-1)}</span>
              </h3>
              <p className="mt-3 font-script text-3xl text-rose">{cat.items.length} in bloom</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {cat.items.map(({ name }, i) => (
                  <motion.li
                    key={name}
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, ease, delay: 0.05 + i * 0.04 }}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-ink/[0.02] px-3.5 py-2 text-sm text-muted-foreground transition-colors duration-300 hover:border-rose/50 hover:text-foreground"
                  >
                    <SkillGlyph name={name} className="h-4 w-4 text-glow" />
                    {name}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          {/* petal pager for small screens, where the rose labels are hidden */}
          <div className="mt-8 flex gap-2 sm:hidden" aria-hidden>
            {skillCategories.map((c, i) => (
              <span key={c.title} className={cn("h-1 flex-1 rounded-full transition-colors duration-500", i === active ? "bg-rose" : "bg-ink/10")} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
