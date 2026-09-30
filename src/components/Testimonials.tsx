import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiLinkedin } from "react-icons/si";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { TestimonialCard } from "@/components/TestimonialCard";
import { LINKEDIN_RECOMMENDATIONS_URL, TESTIMONIALS } from "@/content/testimonials";

const PREVIEW = 3;

/** Homepage preview. Renders nothing until real recommendations are added. */
export default function Testimonials() {
  if (!TESTIMONIALS.length) return null;
  return (
    <section id="testimonials" className="py-28 md:py-36">
      <SectionHeading
        eyebrow="Recommendations"
        title={
          <>
            What people <span className="text-gradient">say.</span>
          </>
        }
        description="Recommendations from managers, teammates and clients on LinkedIn."
      />
      <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.slice(0, PREVIEW).map((t) => (
          <RevealItem key={t.name + t.date}>
            <TestimonialCard t={t} />
          </RevealItem>
        ))}
      </RevealGroup>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        {TESTIMONIALS.length > PREVIEW && (
          <Link href="/testimonials" className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background">
            Read all {TESTIMONIALS.length} recommendations <ArrowUpRight className="h-4 w-4" />
          </Link>
        )}
        <a
          href={LINKEDIN_RECOMMENDATIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground"
        >
          <SiLinkedin className="h-4 w-4 text-[#0a66c2]" /> View on LinkedIn
        </a>
      </div>
    </section>
  );
}
