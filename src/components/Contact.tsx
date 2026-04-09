"use client";

import { useState } from "react";
import { Send, Mail, User, MessageCircle } from "lucide-react";
import AnimateOnView from "./AnimateOnView";

export default function Contact() {
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    // Logic: integration with SES / API route
    setTimeout(() => setPending(false), 2000); 
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden solais-noise">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <AnimateOnView animation="fade-up">
            <span className="pill !text-red-600 !border-red-600/30 !bg-red-600/5">Direct Line</span>
          </AnimateOnView>
          <h2 className="mt-4 text-4xl md:text-6xl font-black text-[#112337] dark:text-white uppercase tracking-tighter italic">
            Send A <span className="text-red-600">Message</span>
          </h2>
        </div>

        <div className="card solais-glass p-8 md:p-12 !border-red-600/20">
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600 flex items-center gap-2">
                <User size={12} /> Full Name // Identity
              </label>
              <input required name="name" type="text" placeholder="KRISHNENDU GHOSAL" 
                className="input !border-red-600/20 focus:!border-red-600 !bg-red-600/5 font-tech" />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600 flex items-center gap-2">
                <Mail size={12} /> Email Address // Link
              </label>
              <input required name="email" type="email" placeholder="krish@example.com" 
                className="input !border-red-600/20 focus:!border-red-600 !bg-red-600/5 font-tech" />
            </div>

            <div className="md:col-span-2 space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600 flex items-center gap-2">
                <MessageCircle size={12} /> Your Inquiry // Payload
              </label>
              <textarea required name="message" rows={5} placeholder="PROJECT SPECIFICATIONS..." 
                className="input !border-red-600/20 focus:!border-red-600 !bg-red-600/5 font-tech resize-none" />
            </div>

            <div className="md:col-span-2">
              <button 
                disabled={pending}
                className="btn !bg-red-600 !text-white hover:!bg-red-700 !border-none shadow-[0_0_15px_rgba(220,38,38,0.3)] w-full justify-center group uppercase tracking-widest font-black"
              >
                {pending ? "TRANSMITTING..." : "SEND VIA SECURE CHANNEL"}
                <Send size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}