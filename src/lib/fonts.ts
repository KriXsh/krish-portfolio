// All typography lives here. To switch to a different font, change the import
// and the constructor below - every component reads `font-display`, `font-sans`,
// `font-script` and `font-mono` from the CSS variables these set.
//
// Type system: Instrument Serif is the hero's signature (name, stats, signature
// line) and the big scrolling word bands; everything else - headings included -
// is Inter Tight, a crisp product sans; small metadata is Fragment Mono.
// globals.css points `font-display` at the serif only inside the hero.
import { Fragment_Mono, Instrument_Serif, Inter_Tight } from "next/font/google";

// Instrument Serif ships a single 400 cut (+ italic). `font-synthesis-weight: none`
// in globals.css stops browsers faking a bold when components ask for one.
export const display = Instrument_Serif({
  variable: "--font-serif-face",
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  display: "swap",
});

// Variable font (no `weight`): every weight from two files, upright + italic.
export const sans = Inter_Tight({
  variable: "--font-sans-face",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

// Metadata voice (labels, dates, tags, chips): a grotesk-shaped mono that sits
// naturally next to Inter Tight. Single 400 cut.
export const mono = Fragment_Mono({
  variable: "--font-mono-face",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const fontVariables = `${display.variable} ${sans.variable} ${mono.variable}`;
