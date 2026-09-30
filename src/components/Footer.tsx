"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { moreLinks, navLinks, useNavHref } from "@/components/Navbar";
import { TESTIMONIALS } from "@/content/testimonials";
import { Magnetic } from "@/components/ui/magnetic";
import { useClientValue } from "@/lib/use-client-value";
import { SiLeetcode } from "react-icons/si";
import { LEETCODE_URL } from "@/lib/site";

export default function Footer() {
  const year = useClientValue(() => new Date().getFullYear(), 2026);
  const lenis = useLenis();
  const resolve = useNavHref();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const wordY = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);
  const wordOpacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-border bg-surface">
      <div aria-hidden className="absolute bottom-0 left-1/2 h-[24rem] w-[60rem] -translate-x-1/2 translate-y-1/2 rounded-full bg-primary/20 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 pt-20 md:px-12">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="space-y-6 md:col-span-5">
            <p className="font-display text-3xl font-bold text-foreground">
              krish<span className="text-gradient">.dev</span>
            </p>
            <p className="max-w-sm text-muted-foreground">
              Building the future of open source. Focused on performance, scalability, and beautiful interfaces.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Github, href: "https://github.com/KriXsh", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/krish-me", label: "LinkedIn" },
                { icon: SiLeetcode, href: LEETCODE_URL, label: "LeetCode" },
                { icon: Mail, href: "mailto:krishnendughosal999@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <Magnetic key={label} strength={0.5}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="glass flex h-12 w-12 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          <div className="md:col-span-4">
            <p className="mb-6 font-mono text-[11px] tracking-[0.25em] text-subtle uppercase">Sitemap</p>
            <ul className="grid grid-cols-2 gap-y-3">
              {[...navLinks, ...moreLinks, ...(TESTIMONIALS.length ? [{ name: "Recommendations", href: "/testimonials" }] : [])].map((l) => (
                <li key={l.name}>
                  <Link href={resolve(l.href)} className="group inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                    <span className="h-px w-0 bg-foreground transition-all duration-300 group-hover:w-4" />
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="mb-6 font-mono text-[11px] tracking-[0.25em] text-subtle uppercase">Status</p>
            <div className="glass rounded-3xl p-6">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-sm font-semibold text-foreground">Available now</span>
              </div>
              <p className="text-sm text-muted-foreground">Currently looking for new projects and remote roles.</p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-border py-8 md:flex-row">
          <p className="text-sm text-subtle">© {year} Krishnendu Ghosal · Built with Next.js, Framer Motion &amp; Three.js</p>
          <Magnetic>
            <button
              onClick={toTop}
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-xs font-semibold tracking-widest text-background uppercase"
            >
              Back to top
              <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </Magnetic>
        </div>
      </div>

      {/* Oversized sign-off */}
      <motion.p
        aria-hidden
        style={{ y: wordY, opacity: wordOpacity }}
        className="pointer-events-none -mb-[0.2em] text-center font-display text-[20vw] leading-none font-extrabold tracking-[-0.06em] text-transparent select-none [-webkit-text-stroke:1px_color-mix(in_srgb,var(--color-ink)_14%,transparent)]"
      >
        KRISH
      </motion.p>
    </footer>
  );
}
