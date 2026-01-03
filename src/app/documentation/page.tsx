import React from 'react';
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import Link from 'next/link';
import { BookOpen, Edit3, Layout, ShoppingBag, Printer, ArrowRight, Share2, FileText, CheckCircle, Sigma } from 'lucide-react';

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-32 pb-16 px-6 relative overflow-hidden bg-white border-b border-slate-200">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-50/50 rounded-full blur-3xl -z-10 opacity-60"></div>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 font-medium text-xs uppercase tracking-wider mb-6">
            <BookOpen size={14} /> Documentation
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-6">
            Master <span className="text-indigo-600">CornellNotes+</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know to create effective study notes, manage your library, and share knowledge with the world.
          </p>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Sidebar Navigation (Hidden on mobile) */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-28 h-fit space-y-8">
          <div>
            <h5 className="font-bold text-slate-900 mb-4 px-3">Getting Started</h5>
            <nav className="space-y-1">
              <a href="#introduction" className="block px-3 py-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors text-sm font-medium">Introduction</a>
              <a href="#quick-start" className="block px-3 py-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors text-sm font-medium">Quick Start</a>
            </nav>
          </div>
          <div>
            <h5 className="font-bold text-slate-900 mb-4 px-3">Features</h5>
            <nav className="space-y-1">
              <a href="#editor" className="block px-3 py-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors text-sm font-medium">The Editor</a>
              <a href="#math-formulas" className="block px-3 py-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors text-sm font-medium">Math Formulas</a>
              <a href="#dashboard" className="block px-3 py-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors text-sm font-medium">Dashboard</a>
              <a href="#marketplace" className="block px-3 py-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors text-sm font-medium">Marketplace</a>
              <a href="#printing" className="block px-3 py-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors text-sm font-medium">Printing</a>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-9 space-y-16">

          {/* Introduction */}
          <section id="introduction" className="scroll-mt-28">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <span className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><BookOpen size={24} /></span>
              Introduction
            </h2>
            <div className="prose prose-slate max-w-none text-slate-600">
              <p className="text-lg leading-relaxed mb-4">
                CornellNotes+ is a modern web application designed to digitize the proven Cornell Note-Taking System.
                Whether you are a student, researcher, or professional, our platform helps you structure your knowledge efficiently.
              </p>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm my-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">The Cornell Method</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="text-indigo-600 font-bold block mb-2 text-sm uppercase">Left Column</span>
                    <h4 className="font-bold text-slate-900 mb-2">Cues</h4>
                    <p className="text-sm">Keywords, questions, and main ideas that trigger memory recall.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="text-indigo-600 font-bold block mb-2 text-sm uppercase">Right Column</span>
                    <h4 className="font-bold text-slate-900 mb-2">Notes</h4>
                    <p className="text-sm">Detailed notes, diagrams, formulas, and explanations.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 md:col-span-3">
                    <span className="text-indigo-600 font-bold block mb-2 text-sm uppercase">Bottom Row</span>
                    <h4 className="font-bold text-slate-900 mb-2">Summary</h4>
                    <p className="text-sm">A brief summary of the entire page to synthesize understanding.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Start */}
          <section id="quick-start" className="scroll-mt-28">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <span className="p-2 bg-green-100 text-green-600 rounded-lg"><CheckCircle size={24} /></span>
              Quick Start Guide
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-start bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1">Sign Up</h3>
                  <p className="text-slate-600">Create an account to save your notes privately. We use secure authentication so your data is safe.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1">Create a Note</h3>
                  <p className="text-slate-600">Navigate to the Editor and start typing. Use the cue column for questions and the note area for details.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1">Review & Save</h3>
                  <p className="text-slate-600">Your notes are automatically saved. You can access them anytime from your Dashboard.</p>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-slate-200" />

          {/* Editor */}
          <section id="editor" className="scroll-mt-28">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <span className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Edit3 size={24} /></span>
              Using the Editor
            </h2>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-lg mb-6">
               <div className="bg-slate-100 p-4 border-b border-slate-200 flex items-center gap-2">
                 <div className="flex gap-1.5">
                   <div className="w-3 h-3 rounded-full bg-red-400"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                   <div className="w-3 h-3 rounded-full bg-green-400"></div>
                 </div>
                 <div className="ml-4 px-3 py-1 bg-white rounded-md text-xs text-slate-500 font-mono flex-1 text-center">Editor Preview</div>
               </div>
               <div className="p-8 bg-slate-50">
                 <div className="bg-white shadow-xl rounded-sm aspect-[1.414/1] w-full max-w-lg mx-auto relative flex flex-col p-8 border border-slate-200">
                    <div className="flex-1 flex gap-4">
                        <div className="w-[30%] border-r border-red-200 pr-2">
                             <div className="h-4 bg-slate-100 rounded w-3/4 mb-2"></div>
                             <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                        </div>
                        <div className="flex-1">
                             <div className="h-4 bg-slate-100 rounded w-full mb-2"></div>
                             <div className="h-4 bg-slate-100 rounded w-full mb-2"></div>
                             <div className="h-4 bg-slate-100 rounded w-5/6 mb-2"></div>
                        </div>
                    </div>
                    <div className="h-[15%] border-t border-slate-900 mt-4 pt-2">
                        <div className="h-4 bg-slate-100 rounded w-full"></div>
                    </div>
                 </div>
               </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="font-bold text-slate-900 text-xl mb-3">Rich Text & Math</h3>
                    <p className="text-slate-600 mb-4">
                        The editor supports rich text formatting. You can also write mathematical formulas using LaTeX syntax, powered by KaTeX.
                        Perfect for physics and math students.
                    </p>
                    <ul className="space-y-2 text-slate-600 text-sm">
                        <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 mt-0.5" /> <strong>Bold, Italic, Lists</strong> supported</li>
                        <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 mt-0.5" /> <strong>Inline Math:</strong> $E = mc^2$</li>
                        <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 mt-0.5" /> <strong>Code Blocks</strong> for developers</li>
                    </ul>
                </div>
                 <div>
                    <h3 className="font-bold text-slate-900 text-xl mb-3">Organization</h3>
                    <p className="text-slate-600 mb-4">
                        Tag your notes with relevant topics (e.g., #Physics, #History) to easily find them later in your dashboard.
                    </p>
                </div>
            </div>
          </section>

          {/* Math Formulas */}
          <section id="math-formulas" className="scroll-mt-28">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <span className="p-2 bg-pink-100 text-pink-600 rounded-lg"><Sigma size={24} /></span>
              Mathematical Formulas (KaTeX)
            </h2>
            <div className="prose prose-slate max-w-none text-slate-600">
              <p className="text-lg leading-relaxed mb-4">
                The editor is powered by KaTeX, a fast and robust library for rendering mathematical formulas.
                You can write inline math using <code>$E=mc^2$</code> and block math using <code>$$...$$</code>.
              </p>

              <div className="space-y-8 mt-8">

                {/* Greek Letters */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 text-lg mb-4">Greek Letters</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-mono text-slate-700">
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\alpha</span> <span>α</span></div>
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\beta</span> <span>β</span></div>
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\gamma</span> <span>γ</span></div>
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\delta</span> <span>δ</span></div>
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\epsilon</span> <span>ϵ</span></div>
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\theta</span> <span>θ</span></div>
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\lambda</span> <span>λ</span></div>
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\pi</span> <span>π</span></div>
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\sigma</span> <span>σ</span></div>
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\phi</span> <span>ϕ</span></div>
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\omega</span> <span>ω</span></div>
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\Delta</span> <span>Δ</span></div>
                  </div>
                </div>

                {/* Common Operators & Relations */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 text-lg mb-4">Operators & Relations</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-mono text-slate-700">
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\sum</span> <span>∑</span></div>
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\prod</span> <span>∏</span></div>
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\int</span> <span>∫</span></div>
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\infty</span> <span>∞</span></div>
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\approx</span> <span>≈</span></div>
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\neq</span> <span>≠</span></div>
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\leq</span> <span>≤</span></div>
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\geq</span> <span>≥</span></div>
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\times</span> <span>×</span></div>
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\div</span> <span>÷</span></div>
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\pm</span> <span>±</span></div>
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\cdot</span> <span>·</span></div>
                  </div>
                </div>

                {/* Logic & Set Theory */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 text-lg mb-4">Logic & Set Theory</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-mono text-slate-700">
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\forall</span> <span>∀</span></div>
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\exists</span> <span>∃</span></div>
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\in</span> <span>∈</span></div>
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\notin</span> <span>∉</span></div>
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\subset</span> <span>⊂</span></div>
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\cup</span> <span>∪</span></div>
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\cap</span> <span>∩</span></div>
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\to</span> <span>→</span></div>
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\implies</span> <span>⟹</span></div>
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\iff</span> <span>⟺</span></div>
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\neg</span> <span>¬</span></div>
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>\emptyset</span> <span>∅</span></div>
                  </div>
                </div>

                {/* Fractions, Roots & Matrices */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 text-lg mb-4">Structures</h3>
                  <div className="space-y-4 text-sm text-slate-700">
                    <div className="border-b border-slate-100 pb-3">
                      <span className="font-mono text-indigo-600 block mb-1">\frac{'{'}a{'}'}{'{'}b{'}'}</span>
                      <span>Fractions</span>
                    </div>
                    <div className="border-b border-slate-100 pb-3">
                      <span className="font-mono text-indigo-600 block mb-1">\sqrt{'{'}x{'}'}</span>
                      <span>Square root</span>
                    </div>
                    <div className="border-b border-slate-100 pb-3">
                      <span className="font-mono text-indigo-600 block mb-1">x^{2}</span>
                      <span>Superscript (Power)</span>
                    </div>
                    <div className="border-b border-slate-100 pb-3">
                      <span className="font-mono text-indigo-600 block mb-1">x_{'{'}i{'}'}</span>
                      <span>Subscript</span>
                    </div>
                    <div>
                      <span className="font-mono text-indigo-600 block mb-1">
                        \begin{'{'}matrix{'}'} a & b \\ c & d \end{'{'}matrix{'}'}
                      </span>
                      <span>Matrix environment (use <code>pmatrix</code> for brackets)</span>
                    </div>
                  </div>
                </div>

              </div>
              <p className="mt-6 text-sm text-slate-500">
                For a complete list of supported functions, visit the <a href="https://katex.org/docs/supported.html" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">KaTeX Documentation</a>.
              </p>
            </div>
          </section>

          {/* Dashboard */}
          <section id="dashboard" className="scroll-mt-28">
             <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <span className="p-2 bg-purple-100 text-purple-600 rounded-lg"><Layout size={24} /></span>
              Dashboard & Library
            </h2>
            <p className="text-lg text-slate-600 mb-6">
                Your personal library where all your notes live. Access your private collection, filter by tags, or continue working on drafts.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <FileText className="text-indigo-600 mb-4" size={32} />
                    <h3 className="font-bold text-slate-900 mb-2">My Notes</h3>
                    <p className="text-slate-600 text-sm">View all notes you have created. They are private by default.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <Share2 className="text-indigo-600 mb-4" size={32} />
                    <h3 className="font-bold text-slate-900 mb-2">Publishing</h3>
                    <p className="text-slate-600 text-sm">Admins can publish high-quality notes to the Marketplace for everyone to see.</p>
                </div>
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <ShoppingBag className="text-indigo-600 mb-4" size={32} />
                    <h3 className="font-bold text-slate-900 mb-2">Purchases</h3>
                    <p className="text-slate-600 text-sm">Access notes you have acquired from the Marketplace.</p>
                </div>
            </div>
          </section>

          {/* Marketplace */}
          <section id="marketplace" className="scroll-mt-28">
             <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <span className="p-2 bg-orange-100 text-orange-600 rounded-lg"><ShoppingBag size={24} /></span>
              Marketplace
            </h2>
             <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-8 rounded-2xl border border-orange-100">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Discover Knowledge</h3>
                        <p className="text-slate-700 mb-6">
                            The Marketplace is a curated collection of high-quality notes from top students and educators.
                            Browse by subject, popularity, or recent additions.
                        </p>
                        <Link href="/marketplace" className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-full font-medium hover:bg-orange-700 transition-colors shadow-lg shadow-orange-500/20">
                            Browse Marketplace <ArrowRight size={18} />
                        </Link>
                    </div>
                    <div className="w-full md:w-1/3 bg-white p-4 rounded-xl shadow-lg rotate-3 border border-slate-100">
                        <div className="h-32 bg-slate-100 rounded-lg mb-4 animate-pulse"></div>
                        <div className="h-4 bg-slate-100 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                    </div>
                </div>
             </div>
          </section>

          {/* Printing */}
          <section id="printing" className="scroll-mt-28">
             <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <span className="p-2 bg-slate-100 text-slate-600 rounded-lg"><Printer size={24} /></span>
              Printing Notes
            </h2>
            <div className="prose prose-slate max-w-none text-slate-600">
                <p>
                    Sometimes you need physical paper. CornellNotes+ includes a dedicated print stylesheet designed to save ink and look professional.
                </p>
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm">
                    <strong>Tip:</strong> Use the browser's print function (Cmd+P or Ctrl+P) while in the Editor.
                    The layout will automatically adjust to a clean, black-and-white format suitable for printing on standard A4 or Letter paper.
                </div>
            </div>
          </section>

        </main>
      </div>

      <Footer />
    </div>
  );
}
