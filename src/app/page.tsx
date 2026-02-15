import Link from "next/link";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import WhoAmI from "@/components/whoAmI";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Certifications from "@/components/Certifications";
import SupportSection from "@/components/SupportSection";
import Freelance from "@/components/Freelance";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 selection:bg-indigo-500/20 selection:text-indigo-300">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 space-y-12 pb-20">
        <Hero />
        <section id="whoami" className="scroll-mt-24">
          <WhoAmI />
        </section>
        <section id="skills" className="scroll-mt-24">
          <Skills />
        </section>
        <section id="experience" className="scroll-mt-24">
          <Experience />
        </section>
        <section id="freelance" className="scroll-mt-24">
          <Freelance />
        </section>
        <section id="projects" className="scroll-mt-24">
          <Projects />
        </section>
        <section id="education" className="scroll-mt-24">
          <Education />
        </section>
        <section id="achievements" className="scroll-mt-24">
          <Certifications />
        </section>
        <section id="support" className="scroll-mt-24 pb-12">
          <SupportSection />
        </section>
        <section id="contact" className="scroll-mt-24 pb-12">
          <Contact />
        </section>
      </div>
      <Footer />
    </main>
  );
}