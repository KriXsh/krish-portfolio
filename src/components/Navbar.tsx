"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, FileText, Github, Linkedin, Menu, X } from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import { LEETCODE_URL, RESUME_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

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
  { name: "Services", href: "#freelance" },
  { name: "Education", href: "#education" },
  { name: "Resume", href: "#resume" },
  { name: "Buy me a coffee", href: "/support" },
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
          <NavAnchor href={onHome ? "#top" : "/"} aria-label="Home" className="font-display text-lg font-bold tracking-tight text-foreground">
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-background/95 px-8 backdrop-blur-2xl lg:hidden"
          >
            <ul className="space-y-2">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavAnchor
                    href={resolve(link.href)}
                    onClick={() => setIsOpen(false)}
                    className="flex items-baseline gap-4 font-display text-5xl font-bold tracking-tight text-foreground"
                  >
                    <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                    {link.name}
                  </NavAnchor>
                </motion.li>
              ))}
            </ul>
            <motion.a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background"
            >
              <FileText className="h-4 w-4" /> View resume
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
