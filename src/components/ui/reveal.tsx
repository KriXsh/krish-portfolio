"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fades and lifts its children in the first time they scroll into view.
    Opacity + transform only: both run on the compositor, so dozens of reveals
    stay smooth on phones (an animated blur filter repaints every frame). */
export function Reveal({
  delay = 0,
  y = 28,
  className,
  children,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Staggers direct <RevealItem> children into view. */
export function RevealGroup({
  stagger = 0.08,
  delay = 0,
  className,
  children,
  ...props
}: HTMLMotionProps<"div"> & { stagger?: number; delay?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export function RevealItem({ className, children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={revealItem} className={className} {...props}>
      {children}
    </motion.div>
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
