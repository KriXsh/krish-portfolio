"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, FileText, Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import { LEETCODE_URL, RESUME_URL } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Petals } from "@/components/ui/petals";

// `href` is where the link goes; `section` is the homepage section that lights
// the link up while it's on screen. Projects opens its own page.
export const navLinks = [
  { name: "About", href: "#whoami", section: "whoami" },
  { name: "Experience", href: "#experience", section: "experience" },
  { name: "Case studies", href: "/case-studies", section: "case-studies" },
  { name: "Projects", href: "/projects", section: "projects" },
  { name: "Blog", href: "/blog", section: "blog" },
  { name: "Skills", href: "#skills", section: "skills" },
  { name: "Contact", href: "#contact", section: "contact" },
];

/** Homepage sections that live in the footer rather than the top bar. */
export const moreLinks = [
  { name: "Services", href: "/services" },
  { name: "Credentials", href: "#achievements" },
  { name: "Resume", href: "#resume" },
  { name: "Buy me a coffee", href: "/support" },
];

const socials = [
  { icon: Github, href: "https://github.com/KriXsh", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/krish-me", label: "LinkedIn" },
  { icon: SiLeetcode, href: LEETCODE_URL, label: "LeetCode" },
  { icon: Mail, href: "mailto:krishnendughosal999@gmail.com", label: "Email" },
];

/** Homepage anchors ("#skills") only exist on "/". From any other page they
    become "/#skills", which opens the homepage at that section. */
export function useNavHref() {
  const onHome = usePathname() === "/";
  return (href: string) => (href.startsWith("#") && !onHome ? `/${href}` : href);
}

/** In-page anchors stay plain links (Lenis glides to them); routes use Next's Link. */
function NavAnchor({ href, ...props }: React.ComponentProps<"a"> & { href: string }) {
  return href.startsWith("/") ? <Link href={href} {...props} /> : <a href={href} {...props} />;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();

  // Mobile menu: Escape closes it, focus moves into it, and the page behind stops scrolling.
  useEffect(() => {
    if (!isOpen) return;
    lenis?.stop();
    const first = menuRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
    };
  }, [isOpen, lenis]);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const onHome = pathname === "/";
  const resolve = useNavHref();
  // Off the homepage, light up the link for the page you're on (e.g. Projects on /projects).
  const current = onHome
    ? active
    : (navLinks.find((l) => l.href.startsWith("/") && (pathname === l.href || pathname.startsWith(`${l.href}/`)))?.section ?? "");

  // Compact after the hero, and tuck away while scrolling down.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 600 && y > prev && !isOpen);
  });

  // Highlight whichever section is under the middle of the viewport.
  useEffect(() => {
    if (!onHome) return;
    const ids = navLinks.map((l) => l.section);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = id && document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [onHome]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          className={cn(
            "flex w-full max-w-6xl items-center justify-between rounded-full px-3 py-2 pl-5 transition-all duration-500",
            scrolled ? "glass bg-background/70 shadow-[0_10px_40px_-12px_var(--color-shadow)]" : "border border-transparent",
          )}
        >
          <NavAnchor href={onHome ? "#top" : "/"} aria-label="krish.dev, home" className="font-display text-lg font-bold tracking-tight text-foreground">
            krish<span className="text-gradient">.dev</span>
          </NavAnchor>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavAnchor
                  href={resolve(link.href)}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    current === link.section ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {current === link.section && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-ink/[0.07] ring-1 ring-ink/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {link.name}
                </NavAnchor>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/KriXsh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hidden rounded-full p-2.5 text-muted-foreground transition-colors hover:text-foreground 2xl:block"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/in/krish-me"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hidden rounded-full p-2.5 text-muted-foreground transition-colors hover:text-foreground 2xl:block"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={LEETCODE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode"
              className="hidden rounded-full p-2.5 text-muted-foreground transition-colors hover:text-foreground 2xl:block"
            >
              <SiLeetcode className="h-4 w-4" />
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:flex"
            >
              <FileText className="h-4 w-4" />
              Resume
            </a>
            <NavAnchor
              href={resolve("#contact")}
              className="group hidden items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition-transform hover:scale-[1.03] md:flex"
            >
              Let&apos;s talk
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </NavAnchor>
            <button
              ref={toggleRef}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="glass rounded-full p-2.5 text-foreground lg:hidden"
              onClick={() => setIsOpen((v) => !v)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu: a wine-glass card that blooms out of the menu button (clip-path,
          no filters, so it stays smooth on phones) over a soft scrim. */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="menu-scrim"
            aria-hidden
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-[#0b0708]/55 lg:hidden"
          />
        )}
        {isOpen && (
          <motion.div
            key="menu-panel"
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0, y: -8, clipPath: "circle(0% at 92% 0%)" }}
            animate={{ opacity: 1, y: 0, clipPath: "circle(150% at 92% 0%)" }}
            exit={{ opacity: 0, y: -8, clipPath: "circle(0% at 92% 0%)", transition: { duration: 0.38, ease: [0.4, 0, 1, 1] } }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent
            className="fixed inset-x-3 top-[5.25rem] z-40 flex max-h-[calc(100dvh-6.25rem)] flex-col overflow-x-hidden overflow-y-auto rounded-[1.75rem] border border-[#e8a9a1]/15 bg-[linear-gradient(165deg,rgba(58,16,26,0.8),rgba(18,10,12,0.9))] px-6 pt-6 pb-7 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,236,228,0.08)] backdrop-blur-2xl backdrop-saturate-150 lg:hidden"
          >
            {/* glass light, grain, petals */}
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_100%_0%,rgba(200,71,92,0.3),transparent_70%),radial-gradient(ellipse_60%_35%_at_0%_100%,rgba(227,196,171,0.1),transparent_70%)]" />
            <div aria-hidden className="pointer-events-none absolute inset-0 grain opacity-[0.06] mix-blend-overlay" />
            <Petals
              name="menu"
              className="opacity-60"
              petals={[
                { className: "-right-4 top-[42%] h-16 w-12", rotate: -35, duration: 12 },
                { className: "-left-4 bottom-[8%] h-10 w-8", rotate: 140, duration: 10, blur: true },
              ]}
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              {[18, 44, 70, 88].map((left, i) => (
                <svg
                  key={left}
                  viewBox="0 0 120 150"
                  className="absolute -top-6 h-4 w-3.5 animate-kai-petal opacity-0"
                  style={{ left: `${left}%`, animationDelay: `${0.1 + i * 0.16}s`, "--kai-spin": `${i % 2 ? -1 : 1}` } as React.CSSProperties}
                >
                  <path d="M60 146C26 132 4 98 8 62 12 28 36 4 62 4c28 0 52 26 50 60-2 38-22 70-52 82Z" fill={i % 2 ? "#c8475c" : "#8e2236"} />
                </svg>
              ))}
            </div>
            <p className="relative mb-3 eyebrow text-champagne">
              <span className="text-rose">✦</span> Menu
            </p>
            <ul className="relative space-y-0.5">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.045, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavAnchor
                    href={resolve(link.href)}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center gap-4 rounded-2xl px-3 py-2.5 font-display text-2xl leading-tight whitespace-nowrap text-foreground transition-colors active:bg-rose/15 hover:bg-rose/10 [@media(max-height:640px)]:py-1.5"
                  >
                    <span className="font-display text-sm text-champagne/70">0{i + 1}</span>
                    {link.name}
                    <span aria-hidden className="ml-auto text-xs text-rose opacity-0 transition-opacity group-hover:opacity-100 group-active:opacity-100">
                      ✦
                    </span>
                  </NavAnchor>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.55 }}
              className="relative mt-5 flex shrink-0 flex-wrap items-center justify-between gap-4 border-t border-[#e8a9a1]/10 pt-5"
            >
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary via-rose to-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_32px_-12px_rgba(163,41,61,0.85)]"
              >
                <FileText className="h-4 w-4" /> View resume
              </a>
              <div className="flex items-center gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e8a9a1]/15 bg-white/[0.04] text-muted-foreground transition-colors hover:border-rose/50 hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
