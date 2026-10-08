import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiLinkedin } from "react-icons/si";
import { TestimonialCard } from "@/components/TestimonialCard";
import { LINKEDIN_RECOMMENDATIONS_URL, TESTIMONIALS } from "@/content/testimonials";
import { Petals } from "@/components/ui/petals";

export const metadata: Metadata = {
  title: "Recommendations | Krishnendu Ghosal",
  description: "LinkedIn recommendations from managers, teammates and clients of Krishnendu Ghosal.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  if (!TESTIMONIALS.length) notFound();
  return (
    <main id="main" className="relative isolate min-h-screen overflow-x-clip px-6 pt-28 pb-24 md:px-12 md:pt-36 md:pb-32">
      <Petals
        name="testimonials-page"
        scroll
        className="-z-10"
        petals={[
          { className: "-right-6 top-24 h-24 w-20 md:right-[5%] md:top-32 md:h-36 md:w-28", rotate: -25, duration: 14 },
          { className: "-left-8 top-[30rem] hidden h-16 w-14 md:block", rotate: 150, duration: 12, blur: true },
        ]}
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[30rem] grid-lines mask-fade-b opacity-60" />
      <div className="relative mx-auto max-w-6xl">
        <p className="mb-3 eyebrow text-subtle uppercase">Recommendations</p>
        <h1 className="font-display text-display-lg font-normal text-foreground">
          In their <span className="text-gradient">words.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
          {TESTIMONIALS.length} recommendation{TESTIMONIALS.length === 1 ? "" : "s"} from people I&apos;ve worked with, as written on LinkedIn.
        </p>
        <a
          href={LINKEDIN_RECOMMENDATIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground"
        >
          <SiLinkedin className="h-4 w-4 text-[#0a66c2]" /> Verify on LinkedIn
        </a>
        <div className="mt-12 columns-1 gap-5 md:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name + t.date} t={t} clamp={false} />
          ))}
        </div>
      </div>
    </main>
  );
}
