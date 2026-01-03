import React from 'react';
import { Edit3, ShoppingBag, BookOpen, Share2, Zap, Layout } from 'lucide-react';

const features = [
  {
    icon: <Layout className="text-blue-600" size={24} />,
    color: "bg-blue-50",
    title: "Cornell Methodology",
    description: "Structured layout with designated Cue, Note, and Summary sections to enhance active recall and retention."
  },
  {
    icon: <Edit3 className="text-indigo-600" size={24} />,
    color: "bg-indigo-50",
    title: "LaTeX Support",
    description: "Write complex math and physics formulas seamlessly using integrated KaTeX support. No more struggling with symbols."
  },
  {
    icon: <ShoppingBag className="text-green-600" size={24} />,
    color: "bg-green-50",
    title: "Marketplace",
    description: "Monetize your hard work. Sell your high-quality notes to students globally or find the perfect study guide."
  },
  {
    icon: <BookOpen className="text-purple-600" size={24} />,
    color: "bg-purple-50",
    title: "Digital Library",
    description: "Your personal knowledge base. Organized, searchable, and accessible from any device, anytime."
  },
  {
    icon: <Zap className="text-amber-600" size={24} />,
    color: "bg-amber-50",
    title: "Instant PDF Export",
    description: "Generate professional, print-ready PDFs with high-contrast layouts optimized for reading and reviewing."
  },
  {
    icon: <Share2 className="text-pink-600" size={24} />,
    color: "bg-pink-50",
    title: "Community",
    description: "Join a growing community of students. Rate notes, leave reviews, and help others succeed."
  }
];

export default function Features() {
  return (
    <section className="py-24 px-6 md:px-12 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                Designed for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">High Achievers</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Everything you need to take better notes, study smarter, and share your knowledge with the world.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative p-8 rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                <div className={`${feature.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 relative z-10">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed relative z-10">
                    {feature.description}
                </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
