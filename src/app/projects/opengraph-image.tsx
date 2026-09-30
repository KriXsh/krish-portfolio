import { renderOgCard, ogSize } from "../og-card";

export const alt = "Projects & GitHub - Krishnendu Ghosal";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgCard({
    eyebrow: "Projects · Open source",
    title: "Everything I've shipped.",
    subtitle: "Live demos you can try in the browser, every public repo, and the contribution history behind them.",
  });
}
