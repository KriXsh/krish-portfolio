import { renderOgCard, ogSize } from "../og-card";

export const alt = "Services by Krishnendu Ghosal";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgCard({
    eyebrow: "Collaboration",
    title: "Need a technical partner?",
    subtitle: "Full-stack MVPs, AI integration, cloud & DevOps, and system design.",
  });
}
