import Hero from "@/components/Hero";
import WhoAmI from "@/components/whoAmI";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Resume from "@/components/Resume";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";
import { VelocityBand } from "@/components/ui/velocity-band";
import { Petals, type PetalSpec } from "@/components/ui/petals";

/** A home section with a couple of rose petals that fall and turn as it scrolls by.
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
            id="skills"
            petals={[{ className: "-right-14 top-[8%] h-24 w-20 md:-right-16 md:h-32 md:w-28", rotate: -30, duration: 15 }]}
          >
            <Skills />
          </PetalSection>
          <PetalSection
            id="experience"
            petals={[
              { className: "-left-14 -top-6 h-24 w-20 md:-left-24 md:top-[2%] md:h-40 md:w-32", rotate: 150, duration: 14, fall: 220 },
              { className: "-right-10 top-[55%] h-16 w-14 md:-right-14 md:h-24 md:w-20", rotate: -60, duration: 12, blur: true, fall: 160 },
            ]}
          >
            <Experience />
          </PetalSection>
          <PetalSection
            id="projects"
            petals={[
              { className: "-right-14 top-[2%] h-24 w-20 md:-right-20 md:h-36 md:w-28", rotate: 20, duration: 16, fall: 260, spin: -80 },
              { className: "-left-6 top-[45%] hidden h-20 w-16 md:block md:-left-16", rotate: 200, duration: 13, blur: true, fall: 200 },
            ]}
          >
            <Projects />
          </PetalSection>
          <Testimonials />
          <PetalSection
            id="achievements"
            petals={[
              { className: "-right-14 top-[6%] h-24 w-20 md:-right-16 md:h-32 md:w-28", rotate: -45, duration: 15 },
              { className: "-left-6 bottom-[10%] hidden h-14 w-12 md:block md:-left-12", rotate: 80, duration: 11, blur: true },
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
