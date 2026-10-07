// All typography lives here. To switch to a different font, change the import
// and the constructor below - every component reads `font-display`, `font-sans`,
// `font-script` and `font-mono` from the CSS variables these set.
//
// Editorial pairing: a high-contrast Didone for headlines, a geometric sans for
// UI and body copy, and a hand-script for signatures and flourishes.
import { Bodoni_Moda, JetBrains_Mono, Jost, Pinyon_Script } from "next/font/google";

// Only the regular + medium cuts are loaded. Components that ask for bold
// display type resolve to 500 (see `font-synthesis` in globals.css), so the
// serif keeps its hairline contrast instead of turning into a slab.
export const display = Bodoni_Moda({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const sans = Jost({
  variable: "--font-sans-face",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const script = Pinyon_Script({
  variable: "--font-script-face",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const mono = JetBrains_Mono({
  variable: "--font-mono-face",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const fontVariables = `${display.variable} ${sans.variable} ${script.variable} ${mono.variable}`;
