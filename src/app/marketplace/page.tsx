'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Sparkles, ArrowRight } from 'lucide-react';
import { getMarketplaceNotes, Note } from '../../services/noteService';
import dynamic from 'next/dynamic';

// Lazy load marketplace grid
const MarketplaceGrid = dynamic(() => import('../../components/marketplace/MarketplaceGrid'), {
  loading: () => (
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1,2,3,4,5,6].map(i => (
             <div key={i} className="h-80 bg-slate-100 rounded-2xl animate-pulse"></div>
        ))}
     </div>
  ),
  ssr: false
});

export default function Marketplace() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMarketplace = async () => {
      try {
        const publicNotes = await getMarketplaceNotes();
        setNotes(publicNotes);
      } catch (e) {
        console.error("Failed to fetch marketplace", e);
      } finally {
        setLoading(false);
      }
    };
    fetchMarketplace();
  }, []);

  const filteredNotes = notes.filter(note =>
    note.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">

      {/* Hero Header */}
      <div className="bg-white border-b border-slate-200 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
             <div className="absolute -top-[50%] -right-[20%] w-[800px] h-[800px] bg-indigo-50/50 rounded-full blur-3xl"></div>
             <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-purple-50/50 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-16 pb-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/50 border border-amber-200 text-amber-700 text-[10px] font-bold uppercase tracking-widest mb-4">
                 <Sparkles size={12} />
                 <span>Top Rated Notes</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                Discover Knowledge. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Ace Your Exams.</span>
              </h1>
              <p className="text-lg text-slate-500 max-w-lg">
                Access high-quality Cornell notes from top students. Save time and study smarter.
              </p>
            </div>

            <Link href="/dashboard" className="hidden md:flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-800 transition-colors group">
              Go to Dashboard <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-3xl shadow-2xl shadow-indigo-100 rounded-2xl bg-white p-2 flex gap-2 border border-slate-100">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Find notes by topic, course code, or subject..."
                className="w-full pl-12 pr-4 py-3 bg-slate-50/50 hover:bg-slate-100 focus:bg-white rounded-xl focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all text-slate-700 placeholder:text-slate-400 font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="hidden sm:flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              <Filter size={18} />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
         {loading ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[1,2,3,4,5,6].map(i => (
                   <div key={i} className="h-96 bg-slate-200/50 rounded-2xl animate-pulse"></div>
               ))}
           </div>
         ) : (
           <MarketplaceGrid notes={filteredNotes} />
         )}
      </div>
    </div>
  );
}
