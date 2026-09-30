import { renderOgCard, ogSize } from "./og-card";

export const alt = "Krishnendu Ghosal - Full-Stack, AI/ML & Cloud Engineer";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgCard({
    eyebrow: "Portfolio",
    title: "Krishnendu Ghosal",
    subtitle: "Full-stack, AI/ML & cloud engineer building AI platforms, event-driven pipelines and infrastructure that scales.",
  });
}
