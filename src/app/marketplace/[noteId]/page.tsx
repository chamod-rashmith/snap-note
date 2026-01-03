'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPublicNote, Note } from '../../../services/noteService';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Lock } from 'lucide-react';
import MathPreview from '../../../components/editor/MathPreview';

export default function PublicNotePage() {
  const { noteId } = useParams();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchased, setPurchased] = useState(false); // Mock purchase state

  useEffect(() => {
    const fetchNote = async () => {
      if (typeof noteId !== 'string') return;
      try {
        const fetchedNote = await getPublicNote(noteId);
        setNote(fetchedNote);
      } catch (e) {
        console.error("Error fetching note", e);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [noteId]);

  const handleBuy = () => {
    // Mock purchase flow
    if (confirm(`Purchase this note for ${note?.price ? '$' + note.price : 'Free'}?`)) {
      setPurchased(true);
      alert("Purchase successful! (Mock)");
    }
  };

  if (loading) return <div className="p-12 text-center text-slate-500">Loading preview...</div>;
  if (!note) return <div className="p-12 text-center text-slate-500">Note not found.</div>;

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/marketplace" className="flex items-center text-sm text-slate-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft size={16} className="mr-1" /> Back to Marketplace
          </Link>

          <button
            onClick={handleBuy}
            disabled={purchased}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold shadow-sm transition-colors ${
              purchased
              ? 'bg-green-100 text-green-700 cursor-default'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {purchased ? (
              <span>Owned</span>
            ) : (
              <>
                <ShoppingCart size={18} />
                {note.price && note.price > 0 ? `Buy for $${note.price}` : 'Get for Free'}
              </>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-8 px-4">
        {/* Note Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                {note.courseCode || "General"}
              </span>
              <h1 className="text-3xl font-bold text-slate-900 mt-2">{note.topic}</h1>
              <p className="text-slate-500 mt-1">By User {note.ownerId.substring(0,6)}...</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400 uppercase font-bold tracking-wider">Price</p>
              <p className="text-2xl font-bold text-slate-800">
                {note.price && note.price > 0 ? `$${note.price.toFixed(2)}` : 'FREE'}
              </p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            <h3 className="text-sm font-bold uppercase text-slate-400 tracking-wider mb-1">Learning Objective</h3>
            <p className="text-slate-700 bg-slate-50 p-4 rounded-lg italic">
              {note.content.metadata.objective || "No objective defined."}
            </p>
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden relative">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
             <h2 className="font-bold text-slate-700">Preview</h2>
             {!purchased && (
               <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-100 flex items-center gap-1">
                 <Lock size={12} /> Limited View
               </span>
             )}
          </div>

          <div className={`p-8 ${!purchased ? 'relative' : ''}`}>
             {/* We show the first 2 rows, then blur the rest if not purchased */}
             <div className="space-y-8">
               {note.content.rows.slice(0, purchased ? undefined : 2).map((row, i) => (
                 <div key={i} className="flex flex-col md:flex-row gap-6 border-b border-slate-100 pb-6 last:border-0">
                    <div className="w-full md:w-1/3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Cue / Question</h4>
                      <MathPreview content={row.cue} className="text-indigo-800 font-medium" />
                    </div>
                    <div className="w-full md:w-2/3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Notes</h4>
                      <MathPreview content={row.note} className="text-slate-700" />
                    </div>
                 </div>
               ))}
             </div>

             {/* Blur Overlay if not purchased */}
             {!purchased && note.content.rows.length > 2 && (
               <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white via-white/90 to-transparent flex items-center justify-center">
                 <div className="text-center p-6">
                   <Lock size={48} className="mx-auto text-slate-300 mb-4" />
                   <h3 className="text-xl font-bold text-slate-800 mb-2">Purchase to Unlock Full Note</h3>
                   <button
                     onClick={handleBuy}
                     className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 transition-transform hover:-translate-y-0.5"
                   >
                     Buy Now for {note.price && note.price > 0 ? `$${note.price}` : 'Free'}
                   </button>
                 </div>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
