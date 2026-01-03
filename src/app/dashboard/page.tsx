'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { PlusCircle, Book, ShoppingBag, DollarSign, Activity, Sparkles, X } from 'lucide-react';
import { getUserNotes, Note, createNote } from '../../services/noteService';
import { generateCornellNote } from '../../services/aiService';
import { getPurchasedNotes, MarketplaceNote } from '../../services/marketplaceNoteService';
import { useAuth } from '../../context/AuthContext';
import ProtectedRoute from '../../components/auth/ProtectedRoute';

// Lazy load the NoteGrid component
const NoteGrid = dynamic(() => import('../../components/dashboard/NoteGrid'), {
  loading: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-64 bg-slate-100 rounded-2xl animate-pulse"></div>
      ))}
    </div>
  ),
  ssr: false
});

const MOCK_USER_ID = "test-user-123";

function DashboardContent() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [purchasedNotes, setPurchasedNotes] = useState<MarketplaceNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [topic, setTopic] = useState("");
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchNotes = async () => {
      const userId = user ? user.uid : MOCK_USER_ID;
      try {
        const [userNotes, boughtNotes] = await Promise.all([
          getUserNotes(userId),
          getPurchasedNotes(userId)
        ]);
        setNotes(userNotes);
        setPurchasedNotes(boughtNotes);
      } catch (error) {
        console.error("Failed to fetch notes", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [user]);

  const handleGenerateNote = async () => {
    if (!topic.trim()) return;

    setIsGenerating(true);
    try {
      const noteContent = await generateCornellNote(topic);
      if (noteContent) {
        setShowTopicModal(false);
        setTopic("");
        // Pass generated content to editor via URL params (not saved yet)
        const encodedContent = encodeURIComponent(JSON.stringify(noteContent));
        router.push(`/editor/new?content=${encodedContent}`);
      }
    } catch (error) {
      console.error("Failed to generate note", error);
      alert("Failed to generate note. Please check your AI quota or try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10 space-y-12">

        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 animate-fade-in-up">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">My Dashboard</h1>
            <p className="text-lg text-slate-500">Welcome back, {user?.displayName || user?.email?.split('@')[0] || 'Scholar'}.</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setShowTopicModal(true)}
              className="group flex items-center justify-center gap-3 bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 font-bold"
            >
              <Sparkles size={20} className="text-yellow-300" />
              AI Generate
            </button>
            <Link
              href="/editor"
              className="group flex items-center justify-center gap-3 bg-slate-900 text-white px-6 py-3 rounded-full hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 font-bold"
            >
              <PlusCircle size={20} className="group-hover:rotate-90 transition-transform" />
              Create New Note
            </Link>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="bg-white/60 backdrop-blur-lg p-8 rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex items-center gap-5">
              <div className="bg-linear-to-br from-blue-500 to-cyan-500 p-4 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform">
                <Book size={28} />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Total Notes</p>
                <p className="text-4xl font-black text-slate-800 tracking-tight">{notes.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-lg p-8 rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex items-center gap-5">
              <div className="bg-linear-to-br from-emerald-500 to-teal-500 p-4 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform">
                <ShoppingBag size={28} />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Purchased</p>
                <p className="text-4xl font-black text-slate-800 tracking-tight">{purchasedNotes.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-lg p-8 rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex items-center gap-5">
              <div className="bg-linear-to-br from-violet-500 to-purple-500 p-4 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform">
                <DollarSign size={28} />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Total Sales</p>
                <p className="text-4xl font-black text-slate-800 tracking-tight">$0.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Library Section */}
        <section className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
              <Activity size={20} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Recent Notes</h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-64 bg-slate-200/50 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <NoteGrid notes={notes} />
          )}
        </section>

        {/* Purchased Notes Section */}
        {purchasedNotes.length > 0 && (
          <section className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                <ShoppingBag size={20} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Purchased Notes</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {purchasedNotes.map((note, index) => (
                <Link
                  key={note.id}
                  href={`/marketplace/${note.id}`}
                  className="block group h-full"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 h-full flex flex-col hover:-translate-y-1 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-emerald-50/0 pointer-events-none" />

                    <div className="p-6 flex-1 relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50/80 px-3 py-1 rounded-full border border-emerald-100">
                          {note.courseCode || "General"}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                          Owned
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-tight">
                        {note.topic || "Untitled Note"}
                      </h3>
                      <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
                        {note.content.metadata.objective || "No objective defined."}
                      </p>
                    </div>

                    <div className="bg-white/50 backdrop-blur-sm px-6 py-4 border-t border-white/60 text-xs font-medium text-slate-400 flex justify-between items-center relative z-10 group-hover:bg-emerald-50/50 transition-colors">
                      <span className="flex items-center gap-1">
                        <Activity size={12} />
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
          </section>
        )}
      </div>

      {/* AI Generation Modal */}
      {showTopicModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                  <Sparkles size={20} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Generate Note</h2>
              </div>
              <button
                onClick={() => setShowTopicModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
                disabled={isGenerating}
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  What would you like to learn about?
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Photosynthesis, The French Revolution..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !isGenerating) handleGenerateNote();
                  }}
                />
              </div>

              <button
                onClick={handleGenerateNote}
                disabled={!topic.trim() || isGenerating}
                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Generating Magic...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Generate Cornell Note
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
