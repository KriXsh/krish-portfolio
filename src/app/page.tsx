import Hero from "@/components/Hero";
import WhoAmI from "@/components/whoAmI";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Freelance from "@/components/Freelance";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Resume from "@/components/Resume";
import Testimonials from "@/components/Testimonials";
import SupportSection from "@/components/SupportSection";
import Contact from "@/components/Contact";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <main id="main" className="relative overflow-x-clip">
        <Hero />
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <section id="whoami"><WhoAmI /></section>
          <section id="skills"><Skills /></section>
          <section id="experience"><Experience /></section>
          <section id="freelance"><Freelance /></section>
          <section id="projects"><Projects /></section>
          <Testimonials />
          <section id="education"><Education /></section>
          <section id="achievements"><Certifications /></section>
          <section id="resume"><Resume /></section>
          <section id="support"><SupportSection /></section>
          <section id="contact"><Contact /></section>
        </div>
      </main>
    </>
  );
}
