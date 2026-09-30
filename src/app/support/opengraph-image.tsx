import { renderOgCard, ogSize } from "../og-card";

export const alt = "Buy Krishnendu Ghosal a coffee";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgCard({
    eyebrow: "Krish's Coffee Bar",
    title: "Fuel the open source.",
    subtitle: "Pick a drink and pay by UPI in seconds, or sponsor in USD.",
  });
}
