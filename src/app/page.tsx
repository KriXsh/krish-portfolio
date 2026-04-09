import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhoAmI from "@/components/whoAmI";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Freelance from "@/components/Freelance";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import SupportPage from "./support/page";

export default function Home() {
  return (
    <main className="relative min-h-screen solais-bg font-tech text-[#1a0505]">
      <Navbar />

      {/* Persistent Full-Site Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 solais-noise" />
      <div className="solais-grid-container fixed inset-0 pointer-events-none z-0">
        <div className="solais-grid" />
      </div>
      <div className="solais-glow fixed pointer-events-none z-0 inset-0" />

      {/* Hero - Full Bleed */}
      <div className="relative z-10 w-full">
        <Hero />
      </div>

      {/* Main Content - Wrapped in Glass Sections */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pb-32 space-y-32">
        {/* <section id="support"className="scroll-mt-24 p-8 solais-glass rounded-sm"><SupportPage /></section> */}
        <section id="whoami" className="scroll-mt-24 p-8 solais-glass rounded-sm"><WhoAmI /></section>
        <section id="skills" className="scroll-mt-24 p-8 solais-glass rounded-sm"><Skills /></section>
        <section id="experience" className="scroll-mt-24 p-8 solais-glass rounded-sm"><Experience /></section>
        <section id="freelance" className="scroll-mt-24 p-8 solais-glass rounded-sm"><Freelance /></section>
        <section id="projects" className="scroll-mt-24 p-8 solais-glass rounded-sm"><Projects /></section>
        <section id="education" className="scroll-mt-24 p-8 solais-glass rounded-sm"><Education /></section>
        <section id="achievements" className="scroll-mt-24 p-8 solais-glass rounded-sm"><Certifications /></section>
        <section id="chat" className="scroll-mt-24 p-8 solais-glass rounded-sm pb-12"><Contact /></section>
        {/* <section id="ChatBot" className="scroll-mt-24 p-8 solais-glass rounded-sm pb-12"><ChatBot /></section> */}
      </div>

      <div className="relative z-10">
        <Footer />
      </div>
    </main >
  );
}
