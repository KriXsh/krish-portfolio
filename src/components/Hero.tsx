"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileText, Github, Linkedin, Send } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";
import { SplitText } from "@/components/ui/reveal";
import { CoffeeButton } from "@/components/coffee/CoffeeButton";
import { useClientValue } from "@/lib/use-client-value";
import { SiLeetcode } from "react-icons/si";
import { LEETCODE_URL, RESUME_URL } from "@/lib/site";

// WebGL never renders on the server; the gradient behind it stands in until it loads.
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

const EASE = [0.16, 1, 0.3, 1] as const;

/** Each domain links to the experience entry that best shows it. */
const domains = [
  { label: "B2G / Gov-Tech", href: "#exp-aaizel" },
  { label: "FinOps / Fintech", href: "#exp-invincible-ocean" },
  { label: "B2B Enterprise", href: "#exp-ironbook" },
  { label: "B2C Digital", href: "#exp-ironbook" },
  { label: "AI-ML & MLOps", href: "#exp-ironbook" },
  { label: "Cloud & DevOps", href: "#exp-epam" },
  { label: "System Design", href: "#exp-aaizel" },
  { label: "Event-Driven Architecture", href: "#exp-ironbook" },
];

function readTenure() {
  const start = new Date("2023-01-01");
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  if (months < 0) {
    years--;
    months += 12;
  }
  return `${years}y ${months}m`;
}

/** Data saver or a slow connection: skip the WebGL scene, the gradients stand in. */
const readSkip3d = () => {
  const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  return !!c && (c.saveData === true || /(^|-)(2g|3g)$/.test(c.effectiveType ?? ""));
};

/** True once the page has loaded and the main thread is idle, so the large
    three.js chunk never competes with the first paint or hydration. */
function useAfterLoad() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let idle = 0;
    let timer = 0;
    const go = () => {
      if ("requestIdleCallback" in window) idle = window.requestIdleCallback(() => setReady(true), { timeout: 2500 });
      else timer = setTimeout(() => setReady(true), 300) as unknown as number;
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => {
      window.removeEventListener("load", go);
      if (idle) window.cancelIdleCallback(idle);
      clearTimeout(timer);
    };
  }, []);
  return ready;
}

