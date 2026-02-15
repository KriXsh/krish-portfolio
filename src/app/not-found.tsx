"use client";

import Link from "next/link";
import { MoveLeft, Home, Terminal, AlertCircle } from "lucide-react";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-slate-950 flex items-center justify-center px-6 overflow-hidden relative">
            {/* Background Subtle Tech Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6366f1" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            {/* Animated gradient orbs */}
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="relative z-10 text-center max-w-2xl mx-auto">
                {/* Animated Icon Section */}
                <div className="relative inline-block mb-8">
                    <div className="absolute inset-0 bg-indigo-600/20 blur-3xl rounded-full animate-pulse" />
                    <div className="relative bg-slate-900 border border-slate-800 p-6 rounded-[2.5rem] shadow-2xl animate-bounce duration-3000">
                        <Terminal className="w-16 h-16 text-indigo-400" />
                        <div className="absolute -top-2 -right-2 bg-rose-500 text-white p-1.5 rounded-full shadow-lg">
                            <AlertCircle className="w-4 h-4" />
                        </div>
                    </div>
                </div>

                {/* Error Code */}
                <h1 className="text-[12rem] font-black leading-none tracking-tighter text-white/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
                    404
                </h1>

                {/* Messaging */}
                <div className="relative">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                        System <span className="text-indigo-400">Timeout</span>
                    </h2>
                    <p className="text-lg text-slate-400 font-medium mb-12 max-w-md mx-auto leading-relaxed">
                        The endpoint you are trying to reach does not exist or has been migrated to a new production environment.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-500 hover:text-white transition-all shadow-xl shadow-slate-900/50 group"
                    >
                        <MoveLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Go Back Home
                    </Link>
                    <Link
                        href="/#contact"
                        className="w-full sm:w-auto px-8 py-4 bg-slate-900 border border-slate-800 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:border-indigo-500 hover:text-indigo-400 transition-all"
                    >
                        <Home className="w-4 h-4" />
                        Report Issue
                    </Link>
                </div>

                {/* Bottom Status Bar */}
                <div className="mt-20 pt-8 border-t border-slate-800 flex justify-center gap-12">
                    <div className="text-center">
                        <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest">Error Type</p>
                        <p className="text-white font-bold">ROUTE_NOT_FOUND</p>
                    </div>
                    <div className="text-center">
                        <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest">Status</p>
                        <p className="text-rose-500 font-bold italic underline decoration-rose-500/20">Disconnected</p>
                    </div>
                </div>
            </div>
        </main>
    );
}