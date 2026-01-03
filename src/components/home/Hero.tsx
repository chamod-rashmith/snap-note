'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import dynamic from 'next/dynamic';

// Lazy load the visual component ("heavy" part)
const HeroVisual = dynamic(() => import('./HeroVisual'), {
  loading: () => (
    <div className="w-full h-[400px] md:h-[600px] flex items-center justify-center">
        <div className="w-72 h-72 bg-slate-200/50 rounded-full animate-pulse filter blur-xl"></div>
    </div>
  ),
  ssr: false // Client-side interaction/animation mostly
});

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <div className="relative z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in-up">
                <Star size={12} fill="currentColor" />
                <span>v2.0 Now Available</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1]">
                Master Your Studies <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    Share Your Knowledge
                </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                The ultimate platform for Cornell-style notes. Specialized for Math & Physics with built-in LaTeX. Join thousands of students buying and selling high-quality notes today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                    href="/editor"
                    className="flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                    Start Taking Notes
                    <ArrowRight size={20} />
                </Link>
                <Link
                    href="/marketplace"
                    className="flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-1"
                >
                    Explore Marketplace
                </Link>
            </div>

            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-slate-400">
                <div className="flex -space-x-4">
                     {[1,2,3,4].map(i => (
                         <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-bold overflow-hidden bg-cover bg-center`} style={{backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 10})`}}></div>
                     ))}
                     <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">+2k</div>
                </div>
                <div className="text-sm font-medium">
                    <div className="text-slate-900 font-bold">Trusted by Students</div>
                    <div>from top universities</div>
                </div>
            </div>
        </div>

        {/* Right Visual (Lazy Loaded) */}
        <div className="relative z-10 lg:h-auto">
             <HeroVisual />
        </div>
      </div>
    </section>
  );
}
