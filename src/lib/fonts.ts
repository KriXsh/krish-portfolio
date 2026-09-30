// All typography lives here. To switch to a different font, change the import
// and the constructor below - every component reads `font-display`, `font-sans`
// and `font-mono` from the CSS variables these set.
import { JetBrains_Mono, Plus_Jakarta_Sans, Syne } from "next/font/google";

export const display = Syne({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const sans = Plus_Jakarta_Sans({
  variable: "--font-sans-face",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const mono = JetBrains_Mono({
  variable: "--font-mono-face",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const fontVariables = `${display.variable} ${sans.variable} ${mono.variable}`;
