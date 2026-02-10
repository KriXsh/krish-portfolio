"use client";

import { useState } from "react";
import Link from "next/link";
import { MoveLeft, Copy, CheckCircle2, QrCode, CreditCard, Sparkles } from "lucide-react";

export default function SupportPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const upiIds = [
    { name: "Paytm / Primary", id: "7908443945@ptyes", color: "from-blue-600 to-indigo-600" },
    { name: "Google Pay (GPay)", id: "krishnendughosal999@oksbi", color: "from-indigo-700 to-indigo-900" }
  ];

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <main className="min-h-screen bg-white py-20 px-6 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#3730a3_1px,transparent_1px)] bg-size-[30px_30px]" />
      </div>

      <div className="relative z-10 max-w-2xl w-full">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-800 font-bold mb-12 transition-all group">
          <MoveLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
        </Link>

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-widest mb-6">
            <Sparkles className="w-3 h-3" /> Fuel the Engineering
          </div>
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter mb-4 leading-tight">
            Buy me a <span className="text-indigo-800 italic">Coffee</span> ☕
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-md mx-auto">
            Your support helps me maintain high-performance servers and continue building high-quality open-source software.
          </p>
        </div>

        <div className="grid gap-6">
          {upiIds.map((upi) => (
            <div key={upi.id} className={`p-1 rounded-[2.5rem] bg-linear-to-br ${upi.color} transition-all hover:scale-[1.02] shadow-xl shadow-indigo-100`}>
              <div className="bg-white rounded-[2.4rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6 text-center md:text-left">
                  <div className={`p-5 rounded-2xl bg-linear-to-br ${upi.color} text-white shadow-lg`}><QrCode className="w-10 h-10" /></div>
                  <div>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{upi.name}</h3>
                    <p className="text-indigo-800 font-mono font-bold text-lg md:text-xl break-all">{upi.id}</p>
                  </div>
                </div>
                <button onClick={() => handleCopy(upi.id)} className="w-full md:w-auto px-8 py-4 bg-slate-900 text-white font-black rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg">
                  {copied === upi.id ? <><CheckCircle2 className="w-4 h-4 text-emerald-400" /> COPIED</> : <><Copy className="w-4 h-4" /> COPY ID</>}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-slate-50 border border-slate-100 rounded-[3rem] flex items-center gap-6">
          <div className="p-4 bg-white rounded-2xl shadow-sm"><CreditCard className="w-6 h-6 text-indigo-800" /></div>
          <p className="text-sm text-slate-500 leading-relaxed font-semibold">
            Scan via <span className="text-slate-900 font-black uppercase">PhonePe, GPay, or Paytm</span> to initiate a secure transaction.
          </p>
        </div>
      </div>
    </main>
  );
}