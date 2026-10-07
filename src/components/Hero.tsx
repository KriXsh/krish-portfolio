"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileText, Github, Globe2, Linkedin, Send } from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import { Magnetic } from "@/components/ui/magnetic";
import { SplitText } from "@/components/ui/reveal";
import { Petals } from "@/components/ui/petals";
import { CoffeeButton } from "@/components/coffee/CoffeeButton";
import { useClientValue } from "@/lib/use-client-value";
import { LEETCODE_URL, RESUME_URL } from "@/lib/site";

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

const socials = [
  { icon: Github, href: "https://github.com/KriXsh", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/krish-me", label: "LinkedIn" },
  { icon: SiLeetcode, href: LEETCODE_URL, label: "LeetCode" },
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

/** Fine pointer + wide screen: the only case where mouse parallax is worth running. */
const readParallax = () => window.matchMedia("(pointer: fine) and (min-width: 1024px)").matches;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
});

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const tenure = useClientValue(readTenure, "3y+");
  const parallax = useClientValue(readParallax, false);

  // Scroll-linked exit: the name splits apart, the portrait rises a touch slower
  // than the page and the side copy dissolves. Everything is transform/opacity.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 });
  const leftX = useTransform(progress, [0, 1], ["0%", "-22%"]);
  const rightX = useTransform(progress, [0, 1], ["0%", "22%"]);
  const nameOpacity = useTransform(progress, [0, 0.75], [1, 0]);
  const photoY = useTransform(progress, [0, 1], ["0%", "-10%"]);
  const photoScale = useTransform(progress, [0, 1], [1, 1.08]);
  const copyY = useTransform(progress, [0, 1], ["0%", "-30%"]);
  const copyOpacity = useTransform(progress, [0, 0.6], [1, 0]);
  const shaftOpacity = useTransform(progress, [0, 0.8], [1, 0]);

  // Pointer parallax for the portrait and the light (desktop only).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const py = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });
  const portraitX = useTransform(px, (v) => v * 14);
  const portraitTilt = useTransform(px, (v) => v * 1.2);
  const nameShiftX = useTransform(px, (v) => v * -10);
  const nameShiftY = useTransform(py, (v) => v * -6);
  const lightX = useTransform(px, (v) => v * 40);

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!parallax) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  return (
    <section
      ref={ref}
      id="top"
      onPointerMove={onPointerMove}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* --- Atmosphere: wine bloom, a slanted shaft of light (the one in the photo), grain --- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_38%,#3a0f19_0%,#1a080d_45%,transparent_75%)]" />
        <motion.div
          initial={{ opacity: 0, x: 120 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2.2, ease: EASE, delay: 0.4 }}
          style={{ x: lightX }}
          className="absolute inset-0"
        >
          <motion.div
            style={{ opacity: shaftOpacity }}
            className="absolute -top-[10%] left-[38%] h-[130%] w-[34%] origin-top skew-x-[-24deg] bg-gradient-to-b from-[#e8a9a1]/[0.13] via-[#e8a9a1]/[0.05] to-transparent"
          />
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute inset-0 grain opacity-[0.05] mix-blend-overlay" />
      </div>

      <Petals
        name="hero"
        petals={[
          { className: "-right-8 top-[22%] h-28 w-24 lg:h-44 lg:w-36", rotate: -28, duration: 16 },
          { className: "-left-6 top-[60%] h-20 w-16 lg:h-32 lg:w-28", rotate: 140, duration: 13, blur: true },
          { className: "left-[22%] top-[14%] hidden h-10 w-9 lg:block", rotate: -70, duration: 12, blur: true },
        ]}
      />

      {/* --- Meta row --- */}
      <motion.div
        {...fadeUp(0.05)}
        className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-6 pt-24 eyebrow text-muted-foreground md:px-12 md:pt-28"
      >
        <span>Full-Stack · AI/ML · Cloud</span>
        <span className="hidden sm:inline">Portfolio — ©{new Date().getFullYear()}</span>
      </motion.div>

      {/* --- Stage: giant name behind, portrait in front --- */}
      <div className="relative mx-auto w-full max-w-[1500px] flex-1 px-3 md:px-8 lg:min-h-[31rem]">
        <motion.h1
          style={{ opacity: nameOpacity, x: nameShiftX, y: nameShiftY }}
          className="relative mt-4 text-center font-display leading-[0.8] font-normal tracking-[-0.03em] text-champagne uppercase select-none md:mt-6"
          aria-label="Krishnendu Ghosal"
        >
          <motion.span style={{ x: leftX }} className="block text-[25vw] lg:inline-block lg:text-[clamp(4rem,12.4vw,14.5rem)]">
            <SplitText text="Krish" delay={0.15} stagger={0.05} />
          </motion.span>
          <motion.span style={{ x: rightX }} className="block text-[25vw] lg:inline-block lg:text-[clamp(4rem,12.4vw,14.5rem)]">
            <SplitText text="nendu" delay={0.4} stagger={0.05} />
          </motion.span>
        </motion.h1>

        {/* Portrait - cut out so the name sits behind him, like a magazine cover.
            Mobile: sized by width and tucked under the first line of the name.
            Desktop: sized by the stage height and anchored to its floor, so it
            never collides with the action bar on short screens. */}
        <motion.div
          style={{ y: photoY, scale: photoScale }}
          className="pointer-events-none absolute inset-x-0 top-[calc(25vw*0.95)] z-10 mx-auto aspect-[507/580] w-[min(82vw,26rem)] lg:top-auto lg:bottom-0 lg:h-[94%] lg:w-auto"
        >
          <motion.div style={{ x: portraitX, rotate: portraitTilt }} className="relative h-full w-full">
            {/* contact shadow on the "floor" */}
            <div aria-hidden className="absolute inset-x-[14%] -bottom-2 h-8 rounded-[50%] bg-black/70 blur-xl" />
            {/* CSS (not framer) reveal: it starts on first paint instead of waiting
                for hydration, so the portrait - the LCP element - shows up fast on phones. */}
            <div className="relative h-full w-full animate-hero-rise">
              <Image
                src="/krish-hero.webp"
                alt="Krishnendu Ghosal in a wine-red linen set, seated, holding a single red rose"
                fill
                priority
                fetchPriority="high"
                sizes="(min-width: 1024px) 34rem, 82vw"
                className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* --- Side copy (desktop: flanks the portrait; mobile: flows below it) --- */}
        <motion.div
          style={{ y: copyY, opacity: copyOpacity }}
          className="relative z-20 mx-auto grid max-w-7xl gap-10 px-3 pt-[calc(min(82vw,26rem)*0.98)] pb-10 md:px-4 lg:absolute lg:inset-x-0 lg:bottom-[7%] lg:grid-cols-[1fr_minmax(22rem,34%)_1fr] lg:items-end lg:pt-0 lg:pb-0"
        >
          {/* left */}
          <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            <motion.p
              {...fadeUp(1.0)}
              className="max-w-xs font-sans text-lg leading-snug font-light tracking-[0.08em] text-foreground uppercase md:text-xl"
            >
              I engineer systems that <span className="text-glow">think, scale</span> &amp; connect
            </motion.p>
            <motion.div {...fadeUp(1.1)}>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-full border border-ink/25 px-5 py-2.5 eyebrow text-foreground transition-colors hover:border-glow hover:bg-primary/20"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-glow opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-glow" />
                </span>
                Available for projects
                <span className="text-glow transition-transform duration-500 group-hover:rotate-90">✦</span>
              </a>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1], delay: 1.35 }}
              className="font-script text-4xl leading-none text-rose md:text-5xl"
            >
              Krishnendu Ghosal
            </motion.p>
          </div>

          {/* spacer column under the portrait on desktop */}
          <div className="hidden lg:block" />

          {/* right */}
          <div className="flex flex-col items-center gap-6 text-center lg:items-end lg:text-right">
            <motion.p {...fadeUp(1.15)} className="max-w-xs text-[15px] leading-relaxed text-muted-foreground">
              I&apos;m a software engineer crafting <span className="text-foreground">AI-powered platforms</span>,
              event-driven pipelines and cloud infrastructure, down to the interfaces people touch.
            </motion.p>
            <motion.div {...fadeUp(1.25)} className="flex items-center gap-4">
              <p className="eyebrow leading-relaxed text-muted-foreground">
                Based in India
                <br />
                Working worldwide
              </p>
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/25 text-champagne">
                <Globe2 className="h-5 w-5 animate-spin-slow" strokeWidth={1.4} />
              </span>
            </motion.div>
            <motion.div {...fadeUp(1.35)} className="flex items-center gap-2.5">
              {socials.map(({ icon: Icon, href, label }) => (
                <Magnetic key={label} strength={0.5}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-glow/60 hover:text-foreground"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                </Magnetic>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* --- Actions + numbers --- */}
      <motion.div
        {...fadeUp(1.45)}
        className="relative z-20 mx-auto flex w-full max-w-7xl flex-col items-center gap-8 border-t border-border px-6 pt-7 pb-8 md:px-12 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
          <Magnetic>
            <a
              href="#experience"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-champagne px-6 py-3.5 text-sm whitespace-nowrap font-medium tracking-wide text-[#1a0a0e] shadow-[0_0_40px_-10px_rgba(227,196,171,0.6)]"
            >
              <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-primary via-rose to-primary transition-transform duration-500 ease-out-expo group-hover:translate-y-0" />
              <span className="relative transition-colors duration-300 group-hover:text-white">View Work</span>
              <ArrowUpRight className="relative h-4 w-4 transition-all duration-300 group-hover:rotate-45 group-hover:text-white" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full border border-ink/20 px-6 py-3.5 text-sm whitespace-nowrap font-medium tracking-wide text-foreground transition-colors hover:border-glow/60 hover:bg-primary/15"
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
              className="group inline-flex items-center gap-3 rounded-full border border-ink/20 px-6 py-3.5 text-sm whitespace-nowrap font-medium tracking-wide text-foreground transition-colors hover:border-glow/60 hover:bg-primary/15"
            >
              Resume
              <FileText className="h-4 w-4 transition-transform group-hover:-rotate-6" />
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <CoffeeButton />
          </Magnetic>
        </div>

        <div className="grid w-full shrink-0 grid-cols-4 gap-3 sm:w-auto sm:gap-6 2xl:gap-8">
          {[
            { k: tenure, v: "Engineering", href: "#experience", label: "See my experience" },
            { k: "4+", v: "Domains", href: "#experience", label: "See my experience" },
            { k: "25+", v: "Technologies", href: "#skills", label: "See my skills" },
            { k: "4", v: "Companies", href: "#experience", label: "See the companies I worked at" },
          ].map((s) => (
            <a key={s.v} href={s.href} className="group text-center lg:text-left">
              <p className="font-display text-2xl whitespace-nowrap text-champagne transition-colors group-hover:text-glow sm:text-3xl">{s.k}</p>
              <p className="mt-1 text-[9px] leading-tight tracking-[0.1em] text-subtle uppercase sm:text-[10px] sm:tracking-[0.22em]">{s.v}</p>
              <span className="sr-only">, {s.label}</span>
            </a>
          ))}
        </div>

        <a
          href="#whoami"
          className="hidden items-center gap-2 eyebrow text-subtle transition-colors hover:text-foreground 2xl:flex"
        >
          Scroll
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
            <ArrowDown className="h-4 w-4" />
          </motion.span>
        </a>
      </motion.div>

      {/* --- Domain marquee --- */}
      <div className="relative z-20 border-y border-border bg-surface/70 py-4 mask-fade-x">
        <div className="flex w-max animate-marquee gap-10 [--marquee-duration:45s] hover:[animation-play-state:paused]">
          {[...domains, ...domains].map((d, i) => (
            <span
              key={i}
              aria-hidden={i >= domains.length || undefined}
              className="flex items-center gap-10 font-display text-xl whitespace-nowrap text-muted-foreground italic"
            >
              <a
                href={d.href}
                tabIndex={i >= domains.length ? -1 : undefined}
                className="transition-colors hover:text-champagne focus-visible:text-champagne"
              >
                {d.label}
              </a>
              <span className="text-sm text-rose not-italic">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
