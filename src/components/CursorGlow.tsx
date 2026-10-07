"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useClientValue } from "@/lib/use-client-value";

const readFinePointer = () => window.matchMedia("(pointer: fine)").matches;

/** A soft wine-coloured light that trails the mouse. Fine pointers only.
    The glow is one fixed-size layer moved with a transform, so following the
    cursor never repaints the page (animating a full-screen gradient would). */
export default function CursorGlow() {
  const enabled = useClientValue(readFinePointer, false);
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 90, damping: 22 });
  const sy = useSpring(y, { stiffness: 90, damping: 22 });

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX - 300);
      y.set(e.clientY - 300);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed top-0 left-0 z-[1] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(163,41,61,0.10),transparent_60%)] will-change-transform"
    />
  );
}
