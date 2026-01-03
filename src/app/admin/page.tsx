'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import ProtectedRoute from '../../components/auth/ProtectedRoute';
import {
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  DollarSign,
  Loader2,
  BookOpen,
  Store
} from 'lucide-react';
import {
  MarketplaceNote,
  MarketplaceNoteContent,
  createMarketplaceNote,
  getMarketplaceNotes,
  deleteMarketplaceNote,
  updateMarketplaceNote,
  formatPrice,
} from '../../services/marketplaceNoteService';

interface NoteFormData {
  topic: string;
  courseCode: string;
  objective: string;
  price: number;
  currency: 'USD' | 'LKR';
  rows: { id: string; cue: string; note: string }[];
  summary: string;
}

const emptyFormData: NoteFormData = {
  topic: '',
  courseCode: '',
  objective: '',
  price: 0,
  currency: 'USD',
  rows: [{ id: '1', cue: '', note: '' }],
  summary: '',
};

function AdminContent() {
  const { user } = useAuth();
  const [notes, setNotes] = useState<MarketplaceNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<NoteFormData>(emptyFormData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const fetchedNotes = await getMarketplaceNotes();
      setNotes(fetchedNotes);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRow = () => {
    setFormData(prev => ({
      ...prev,
      rows: [...prev.rows, { id: Date.now().toString(), cue: '', note: '' }]
    }));
  };

  const handleRemoveRow = (id: string) => {
    setFormData(prev => ({
      ...prev,
      rows: prev.rows.filter(row => row.id !== id)
    }));
  };

  const handleRowChange = (id: string, field: 'cue' | 'note', value: string) => {
    setFormData(prev => ({
      ...prev,
      rows: prev.rows.map(row =>
        row.id === id ? { ...row, [field]: value } : row
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const content: MarketplaceNoteContent = {
        metadata: {
          topic: formData.topic,
          date: new Date().toISOString().split('T')[0],
          course: formData.courseCode,
          objective: formData.objective,
        },
        rows: formData.rows,
        summary: formData.summary,
      };

      if (editingId) {
        await updateMarketplaceNote(editingId, {
          topic: formData.topic,
          courseCode: formData.courseCode,
          content,
          price: formData.price,
          currency: formData.currency,
        });
      } else {
        await createMarketplaceNote({
          topic: formData.topic,
          courseCode: formData.courseCode,
          content,
          price: formData.price,
          currency: formData.currency,
        });
      }

      await fetchNotes();
      setShowForm(false);
      setFormData(emptyFormData);
      setEditingId(null);
    } catch (error) {
      console.error('Failed to save note:', error);
      alert('Failed to save note. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (note: MarketplaceNote) => {
    setFormData({
      topic: note.topic,
      courseCode: note.courseCode,
      objective: note.content.metadata.objective,
      price: note.price,
      currency: note.currency,
      rows: note.content.rows.length > 0
        ? note.content.rows
        : [{ id: '1', cue: '', note: '' }],
      summary: note.content.summary,
    });
    setEditingId(note.id);
    setShowForm(true);
  };

  const handleDelete = async (noteId: string) => {
    if (!confirm('Are you sure you want to delete this note?')) return;

    try {
      await deleteMarketplaceNote(noteId);
      await fetchNotes();
    } catch (error) {
      console.error('Failed to delete note:', error);
      alert('Failed to delete note. Please try again.');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData(emptyFormData);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Store size={24} className="text-indigo-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
                <p className="text-sm text-slate-500">{user?.email}</p>
              </div>
            </div>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-semibold shadow-lg shadow-indigo-200"
              >
                <Plus size={20} />
                Add Note to Marketplace
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <BookOpen size={24} className="text-indigo-600" />
                {editingId ? 'Edit Marketplace Note' : 'Add New Marketplace Note'}
              </h2>
              <button
                onClick={handleCancel}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Topic *
                  </label>
                  <input
                    type="text"
                    value={formData.topic}
                    onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="e.g., Introduction to Machine Learning"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Course Code
                  </label>
                  <input
                    type="text"
                    value={formData.courseCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, courseCode: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="e.g., CS101"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Learning Objective
                </label>
                <input
                  type="text"
                  value={formData.objective}
                  onChange={(e) => setFormData(prev => ({ ...prev, objective: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="What will students learn from this note?"
                />
              </div>

              {/* Price */}
              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <DollarSign size={16} className="inline mr-1" />
                    Price
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="0 for FREE"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Currency
                  </label>
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value as 'USD' | 'LKR' }))}
                    className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="LKR">LKR (රු)</option>
                  </select>
                </div>
              </div>

              {/* Cornell Note Rows */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-semibold text-slate-700">
                    Cornell Note Rows
                  </label>
                  <button
                    type="button"
                    onClick={handleAddRow}
                    className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
                  >
                    <Plus size={16} />
                    Add Row
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.rows.map((row, index) => (
                    <div key={row.id} className="flex gap-3 items-start">
                      <div className="w-1/3">
                        <input
                          type="text"
                          value={row.cue}
                          onChange={(e) => handleRowChange(row.id, 'cue', e.target.value)}
                          className="w-full px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm"
                          placeholder="Cue/Question"
                        />
                      </div>
                      <div className="flex-1">
                        <textarea
                          value={row.note}
                          onChange={(e) => handleRowChange(row.id, 'note', e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm resize-none"
                          placeholder="Notes/Answer"
                          rows={2}
                        />
                      </div>
                      {formData.rows.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveRow(row.id)}
                          className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Summary
                </label>
                <textarea
                  value={formData.summary}
                  onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                  placeholder="Key takeaways from this note..."
                  rows={3}
                />
              </div>

              {/* Submit */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 text-slate-600 hover:bg-slate-100 rounded-xl transition-all font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-all font-semibold shadow-lg shadow-indigo-200"
                >
                  {saving ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      {editingId ? 'Update Note' : 'Publish to Marketplace'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Notes List */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h2 className="font-bold text-slate-800">Marketplace Notes ({notes.length})</h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 size={32} className="animate-spin text-indigo-500" />
            </div>
          ) : notes.length === 0 ? (
            <div className="text-center py-12">
              <Store size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500">No marketplace notes yet.</p>
              <p className="text-sm text-slate-400">Click &quot;Add Note&quot; to create your first one.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {notes.map((note) => (
                <div key={note.id} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                          {note.courseCode || 'General'}
                        </span>
                        <span className={`text-sm font-bold px-3 py-1 rounded-full ${note.price > 0
                          ? 'bg-slate-900 text-white'
                          : 'bg-emerald-100 text-emerald-700'
                          }`}>
                          {formatPrice(note.price, note.currency)}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">{note.topic}</h3>
                      <p className="text-sm text-slate-500 line-clamp-2">
                        {note.content.metadata.objective || note.content.summary || 'No description'}
                      </p>
                      <p className="text-xs text-slate-400 mt-2">
                        {note.content.rows.length} row(s) • Created {new Date(typeof note.createdAt === 'number' ? note.createdAt : (note.createdAt as { seconds: number }).seconds * 1000).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(note)}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                        title="Edit"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(note.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminContent />
    </ProtectedRoute>
  );
}
