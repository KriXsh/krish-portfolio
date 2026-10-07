"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowUp, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { moreLinks, navLinks, useNavHref } from "@/components/Navbar";
import { TESTIMONIALS } from "@/content/testimonials";
import { Magnetic } from "@/components/ui/magnetic";
import { Petals } from "@/components/ui/petals";
import { Vine } from "@/components/ui/vine";
import { RoseLatte } from "@/components/coffee/RoseLatte";
import { useClientValue } from "@/lib/use-client-value";
import { SiLeetcode } from "react-icons/si";
import { LEETCODE_URL } from "@/lib/site";

const EMAIL = "krishnendughosal999@gmail.com";

const socials = [
  { icon: Github, href: "https://github.com/KriXsh", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/krish-me", label: "LinkedIn" },
  { icon: SiLeetcode, href: LEETCODE_URL, label: "LeetCode" },
  { icon: Mail, href: `mailto:${EMAIL}`, label: "Email" },
];

/** A single-line rose that draws itself as the footer scrolls in: stem first,
    then the leaves, then the bloom spirals open and blushes with colour.
    Every stroke is an SVG path animated by `pathLength`, so it is crisp at any
    size and costs no image request. */
function BloomingRose({ progress, className }: { progress: MotionValue<number>; className?: string }) {
  const reduced = useReducedMotion();
  const stem = useTransform(progress, [0.02, 0.32], [0, 1]);
  const leaves = useTransform(progress, [0.18, 0.4], [0, 1]);
  const bloom = useTransform(progress, [0.3, 0.55], [0, 1]);
  const blush = useTransform(progress, [0.45, 0.62], [0, 1]);
  // Reduced motion: the rose is simply there, fully drawn.
  const draw = (v: MotionValue<number>) => (reduced ? undefined : { pathLength: v });

  return (
    <svg viewBox="0 0 160 320" fill="none" aria-hidden className={className}>
      <defs>
        <radialGradient id="footer-rose-fill" cx="45%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#c8475c" />
          <stop offset="55%" stopColor="#7a1a2c" />
          <stop offset="100%" stopColor="#2a0910" />
        </radialGradient>
      </defs>

      {/* blush behind the line-work */}
      <motion.path
        d="M50 66c-6 18 2 38 30 42 28-4 36-24 30-42-4-16-16-28-30-28S54 50 50 66Z"
        fill="url(#footer-rose-fill)"
        style={reduced ? undefined : { opacity: blush }}
      />

      <g className="text-champagne" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <motion.path style={draw(stem)} d="M80 108c-3 40 6 70 0 110s-4 60 2 96" />
        <motion.path style={draw(stem)} d="M80 150l-7-5M81 214l7-4M80 280l-6-5" />
        <motion.path style={draw(leaves)} d="M79 190c-22-4-38-18-42-36 20 2 36 16 42 36Z" />
        <motion.path style={draw(leaves)} d="M79 190c-12-10-24-22-34-30" strokeOpacity="0.5" />
        <motion.path style={draw(leaves)} d="M81 240c22-6 36-22 38-40-20 4-34 20-38 40Z" />
        <motion.path style={draw(leaves)} d="M81 240c10-12 22-26 32-34" strokeOpacity="0.5" />
        <motion.path style={draw(leaves)} d="M66 104c-8 4-16 2-20-4 8-2 14-1 20 4ZM94 104c8 4 16 2 20-4-8-2-14-1-20 4Z" />
      </g>

      <g className="text-rose" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <motion.path style={draw(bloom)} d="M80 64c6-3 12 2 9 8-3 7-14 7-17-1-4-9 5-18 15-16 12 2 18 15 12 26-7 12-25 14-35 4-11-11-8-30 6-38" />
        <motion.path style={draw(bloom)} d="M50 66c-6 18 2 38 30 42 28-4 36-24 30-42" />
        <motion.path style={draw(bloom)} d="M50 66c-14-6-18-22-10-34 10 4 16 12 18 20M110 66c14-6 18-22 10-34-10 4-16 12-18 20" />
        <motion.path style={draw(bloom)} d="M62 40c4-12 14-18 18-18s14 6 18 18" />
      </g>
    </svg>
  );
}

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -15% 0px" },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const, delay },
});

