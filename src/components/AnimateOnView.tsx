"use client";

import { useEffect, useRef, ReactNode, CSSProperties, ElementType } from "react";

type Animation = "fade-up" | "fade-in" | "fade-left" | "fade-right" | "scale-up";

interface AnimateOnViewProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  animation?: Animation;
  threshold?: number;
  once?: boolean;
  as?: ElementType;
}

const initials: Record<Animation, CSSProperties> = {
  "fade-up":    { opacity: 0, transform: "translateY(80px) perspective(1000px) rotateX(10deg)" },
  "fade-in":    { opacity: 0, transform: "scale(0.96)" },
  "fade-left":  { opacity: 0, transform: "translateX(-100px) skewX(5deg)" },
  "fade-right": { opacity: 0, transform: "translateX(100px) skewX(-5deg)" },
  "scale-up":   { opacity: 0, transform: "scale(0.8) translateY(40px)" },
};

export default function AnimateOnView({
  children,
  className = "",
  delay = 0,
  duration = 800,
  animation = "fade-up",
  threshold = 0.1,
  once = true,
  as: Tag = "div",
}: AnimateOnViewProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    Object.assign(el.style, initials[animation]);
    el.style.willChange = "opacity, transform";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;
          el.style.opacity = "1";
          el.style.transform = "none";
          if (once) observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animation, delay, duration, threshold, once]);

  return <Tag ref={ref as any} className={className}>{children}</Tag>;
}