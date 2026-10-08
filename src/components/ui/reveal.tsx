"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Marks an element as shown the first time it scrolls into view. */
function useShown<T extends Element>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, shown] as const;
}

type RevealProps = React.HTMLAttributes<HTMLDivElement> & { delay?: number; y?: number };

/** Fades and lifts its children in the first time they scroll into view.
    A CSS transition (globals.css `.reveal`) toggled once by an
    IntersectionObserver: it runs on the compositor, so dozens of reveals cost
    no main-thread work per frame while scrolling. */
export function Reveal({ delay = 0, y = 28, className, style, children, ...props }: RevealProps) {
  const [ref, shown] = useShown<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn("reveal", shown && "is-shown", className)}
      style={{ "--reveal-y": `${y}px`, transitionDelay: `${delay}s`, ...style } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}

/** Staggers direct <RevealItem> children into view (CSS, see `.reveal-group`). */
export function RevealGroup({
  stagger = 0.08,
  delay = 0,
  className,
  style,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { stagger?: number; delay?: number }) {
  const [ref, shown] = useShown<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn("reveal-group", shown && "is-shown", className)}
      style={{ "--reveal-stagger": `${stagger}s`, "--reveal-delay": `${delay}s`, ...style } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}

export function RevealItem({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("reveal-item", className)} {...props}>
      {children}
    </div>
  );
}

/** Splits text into characters that rise out of a clipping mask, one after another. */
export function SplitText({
  text,
  className,
  charClassName,
  delay = 0,
  stagger = 0.035,
  animateOnView = false,
}: {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  stagger?: number;
  animateOnView?: boolean;
}) {
  const words = text.split(" ");
  const trigger = animateOnView
    ? { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } }
    : { animate: "show" };
  let index = 0;

  // On load (not on view), the letters rise with a CSS animation: it starts on
  // first paint and runs on the compositor instead of one JS tween per letter.
  if (!animateOnView) {
    return (
      <span className={cn("inline-block", className)}>
        <span className="sr-only">{text}</span>
        {words.map((word, w) => (
          <span key={w} aria-hidden className="inline-block whitespace-nowrap">
            {word.split("").map((char) => {
              const i = index++;
              return (
                <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <span
                    className={cn("inline-block animate-char-rise", charClassName)}
                    style={{ animationDelay: `${delay + i * stagger}s` }}
                  >
                    {char}
                  </span>
                </span>
              );
            })}
            {w < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        ))}
      </span>
    );
  }

  return (
    <motion.span initial="hidden" {...trigger} className={cn("inline-block", className)}>
      <span className="sr-only">{text}</span>
      {words.map((word, w) => (
        <span key={w} aria-hidden className="inline-block whitespace-nowrap">
          {word.split("").map((char) => {
            const i = index++;
            return (
              <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className={cn("inline-block", charClassName)}
                  variants={{
                    hidden: { y: "110%", rotate: 6 },
                    show: {
                      y: "0%",
                      rotate: 0,
                      transition: { duration: 1, ease: EASE, delay: delay + i * stagger },
                    },
                  }}
                >
                  {char}
                </motion.span>
              </span>
            );
          })}
          {w < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}
