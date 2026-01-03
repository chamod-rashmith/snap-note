'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { PlusCircle, Book, ShoppingBag, DollarSign, Activity } from 'lucide-react';
import { getUserNotes, Note } from '../../services/noteService';
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
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchNotes = async () => {
      const userId = user ? user.uid : MOCK_USER_ID;
      try {
        const userNotes = await getUserNotes(userId);
        setNotes(userNotes);
      } catch (error) {
        console.error("Failed to fetch notes", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [user]);

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
          <Link
            href="/editor"
            className="group flex items-center justify-center gap-3 bg-slate-900 text-white px-6 py-3 rounded-full hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 font-bold"
          >
            <PlusCircle size={20} className="group-hover:rotate-90 transition-transform" />
            Create New Note
          </Link>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="bg-white/60 backdrop-blur-lg p-8 rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex items-center gap-5">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform">
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
              <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-4 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform">
                <ShoppingBag size={28} />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Purchased</p>
                <p className="text-4xl font-black text-slate-800 tracking-tight">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-lg p-8 rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex items-center gap-5">
              <div className="bg-gradient-to-br from-violet-500 to-purple-500 p-4 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform">
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
      </div>
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
