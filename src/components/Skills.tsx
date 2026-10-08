"use client";

import { AnimatePresence, motion } from "framer-motion";
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
import { Clover, CloverProgress, useCloverPlayer, type CloverLeaf } from "@/components/ui/clover";

const skillCategories = [
  {
    title: "Web Tech",
    icon: Layout,
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

const ease = [0.16, 1, 0.3, 1] as const;

const LEAVES: CloverLeaf[] = skillCategories.map(({ title, icon: Icon, items }) => ({
  key: title,
  title: <Icon className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.4} />,
  sub: title.length > 8 ? title.replace(" & ", " &\n") : title,
  ariaLabel: `${title}: ${items.length} tools`,
}));

export default function Skills() {
  const player = useCloverPlayer(skillCategories.length, 3800);
  const { active } = player;
  const cat = skillCategories[active];
  const CatIcon = cat.icon;

  return (
    <div className="py-28 md:py-36">
      <IconSprite />
      <SectionHeading
        index="05"
        eyebrow="Technical Arsenal"
        title={
          <>
            The stack I <span className="text-gradient">ship with.</span>
          </>
        }
        description="25+ tools across the whole lifecycle: interfaces, intelligence, infrastructure and data. Pick a leaf."
      />

      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="mx-auto w-full max-w-[22rem] md:max-w-[28rem]">
          <Clover player={player} leaves={LEAVES}>
            <AnimatePresence initial={false}>
              <motion.div
                key={cat.title}
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_50%_35%,rgba(42,79,143,0.45),transparent_70%)]"
                initial={{ opacity: 0, scale: 1.3, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.7, rotate: 20 }}
                transition={{ duration: 0.7, ease }}
              >
                <CatIcon className="h-9 w-9 text-champagne md:h-11 md:w-11" strokeWidth={1.3} />
                <span className="font-mono text-[9px] tracking-[0.22em] text-foreground/80 uppercase md:text-[10px]">
                  {cat.items.length} tools
                </span>
              </motion.div>
            </AnimatePresence>
          </Clover>
          <CloverProgress className="mt-8" player={player} labels={skillCategories.map((c) => c.title)} ariaLabel="Skill categories" />
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
              <p className="mt-3 font-script text-3xl text-rose">{cat.items.length} tools in rotation</p>
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

        </div>
      </div>
    </div>
  );
}
