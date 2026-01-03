import React from 'react';
import { FileText, Calculator, Atom } from 'lucide-react';

export default function HeroVisual() {
  return (
    <div className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center perspective-1000">
      {/* Abstract Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Floating Glass Cards representing Notes */}
      <div className="relative z-10 grid grid-cols-1 gap-6 transition-transform duration-700 hover:rotate-0" style={{ transformStyle: 'preserve-3d', transform: 'rotateY(-12deg) rotateX(6deg)' }}>

        {/* Card 1: Math */}
        <div className="glass-card p-6 rounded-2xl border border-white/20 shadow-2xl backdrop-blur-md bg-white/10 text-white w-64 transform translate-x-12 hover:scale-105 transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-indigo-500/50 rounded-lg">
                <Calculator size={20} className="text-white" />
            </div>
            <h3 className="font-bold text-lg">Calculus II</h3>
          </div>
          <p className="text-xs text-indigo-100 mb-3 line-clamp-2">
            Integration techniques, sequences, and series. Comprehensive review for final exam.
          </p>
          <div className="flex items-center gap-2 text-xs text-indigo-200">
            <div className="h-1.5 flex-1 bg-indigo-900/30 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-400 w-[85%] rounded-full"></div>
            </div>
            <span>85%</span>
          </div>
        </div>

        {/* Card 2: Physics */}
        <div className="glass-card p-6 rounded-2xl border border-white/20 shadow-2xl backdrop-blur-md bg-white/10 text-white w-64 -translate-x-4 hover:scale-105 transition-all duration-300 z-20">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-500/50 rounded-lg">
                <Atom size={20} className="text-white" />
            </div>
            <h3 className="font-bold text-lg">Quantum Phys</h3>
          </div>
          <p className="text-xs text-purple-100 mb-3 line-clamp-2">
            Wave-particle duality, uncertainty principle, and Schrödinger equation.
          </p>
          <div className="flex items-center justify-between text-xs text-purple-200 mt-2">
            <span className="bg-purple-500/30 px-2 py-0.5 rounded text-white">$4.99</span>
            <span>⭐ 4.8</span>
          </div>
        </div>

        {/* Card 3: General */}
        <div className="glass-card p-6 rounded-2xl border border-white/20 shadow-2xl backdrop-blur-md bg-white/10 text-white w-64 translate-x-8 hover:scale-105 transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-pink-500/50 rounded-lg">
                <FileText size={20} className="text-white" />
            </div>
            <h3 className="font-bold text-lg">History 101</h3>
          </div>
          <p className="text-xs text-pink-100 mb-3 line-clamp-2">
            The Industrial Revolution and its impact on modern society.
          </p>
        </div>

      </div>
    </div>
  );
}
