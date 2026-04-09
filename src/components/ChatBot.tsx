"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Loader2, Terminal } from "lucide-react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [messages, setMessages] = useState([
    { id: "1", sender: "ai", text: "System Online. I am the AI Proxy. How can I assist your inquiry today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", { 
        method: "POST",
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { id: "ai-"+Date.now(), sender: "ai", text: data.response }]);
    } catch (err) {
      setMessages(prev => [...prev, { id: "err", sender: "ai", text: "Connection Timeout. Mainframe unreachable." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end font-mono">
      
      {/* Tooltip Indicator - Helps user understand it's a Chatbot */}
      {!isOpen && showTooltip && (
        <div className="mb-2 mr-2 bg-red-600 text-black text-[10px] px-2 py-1 font-bold uppercase tracking-tighter animate-bounce">
          AI Link Active _
        </div>
      )}

      {/* Chat Window */}
      <div 
        className={`flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] mb-4 w-[350px] max-w-[90vw] h-[500px] border border-red-600/50 bg-black/90 backdrop-blur-xl shadow-[0_0_40px_rgba(220,38,38,0.15)] ${
          isOpen 
            ? "opacity-100 translate-y-0 pointer-events-auto visible" 
            : "opacity-0 translate-y-10 pointer-events-none invisible"
        }`}
      >
        {/* Animated Scanner Line Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
            <div className="w-full h-[2px] bg-red-500 animate-scan" />
        </div>

        {/* Header */}
        <div className="p-4 border-b border-red-600/30 bg-red-950/20 flex justify-between items-center relative overflow-hidden">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-red-500" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-red-500">Proxy Terminal v1.0</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="hover:rotate-90 transition-transform text-red-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages Area */}
        <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-red-900 scrollbar-track-transparent"
        >
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`relative p-3 text-[12px] max-w-[85%] leading-relaxed border ${
                msg.sender === "user" 
                ? "bg-red-600/10 text-red-100 border-red-600/40" 
                : "bg-white/5 text-slate-400 border-white/10"
              }`}>
                {/* Visual Corner Accents for AI messages */}
                {msg.sender === "ai" && (
                    <div className="absolute -top-[1px] -left-[1px] w-1 h-1 bg-red-600" />
                )}
                <span className="relative z-10">{msg.text}</span>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
               <div className="p-3 bg-red-600/5 border border-red-600/20 flex items-center gap-2">
                 <Loader2 className="w-3 h-3 animate-spin text-red-600" />
                 <span className="text-[10px] text-red-600 uppercase animate-pulse">Decrypting...</span>
               </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-3 bg-black border-t border-red-600/30 flex gap-2 items-center">
          <div className="text-red-600 text-xs font-bold animate-pulse">{'>'}</div>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setShowTooltip(false)}
            placeholder="ENTER COMMAND..."
            className="flex-1 bg-transparent text-xs text-red-500 placeholder:text-red-900 outline-none uppercase tracking-widest"
          />
          <button 
            type="submit" 
            disabled={!input.trim() || loading}
            className="text-red-600 hover:text-red-400 disabled:opacity-30 transition-all"
          >
            <Send size={16} />
          </button>
        </form>
      </div>

      {/* Main Trigger Button */}
      <button 
        onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
        }}
        className={`group relative w-14 h-14 bg-black border-2 transition-all duration-300 flex items-center justify-center overflow-hidden ${
            isOpen ? "border-red-500 rotate-90" : "border-red-600 hover:scale-110 shadow-[0_0_15px_rgba(220,38,38,0.3)]"
        }`}
      >
        {/* Glow Effect Background */}
        <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {isOpen ? (
            <X size={24} className="text-red-500" />
        ) : (
            <MessageSquare size={24} className="text-red-500 group-hover:animate-pulse" />
        )}
      </button>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(500px); }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </div>
  );
}