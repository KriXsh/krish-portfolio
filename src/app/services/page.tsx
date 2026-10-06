import type { Metadata } from "next";
import Freelance from "@/components/Freelance";

export const metadata: Metadata = {
  title: "Services | Krishnendu Ghosal",
  description:
    "Part-time development and project-based services: full-stack MVPs, AI integration, cloud & DevOps, and system design.",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services", title: "Services | Krishnendu Ghosal" },
};

export default function ServicesPage() {
  return (
    <main id="main" className="relative min-h-screen overflow-x-clip px-6 pt-28 pb-24 md:px-12 md:pt-36 md:pb-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[30rem] grid-lines mask-fade-b opacity-60" />
      <div className="relative mx-auto max-w-7xl">
        <p className="mb-3 font-mono text-xs tracking-[0.25em] text-subtle uppercase">Collaboration</p>
        <h1 className="font-display text-display-lg font-bold text-foreground">
          Need a technical <span className="text-gradient">partner?</span>
        </h1>
        <p className="mt-4 mb-14 max-w-2xl text-muted-foreground md:mb-20 md:text-lg">
          Part-time development and project-based services for businesses looking to scale with precision.
        </p>
        <Freelance />
      </div>
    </main>
  );
}
