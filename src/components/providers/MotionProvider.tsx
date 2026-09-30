"use client";

import { MotionConfig } from "framer-motion";
import { IconContext } from "react-icons";

/** App-wide client context: framer-motion respects the OS "reduce motion"
    setting (transforms skipped, fades kept), and brand icons are decorative. */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {/* Brand icons are decorative; the links/buttons around them carry the label. */}
      <IconContext.Provider value={{ attr: { "aria-hidden": "true", focusable: "false" } }}>{children}</IconContext.Provider>
    </MotionConfig>
  );
}
