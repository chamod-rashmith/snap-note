'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Calendar } from 'lucide-react';
import { MarketplaceNote, formatPrice } from '../../services/marketplaceNoteService';

interface MarketplaceGridProps {
  notes: MarketplaceNote[];
}

export default function MarketplaceGrid({ notes }: MarketplaceGridProps) {
  if (notes.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 bg-slate-100 rounded-full mx-auto mb-6 flex items-center justify-center">
          <ShoppingCart className="text-slate-300" size={40} />
        </div>
        <h3 className="text-xl font-bold text-slate-700 mb-2">No notes found</h3>
        <p className="text-slate-500">Check back soon for new study materials!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {notes.map((note, index) => (
        <Link
          key={note.id}
          href={`/marketplace/${note.id}`}
          className="block group h-full"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 h-full flex flex-col hover:-translate-y-1 relative group">
            {/* Gradient Accent */}
            <div className="h-2 w-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="p-8 flex-1">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  {note.courseCode || "General"}
                </span>
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${note.price && note.price > 0 ? 'bg-slate-900 text-white' : 'bg-emerald-100 text-emerald-700'}`}>
                  {formatPrice(note.price, note.currency)}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all">
                {note.topic}
              </h3>

              <p className="text-sm text-slate-500 line-clamp-3 mb-6 leading-relaxed">
                {note.content.metadata.objective || note.content.summary || "No description available."}
              </p>

              <div className="flex items-center gap-4 text-xs font-medium text-slate-400 border-t border-slate-50 pt-4">
                <div className="flex items-center gap-1">
                  <User size={14} />
                  <span>SnapNote</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{new Date(typeof note.createdAt === 'number' ? note.createdAt : (note.createdAt as { seconds: number }).seconds * 1000 || Date.now()).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 group-hover:bg-indigo-50/30 transition-colors flex justify-center">
              <button className="w-full bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-bold text-sm shadow-sm group-hover:bg-indigo-600 group-hover:text-white group-hover:border-transparent transition-all flex items-center justify-center gap-2">
                <ShoppingCart size={16} />
                {note.price && note.price > 0 ? 'Purchase Note' : 'Get for Free'}
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
