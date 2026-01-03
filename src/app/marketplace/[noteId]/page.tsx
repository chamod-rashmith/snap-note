import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getMarketplaceNote, MarketplaceNote, formatPrice, purchaseNote, checkIfPurchased } from '../../../services/marketplaceNoteService';
import { createNote } from '../../../services/noteService';
import { useAuth } from '../../../context/AuthContext';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Lock, Printer, Copy, Loader2 } from 'lucide-react';
import MathPreview from '../../../components/editor/MathPreview';
import { useReactToPrint } from 'react-to-print';

export default function PublicNotePage() {
  const { noteId } = useParams();
  const { user } = useAuth();
  const router = useRouter();
  const [note, setNote] = useState<MarketplaceNote | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchased, setPurchased] = useState(false);
  const [cloning, setCloning] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchNote = async () => {
      if (typeof noteId !== 'string') return;
      try {
        const fetchedNote = await getMarketplaceNote(noteId);
        setNote(fetchedNote);

        if (user) {
          const isPurchased = await checkIfPurchased(user.uid, noteId);
          setPurchased(isPurchased);
        }
      } catch (e) {
        console.error("Error fetching note", e);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [noteId, user]);

  const handleBuy = async () => {
    if (!user) {
      alert("Please login to purchase notes.");
      return;
    }
    if (!note || typeof noteId !== 'string') return;

    const priceText = formatPrice(note.price, note.currency);
    if (confirm(`Purchase this note for ${priceText}?`)) {
      try {
        await purchaseNote(user.uid, noteId);
        setPurchased(true);
        alert("Purchase successful!");
      } catch (error) {
        console.error("Purchase failed", error);
        alert("Purchase failed. Please try again.");
      }
    }
  };

  const handleEditCopy = async () => {
    if (!user || !note) return;
    setCloning(true);
    try {
      // Create a copy of the note in the user's library
      const newNote = await createNote(user.uid, {
        ...note.content,
        metadata: {
          ...note.content.metadata,
          topic: `${note.topic} (Copy)`
        }
      });

      router.push(`/editor/${newNote.id}`);
    } catch (error) {
      console.error("Failed to create copy", error);
      alert("Failed to create a copy. Please try again.");
      setCloning(false);
    }
  };

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: note?.topic || "Marketplace Note"
  });

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen text-slate-500 gap-4">
      <Loader2 size={40} className="animate-spin text-indigo-600" />
      <p>Loading note details...</p>
    </div>
  );

  if (!note) return <div className="p-12 text-center text-slate-500">Note not found.</div>;

  return (
    <div className="bg-slate-50 min-h-screen pb-12 print:bg-white">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm print:hidden">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/marketplace" className="flex items-center text-sm text-slate-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft size={16} className="mr-1" /> Back to Marketplace
          </Link>

          <div className="flex items-center gap-3">
            {purchased && (
              <>
                <button
                  onClick={handleEditCopy}
                  disabled={cloning}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors disabled:opacity-50"
                  title="Create an editable copy"
                >
                  {cloning ? <Loader2 size={16} className="animate-spin" /> : <Copy size={16} />}
                  Edit Copy
                </button>
                <button
                  onClick={() => handlePrint()}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                  title="Export as PDF"
                >
                  <Printer size={16} />
                  Export PDF
                </button>
              </>
            )}

            <button
              onClick={handleBuy}
              disabled={purchased}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold shadow-sm transition-colors ${purchased
                  ? 'bg-green-100 text-green-700 cursor-default'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
            >
              {purchased ? (
                <span>Owned</span>
              ) : (
                <>
                  <ShoppingCart size={18} />
                  {note.price && note.price > 0 ? `Buy for ${formatPrice(note.price, note.currency)}` : 'Get for Free'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-8 px-4 print:mt-0 print:px-0 print:max-w-none">
        {/* Printable Content Wrapper */}
        <div ref={contentRef} className="print:p-8">
          {/* Note Info Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8 print:shadow-none print:border-none print:mb-4 print:p-0">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-1 rounded print:border print:border-indigo-200">
                  {note.courseCode || "General"}
                </span>
                <h1 className="text-3xl font-bold text-slate-900 mt-2">{note.topic}</h1>
                <p className="text-slate-500 mt-1">By SnapNote Admin</p>
              </div>
              <div className="text-right print:hidden">
                <p className="text-sm text-slate-400 uppercase font-bold tracking-wider">Price</p>
                <p className="text-2xl font-bold text-slate-800">
                  {formatPrice(note.price, note.currency)}
                </p>
              </div>
            </div>

            <div className="prose prose-slate max-w-none">
              <h3 className="text-sm font-bold uppercase text-slate-400 tracking-wider mb-1">Summary</h3>
              <MathPreview
                content={note.content.summary || note.content.metadata.objective || "No summary available."}
                className="text-slate-700 bg-slate-50 p-4 rounded-lg italic print:bg-transparent print:p-0 print:text-black"
              />
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden relative print:shadow-none print:border-none print:rounded-none">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center print:hidden">
              <h2 className="font-bold text-slate-700">Content</h2>
              {!purchased && (
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-100 flex items-center gap-1">
                  <Lock size={12} /> Limited View
                </span>
              )}
            </div>

            <div className={`p-8 ${!purchased ? 'relative' : ''} print:p-0`}>
              {/* We show the first 2 rows, then blur the rest if not purchased */}
              <div className="space-y-8 print:space-y-4">
                {note.content.rows.slice(0, purchased ? undefined : 2).map((row, i) => (
                  <div key={i} className="flex flex-col md:flex-row gap-6 border-b border-slate-100 pb-6 last:border-0 print:border-slate-300 print:break-inside-avoid">
                    <div className="w-full md:w-1/3 print:w-1/3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 print:text-black">Cue / Question</h4>
                      <MathPreview content={row.cue} className="text-indigo-800 font-medium print:text-black" />
                    </div>
                    <div className="w-full md:w-2/3 print:w-2/3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 print:text-black">Notes</h4>
                      <MathPreview content={row.note} className="text-slate-700 print:text-black" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Blur Overlay if not purchased */}
              {!purchased && note.content.rows.length > 2 && (
                <div className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-white via-white/90 to-transparent flex items-center justify-center print:hidden">
                  <div className="text-center p-6">
                    <Lock size={48} className="mx-auto text-slate-300 mb-4" />
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Purchase to Unlock Full Note</h3>
                    <button
                      onClick={handleBuy}
                      className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 transition-transform hover:-translate-y-0.5"
                    >
                      Buy Now for {formatPrice(note.price, note.currency)}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
