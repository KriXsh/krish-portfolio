"use client";

import { useState } from "react";
import { Send, Github, Linkedin, Mail } from "lucide-react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) setStatus("success");
      else setStatus("error");
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden rounded-[3rem] bg-slate-900 border border-slate-800">
      {/* Background Video */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="https://ironbook-blogs.s3.ap-southeast-1.amazonaws.com/assests/website-assests/1536322-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>
      </div>
      
      <div className="relative z-10 p-8 md:p-16 lg:p-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Content */}
          <div className="text-left">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
              Ready to Build <br/>the Future?
            </h2>
            <p className="text-slate-400 max-w-xl mb-10 text-lg leading-relaxed">
              Currently open to roles in Singapore, Thailand, UK, USA, India, Germany or Remote that push the boundaries of Full-stack, AI and Cloud Computing.
            </p>
            
            <div className="space-y-6">
                <a href="mailto:krishnendughosal999@gmail.com" className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors group">
                    <div className="p-3 bg-slate-800 rounded-xl group-hover:bg-indigo-600 transition-all">
                        <Mail className="w-5 h-5" />
                    </div>
                    krishnendughosal999@gmail.com
                </a>
                <div className="flex gap-4">
                    <a href="https://github.com/KriXsh" target="_blank" className="p-4 bg-slate-800 rounded-2xl text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
                        <Github className="w-6 h-6" />
                    </a>
                    <a href="https://www.linkedin.com/in/krish-me" target="_blank" className="p-4 bg-slate-800 rounded-2xl text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
                        <Linkedin className="w-6 h-6" />
                    </a>
                </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-4xl shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Name</label>
                <input required name="name" type="text" placeholder="Your Name" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500 transition-all" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email</label>
                <input required name="email" type="email" placeholder="email@example.com" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500 transition-all" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Message</label>
                <textarea required name="message" rows={4} placeholder="How can I help you?" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500 transition-all resize-none" />
              </div>
              
              <button 
                disabled={status === "loading"}
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50"
              >
                {status === "loading" ? "Sending..." : status === "success" ? "Message Sent!" : "Send Message"}
                <Send className="w-4 h-4" />
              </button>
              
              {status === "error" && <p className="text-red-400 text-xs text-center mt-2">Something went wrong...Contact SES might not be available right now!!..Please send me a Email.</p>}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}