'use client';

import React from 'react';
import Link from 'next/link';
import { Note } from '../../services/noteService';
import { ArrowRight, Clock } from 'lucide-react';

interface NoteGridProps {
  notes: Note[];
}

export default function NoteGrid({ notes }: NoteGridProps) {
  if (notes.length === 0) {
    return (
      <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-dashed border-white/60 p-12 text-center shadow-lg">
        <p className="text-slate-600 mb-4 font-medium">You haven't created any notes yet.</p>
        <Link
          href="/editor"
          className="inline-flex items-center gap-2 text-indigo-700 font-bold hover:underline"
        >
          Start your first note <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note, index) => (
        <Link
            key={note.id}
            href={`/editor/${note.id}`}
            className="block group h-full"
            style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 h-full flex flex-col hover:-translate-y-1 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-indigo-50/0 pointer-events-none" />

            <div className="p-6 flex-1 relative z-10">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50/80 px-3 py-1 rounded-full border border-indigo-100">
                  {note.courseCode || "General"}
                </span>
                {note.isPublic && (
                   <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50/80 px-3 py-1 rounded-full border border-emerald-100">
                     Public
                   </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-tight">
                {note.topic || "Untitled Note"}
              </h3>
              <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
                {note.content.metadata.objective || "No objective defined."}
              </p>
            </div>

            <div className="bg-white/50 backdrop-blur-sm px-6 py-4 border-t border-white/60 text-xs font-medium text-slate-400 flex justify-between items-center relative z-10 group-hover:bg-indigo-50/50 transition-colors">
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {new Date(typeof note.createdAt === 'number' ? note.createdAt : (note.createdAt as any).seconds * 1000 || Date.now()).toLocaleDateString()}
              </span>
              <span className="bg-slate-100 px-2 py-1 rounded-md text-slate-500">
                {note.content.rows.length} rows
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
