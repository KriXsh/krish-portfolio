"use client";

import Link from "next/link";
import { MoveLeft, Home, Terminal, AlertCircle } from "lucide-react";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-[#0b0202] flex items-center justify-center px-6 overflow-hidden relative">
            {/* Background Subtle Tech Grid */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(220, 38, 38, 0.15)" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            {/* Animated gradient orbs (Red) */}
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-red-800/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="relative z-10 text-center max-w-2xl mx-auto">
                {/* Animated Icon Section */}
                <div className="relative inline-block mb-8">
                    <div className="absolute inset-0 bg-red-600/20 blur-3xl rounded-full animate-pulse" />
                    <div className="relative bg-[#160505] border border-red-900/30 p-6 rounded-[2.5rem] shadow-[0_0_40px_rgba(220,38,38,0.1)] animate-bounce duration-3000">
                        <Terminal className="w-16 h-16 text-red-600" />
                        <div className="absolute -top-2 -right-2 bg-red-700 text-white p-1.5 rounded-full shadow-lg border border-red-400/30">
                            <AlertCircle className="w-4 h-4" />
                        </div>
                    </div>
                </div>

                {/* Error Code */}
                <h1 className="text-[12rem] font-black leading-none tracking-tighter text-red-600/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
                    404
                </h1>

                {/* Messaging */}
                <div className="relative">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase italic">
                        System <span className="text-red-600">Timeout</span>
                    </h2>
                    <p className="text-sm text-[#94a3b8] font-tech mb-12 max-w-md mx-auto leading-relaxed">
                        The endpoint you are trying to reach does not exist or has been migrated to a new production environment.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="w-full sm:w-auto px-8 py-4 bg-red-600 text-white font-black uppercase tracking-widest text-xs border border-red-500 rounded-none flex items-center justify-center gap-2 hover:bg-red-700 transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)] group"
                    >
                        <MoveLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Return to Hub
                    </Link>
                    <Link
                        href="/#contact"
                        className="w-full sm:w-auto px-8 py-4 bg-[#0f0404] border border-red-900/40 text-red-500 font-black uppercase tracking-widest text-xs rounded-none flex items-center justify-center gap-2 hover:border-red-600 hover:text-red-400 hover:bg-red-900/20 transition-all"
                    >
                        <Home className="w-4 h-4" />
                        Report Issue
                    </Link>
                </div>

                {/* Bottom Status Bar */}
                <div className="mt-20 pt-8 border-t border-red-900/30 flex justify-center gap-12">
                    <div className="text-center">
                        <p className="text-red-600/60 text-[10px] uppercase font-black tracking-widest mb-1">Error Type</p>
                        <p className="text-white font-tech text-xs tracking-wider">ROUTE_NOT_FOUND</p>
                    </div>
                    <div className="text-center">
                        <p className="text-red-600/60 text-[10px] uppercase font-black tracking-widest mb-1">Status</p>
                        <p className="text-red-500 font-tech text-xs italic underline decoration-red-500/20 tracking-wider animate-pulse">Disconnected</p>
                    </div>
                </div>
            </div>
        </main>
    );
}