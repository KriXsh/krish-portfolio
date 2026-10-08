import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import WhoAmI from "@/components/whoAmI";

// Below-the-fold sections are split into their own chunks. They are still
// server-rendered (full HTML for SEO and first paint), but React hydrates each
// one separately, in small tasks, instead of one long freeze on phones.
const Experience = dynamic(() => import("@/components/Experience"));
const Projects = dynamic(() => import("@/components/Projects"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const Skills = dynamic(() => import("@/components/Skills"));
const Certifications = dynamic(() => import("@/components/Certifications"));
const Resume = dynamic(() => import("@/components/Resume"));
const Contact = dynamic(() => import("@/components/Contact"));
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";
import { VelocityBand } from "@/components/ui/velocity-band";
import { Petals, type PetalSpec } from "@/components/ui/petals";

/** A home section with a loose clover leaf that falls and turns as it scrolls by.
    Order: intro -> experience -> projects -> testimonials -> skills -> credentials
    -> resume -> contact (who you are, proof, social proof, toolkit, reach out).
    They sit behind the content (isolate + -z-10) and hang off the column edges. */
function PetalSection({ id, petals, children }: { id: string; petals: PetalSpec[]; children: React.ReactNode }) {
  return (
    <section id={id} className="relative isolate">
      <Petals name={id} scroll petals={petals} className="-z-10 overflow-visible" />
      {children}
    </section>
  );
}

/** Content column shared by every section between the full-bleed bands. */
function Column({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-7xl px-6 md:px-12">{children}</div>;
}

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <main id="main" className="relative overflow-x-clip">
        <Hero />
        <Column>
          <section id="whoami"><WhoAmI /></section>
        </Column>
        <VelocityBand words={["Engineer", "Architect", "Builder", "Problem solver"]} />
        <Column>
          <PetalSection
            id="experience"
            petals={[
              { className: "-left-14 -top-6 h-24 w-20 md:-left-24 md:top-[2%] md:h-40 md:w-32", rotate: 150, duration: 14, fall: 220 },
            ]}
          >
            <Experience />
          </PetalSection>
          <PetalSection
            id="projects"
            petals={[
              { className: "-right-14 top-[2%] h-24 w-20 md:-right-20 md:h-36 md:w-28", rotate: 20, duration: 16, fall: 260, spin: -80 },
            ]}
          >
            <Projects />
          </PetalSection>
          <Testimonials />
          <PetalSection
            id="skills"
            petals={[{ className: "-left-14 top-[8%] h-24 w-20 md:-left-20 md:h-32 md:w-28", rotate: 150, duration: 15 }]}
          >
            <Skills />
          </PetalSection>
          <PetalSection
            id="achievements"
            petals={[
              { className: "-right-14 top-[6%] h-24 w-20 md:-right-16 md:h-32 md:w-28", rotate: -45, duration: 15 },
            ]}
          >
            <Certifications />
          </PetalSection>
          <section id="resume"><Resume /></section>
        </Column>
        <VelocityBand words={["Let's work together", "Available worldwide"]} baseVelocity={-2} className="mt-10" />
        <Column>
          <section id="contact"><Contact /></section>
        </Column>
      </main>
    </>
  );
}