export default function Footer() {
  const year = useClientValue(() => new Date().getFullYear(), 2026);
  const lenis = useLenis();
  const resolve = useNavHref();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });

  // Wine pours up into "KRISH" as you reach the end.
  const pour = useTransform(scrollYProgress, [0.6, 1], [100, 0]);
  const pourClip = useTransform(pour, (v) => `inset(${v}% 0 0 0)`);
  const wordY = useTransform(scrollYProgress, [0.4, 1], ["30%", "0%"]);

  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sitemap = [
    ...navLinks,
    ...moreLinks,
    ...(TESTIMONIALS.length ? [{ name: "Recommendations", href: "/testimonials" }] : []),
  ];

  return (
    <footer ref={ref} className="relative isolate overflow-hidden border-t border-border bg-surface">
      {/* Atmosphere: a wine bloom rising from the floor (a gradient, not a blur
          filter, so it is free to scroll past on phones) and the hero's grain. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_100%,rgba(163,41,61,0.32),rgba(94,20,34,0.12)_45%,transparent_75%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_85%_10%,rgba(227,196,171,0.07),transparent_70%)]" />
        <div className="absolute inset-0 grain opacity-[0.05] mix-blend-overlay" />
      </div>

      <Petals
        name="footer"
        scroll
        className="-z-10"
        petals={[
          { className: "-left-6 top-[3%] h-24 w-20 md:left-[3%] md:h-40 md:w-32", rotate: -30, duration: 14, fall: 320, spin: 120 },
          { className: "right-[34%] top-[10%] hidden h-14 w-12 md:block", rotate: 80, duration: 11, blur: true, fall: 420, spin: -160 },
          { className: "-right-8 top-[36%] h-28 w-24 md:h-44 md:w-36", rotate: 160, duration: 16, fall: 260, spin: -90 },
          { className: "left-[40%] top-[56%] h-12 w-10 md:h-20 md:w-16", rotate: 20, duration: 12, blur: true, fall: 360, spin: 140 },
          { className: "left-[12%] bottom-[18%] hidden h-20 w-16 md:block", rotate: -120, duration: 15, fall: 200, spin: -70 },
        ]}
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        {/* --- Sign-off --- */}
        <div className="grid items-center gap-8 pt-20 md:pt-28 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div>
            <motion.div {...reveal()} className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <p className="eyebrow text-champagne">
                <span className="text-rose">✦</span> Before you go
              </p>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-rose/50 hover:text-foreground"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Available for projects
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover:rotate-45" />
              </Link>
            </motion.div>
            <motion.h2
              {...reveal(0.08)}
              className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-[-0.02em] text-foreground"
            >
              Every great build
              <br />
              starts with a <span className="text-gradient italic">conversation.</span>
            </motion.h2>
            <motion.p {...reveal(0.16)} className="mt-4 font-script text-4xl text-rose md:text-5xl">
              with love, Krish
            </motion.p>

            <motion.div {...reveal(0.24)} className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Link
                  href={resolve("#contact")}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary via-rose to-primary bg-[length:200%_auto] px-7 py-4 text-xs font-medium tracking-widest text-white uppercase shadow-[0_18px_40px_-14px_rgba(163,41,61,0.8)] transition-[background-position] duration-700 hover:bg-[position:100%_center]"
                >
                  Start a project
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                </Link>
              </Magnetic>
              <a
                href={`mailto:${EMAIL}`}
                className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="relative">
                  {EMAIL}
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-rose transition-transform duration-500 group-hover:scale-x-100" />
                </span>
              </a>
            </motion.div>
          </div>

          <BloomingRose
            progress={scrollYProgress}
            className="mx-auto h-56 w-auto drop-shadow-[0_0_24px_rgba(200,71,92,0.25)] md:h-72 lg:h-[24rem]"
          />
        </div>

        {/* --- Vine divider: grows across as you scroll --- */}
        <Vine className="mt-14 md:mt-20" />

        {/* --- Links --- */}
        <div className="grid gap-12 pt-12 md:grid-cols-12 md:gap-14">
          <div className="space-y-6 md:col-span-4">
            <p className="font-display text-3xl font-bold text-foreground">
              krish<span className="text-gradient">.dev</span>
            </p>
            <p className="max-w-sm text-muted-foreground">
              Systems that think, scale and connect - built with care, shipped with craft.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <Magnetic key={label} strength={0.5}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="glass group relative flex h-12 w-12 items-center justify-center rounded-full text-muted-foreground transition-colors duration-300 hover:border-rose/60 hover:text-rose"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 scale-50 rounded-full bg-[radial-gradient(circle,rgba(200,71,92,0.28),transparent_70%)] opacity-0 transition-all duration-500 group-hover:scale-125 group-hover:opacity-100"
                    />
                    <Icon className="relative h-4 w-4" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="md:col-span-4">
            <p className="mb-6 eyebrow text-subtle uppercase">Sitemap</p>
            <ul className="grid grid-cols-2 gap-y-3">
              {sitemap.map((l) => (
                <li key={l.name}>
                  <Link
                    href={resolve(l.href)}
                    className="group inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span
                      aria-hidden
                      className="text-[0.6rem] text-rose opacity-0 transition-all duration-300 group-hover:rotate-90 group-hover:opacity-100"
                    >
                      ✦
                    </span>
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="mb-6 eyebrow text-subtle uppercase">Coffee break</p>
            <RoseLatte />
          </div>
        </div>

        {/* --- Bottom bar --- */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-border py-8 md:flex-row">
          <p className="text-sm text-subtle">© {year} Krishnendu Ghosal · Built with Next.js &amp; Framer Motion</p>
          <p className="eyebrow text-champagne">
            Thank you for visiting <span className="text-rose">✦</span>
          </p>
          <Magnetic>
            <button
              onClick={toTop}
              className="group inline-flex items-center gap-2 rounded-full bg-champagne px-6 py-3 text-xs font-medium tracking-widest text-[#1a0a0e] uppercase"
            >
              Back to top
              <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </Magnetic>
        </div>
      </div>

      {/* --- Sign-off word: an outline that fills with wine as you reach the end --- */}
      <motion.div aria-hidden style={{ y: wordY }} className="pointer-events-none relative -mb-[0.2em] select-none">
        <p className="text-center font-display text-[20vw] leading-none tracking-[-0.02em] text-transparent [-webkit-text-stroke:1px_color-mix(in_srgb,var(--color-champagne)_30%,transparent)]">
          KRISH
        </p>
        <motion.p
          style={reduced ? undefined : { clipPath: pourClip }}
          className="absolute inset-0 bg-gradient-to-t from-[#5e1422] via-rose to-champagne bg-clip-text text-center font-display text-[20vw] leading-none tracking-[-0.02em] text-transparent"
        >
          KRISH
        </motion.p>
      </motion.div>
    </footer>
  );
}
