import { FloatingCta } from "@/components/ui/floating-cta";

/** Homepage pointer to the full services page at /services. */
export default function ServicesTeaser() {
  return (
    <FloatingCta
      className="pt-28 md:pt-36"
      href="/services"
      live
      eyebrow="Available for projects"
      title={<>Need a technical <span className="text-gradient">partner?</span></>}
      cta="View services"
      chips={["Full-Stack MVPs", "AI Integration", "Cloud & DevOps", "System Design"]}
    />
  );
}
