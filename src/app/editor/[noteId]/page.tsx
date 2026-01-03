'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import CornellEditor, { CornellEditorHandle } from '../../../components/editor/CornellEditor';
import { getNote, saveNote, publishNoteToMarketplace, getPublicNote, NoteContent, Note } from '../../../services/noteService';
import { useAuth } from '../../../context/AuthContext';
import Link from 'next/link';
import { ArrowLeft, Globe, Lock, Loader2, FileQuestion, AlertCircle, Printer } from 'lucide-react';

const MOCK_USER_ID = "test-user-123";

export default function EditNotePage() {
  const { noteId } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  // TODO: Replace with real admin check
  const isAdmin = true; // temporary for testing
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Marketplace Price State
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [price, setPrice] = useState(0);

  const editorRef = useRef<CornellEditorHandle>(null);

  useEffect(() => {
    const fetchNote = async () => {
      if (typeof noteId !== 'string') return;

      const userId = user?.uid || MOCK_USER_ID;
      try {
        // 1. Try to fetch as a public note first (no auth required)
        let fetchedNote = await getPublicNote(noteId);

        // 2. If not found or private, try fetching as a user note
        if (!fetchedNote) {
          fetchedNote = await getNote(userId, noteId);
        }

        if (fetchedNote) {
          setNote(fetchedNote);
          if (fetchedNote.price) setPrice(fetchedNote.price);
        } else {
          setNote(null);
        }
      } catch (e) {
        console.error("Error fetching note", e);
        setError("Failed to load note.");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [noteId, user]);

  const handleSave = async (content: NoteContent) => {
    if (!note) return;
    setSaving(true);
    const userId = user?.uid || MOCK_USER_ID;

    const updatedNote: Note = {
      ...note,
      topic: content.metadata.topic,
      courseCode: content.metadata.course,
      content: content
    };

    try {
      await saveNote(userId, updatedNote);
      setNote(updatedNote);
    } catch (e) {
      console.error("Error saving note", e);
      alert("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!note) return;
    setPublishing(true);
    try {
      const updatedNote = { ...note, isPublic: true, price };
      await publishNoteToMarketplace(updatedNote, price);
      setNote(updatedNote);
      setShowPublishModal(false);
      alert("Note published to marketplace!");
    } catch (e) {
      console.error("Error publishing", e);
      alert("Failed to publish");
    } finally {
      setPublishing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 space-y-4">
        <Loader2 size={40} className="animate-spin text-indigo-600" />
        <p className="text-slate-500 font-medium">Loading your note...</p>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 p-8 text-center space-y-6">
        <div className="bg-white p-6 rounded-full shadow-lg">
          {error ? <AlertCircle size={48} className="text-rose-500" /> : <FileQuestion size={48} className="text-slate-400" />}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">{error ? "Something went wrong" : "Note Not Found"}</h1>
          <p className="text-slate-500 max-w-md mx-auto mb-8">
            {error || "The note you are looking for does not exist or you do not have permission to view it."}
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all font-bold"
          >
            <ArrowLeft size={18} /> Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Glassy Sticky Header */}
      <div className="sticky top-0 z-40 bg-slate-100/80 backdrop-blur-md border-b border-white/20 px-4 py-3 flex justify-between items-center print:hidden shadow-sm">
        <Link href="/dashboard" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-indigo-600 transition-colors bg-white/50 hover:bg-white px-3 py-2 rounded-lg border border-transparent hover:border-indigo-100">
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => editorRef.current?.triggerPrint()}
            className="flex items-center text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-white/50 hover:bg-white px-3 py-1.5 rounded-lg border border-slate-200/50 hover:border-indigo-200 transition-all hover:text-indigo-600 hover:shadow-sm"
            title="Export as PDF"
          >
            <Printer size={12} className="mr-1.5" /> Export PDF
          </button>

          {note.isPublic ? (
            <span className="flex items-center text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
              <Globe size={12} className="mr-1.5" /> Public ($ {note.price})
            </span>
          ) : (
            isAdmin && (
              <button
                onClick={() => setShowPublishModal(true)}
                className="flex items-center text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-white/50 hover:bg-white px-3 py-1.5 rounded-lg border border-slate-200/50 hover:border-indigo-200 transition-all hover:text-indigo-600 hover:shadow-sm"
              >
                <Lock size={12} className="mr-1.5" /> Private - Publish?
              </button>
            )
          )}
        </div>
      </div>

      <div className="pb-24">
        <CornellEditor
          ref={editorRef}
          initialData={note}
          onSave={handleSave}
          isSaving={saving}
        />
      </div>

      {/* Publish Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all scale-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Publish to Marketplace</h2>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed">
              Make your note available for other students to purchase. You can set a price or make it free.
            </p>

            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Price ($)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value))}
                  className="w-full pl-8 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg font-bold text-slate-900 transition-all"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowPublishModal(false)}
                className="px-6 py-3 text-slate-600 font-bold text-sm hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePublish}
                disabled={publishing}
                className="px-6 py-3 bg-indigo-600 text-white font-bold text-sm rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-200"
              >
                {publishing ? "Publishing..." : "Confirm & Publish"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