const readLite = () =>
  window.matchMedia("(max-width: 768px)").matches || (navigator.hardwareConcurrency ?? 8) <= 4;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -10% 0px" });
  const tenure = useClientValue(readTenure, "3y+");
  const lite = useClientValue(readLite, false);
  const skip3d = useClientValue(readSkip3d, true);
  const loaded = useAfterLoad();

  // Scroll-linked exit: text drifts up and dissolves, the 3D scene sinks and scales.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const textY = useTransform(progress, [0, 1], ["0%", "-35%"]);
  const textOpacity = useTransform(progress, [0, 0.7], [1, 0]);
  const sceneY = useTransform(progress, [0, 1], ["0%", "25%"]);
  const sceneScale = useTransform(progress, [0, 1], [1, 0.8]);
  const sceneOpacity = useTransform(progress, [0, 0.9], [1, 0.2]);

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Ambient backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-lines mask-fade-b opacity-60" />
        <div className="absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />
        <div className="absolute top-1/3 -right-40 h-[30rem] w-[30rem] rounded-full bg-cyan/10 blur-[120px]" />
        <div className="absolute bottom-0 -left-40 h-[26rem] w-[26rem] rounded-full bg-violet/15 blur-[120px]" />
        <div className="absolute inset-0 grain opacity-[0.035] mix-blend-overlay" />
      </div>

      {/* 3D scene */}
      <motion.div
        aria-hidden
        style={{ y: sceneY, scale: sceneScale, opacity: sceneOpacity }}
        className="pointer-events-none absolute inset-0 md:left-[35%]"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: EASE, delay: 0.3 }}
          className="h-full w-full"
        >
          <div className="h-full w-full opacity-50 md:opacity-100">
            {loaded && !skip3d && <HeroScene active={inView} lite={lite} theme="dark" />}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pt-28 pb-12 md:px-12 md:pt-32 md:pb-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="glass mb-6 md:mb-8 inline-flex w-fit items-center gap-3 rounded-full py-1.5 pr-4 pl-1.5 text-xs font-medium text-muted-foreground"
        >
          <span className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-400/20">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Available
          </span>
          Full-Stack · AI/ML · Cloud Engineer
        </motion.div>

        <h1 className="font-display text-display-xl font-extrabold text-foreground">
          <SplitText text="Krishnendu" delay={0.2} />
          <br />
          <SplitText text="Ghosal" delay={0.55} charClassName="text-gradient animate-shimmer" />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1 }}
          className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:mt-8 md:text-lg"
        >
          I engineer <span className="text-foreground">high-performance systems</span> across Full-Stack, AI-ML &amp;
          MLOps, Cloud Infrastructure and Scalable System Design, from event-driven pipelines to the interfaces people
          touch.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1.15 }}
          className="mt-8 flex flex-wrap items-center gap-3 md:mt-10 md:gap-4"
        >
          <Magnetic>
            <a
              href="#experience"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-foreground px-7 py-4 text-sm font-semibold text-background shadow-[0_0_40px_-8px_rgba(99,102,241,0.8)]"
            >
              <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-primary via-violet to-cyan transition-transform duration-500 ease-out-expo group-hover:translate-y-0" />
              <span className="relative transition-colors duration-300 group-hover:text-white">View Work</span>
              <ArrowUpRight className="relative h-4 w-4 transition-all duration-300 group-hover:rotate-45 group-hover:text-white" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="glass group inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-semibold text-foreground transition-colors hover:border-ink/20"
            >
              Contact Me
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="glass group inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-semibold text-foreground transition-colors hover:border-ink/20"
            >
              Resume
              <FileText className="h-4 w-4 transition-transform group-hover:-rotate-6" />
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <CoffeeButton />
          </Magnetic>
        </motion.div>

        {/* Stats + socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-border pt-6 md:mt-16 md:gap-8 md:pt-8"
        >
          <div className="grid w-full grid-cols-4 gap-3 sm:flex sm:w-auto sm:flex-wrap sm:gap-x-12 sm:gap-y-6">
            {[
              { k: tenure, v: "Active engineering", href: "#experience", label: "See my experience" },
              { k: "4+", v: "Industry domains", href: "#experience", label: "See my experience" },
              { k: "25+", v: "Technologies", href: "#skills", label: "See my skills" },
              { k: "5", v: "Companies", href: "#experience", label: "See the companies I worked at" },
            ].map((s) => (
              <div key={s.v} className="group relative cursor-pointer">
                <a href={s.href} aria-label={s.label} className="absolute inset-0 z-10" />
                <p className="font-display text-xl font-bold text-foreground transition-colors group-hover:text-glow sm:text-3xl md:text-4xl">{s.k}</p>
                <p className="mt-1 font-mono text-[9px] leading-tight tracking-wider text-subtle uppercase sm:text-[11px] sm:tracking-widest">{s.v}<span className="text-glow opacity-60 transition-opacity group-hover:opacity-100"> ↓</span></p>
              </div>
            ))}
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            {[
              { icon: Github, href: "https://github.com/KriXsh", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/krish-me", label: "LinkedIn" },
              { icon: SiLeetcode, href: LEETCODE_URL, label: "LeetCode" },
            ].map(({ icon: Icon, href, label }) => (
              <Magnetic key={label} strength={0.5}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="glass flex h-12 w-12 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon className="h-5 w-5" />
                </a>
              </Magnetic>
            ))}
            <a
              href="#whoami"
              className="ml-4 hidden items-center gap-2 font-mono text-xs tracking-widest text-subtle uppercase transition-colors hover:text-foreground md:flex"
            >
              Scroll
              <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
                <ArrowDown className="h-4 w-4" />
              </motion.span>
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Domain marquee */}
      <div className="relative z-10 border-y border-border bg-surface/60 py-5 backdrop-blur-sm mask-fade-x">
        <div className="flex w-max animate-marquee gap-12 [--marquee-duration:45s] hover:[animation-play-state:paused]">
          {[...domains, ...domains].map((d, i) => (
            <span key={i} aria-hidden={i >= domains.length || undefined} className="flex items-center gap-12 font-display text-lg font-semibold whitespace-nowrap text-muted-foreground">
              <a
                href={d.href}
                tabIndex={i >= domains.length ? -1 : undefined}
                className="transition-colors hover:text-foreground focus-visible:text-foreground"
              >
                {d.label}
              </a>
              <span className="text-glow">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
