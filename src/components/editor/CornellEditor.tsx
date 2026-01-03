import React, { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import {
  PlusCircle,
  Trash2,
  Printer,
  BookOpen,
  Layout,
  Type,
  FileText,
  Save,
  Eye,
  EyeOff,
  ChevronDown,
  MoreVertical
} from 'lucide-react';
import { NoteContent, Note } from '../../services/noteService';
import MathPreview from './MathPreview';

interface CornellEditorProps {
  initialData?: Note;
  onSave: (content: NoteContent) => Promise<void>;
  isSaving?: boolean;
}

const CornellEditor: React.FC<CornellEditorProps> = ({ initialData, onSave, isSaving = false }) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const promiseResolveRef = useRef<(() => void) | null>(null);

  const [metadata, setMetadata] = useState({
    topic: '',
    date: new Date().toLocaleDateString(),
    course: '',
    objective: ''
  });

  const [rows, setRows] = useState([
    { id: '1', cue: '', note: '' }
  ]);

  const [summary, setSummary] = useState('');

  // Load initial data if provided
  useEffect(() => {
    if (initialData && initialData.content) {
      setMetadata(initialData.content.metadata);
      setRows(initialData.content.rows);
      setSummary(initialData.content.summary);
    }
  }, [initialData]);

  // Handle Printing
  // Automatically switch to Preview Mode before printing to ensure clean output
  useEffect(() => {
    if (isPreviewMode && promiseResolveRef.current) {
      promiseResolveRef.current();
    }
  }, [isPreviewMode]);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: metadata.topic || "Cornell Note",
    onBeforePrint: () => {
      return new Promise((resolve) => {
        if (isPreviewMode) {
          resolve();
        } else {
          promiseResolveRef.current = resolve;
          setIsPreviewMode(true);
        }
      });
    },
    onAfterPrint: () => {
      promiseResolveRef.current = null;
    }
  });

  // Add a new row for cues/notes
  const addRow = () => {
    const newRow = { id: Date.now().toString(), cue: '', note: '' };
    setRows([...rows, newRow]);
  };

  // Remove a specific row
  const removeRow = (id: string) => {
    if (rows.length > 1) {
      setRows(rows.filter(row => row.id !== id));
    }
  };

  // Update specific row content
  const updateRow = (id: string, field: 'cue' | 'note', value: string) => {
    setRows(rows.map(row => row.id === id ? { ...row, [field]: value } : row));
  };

  const handleSave = () => {
    const content: NoteContent = {
      metadata,
      rows,
      summary
    };
    onSave(content);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans text-slate-900 print:bg-white print:p-0 flex flex-col items-center">
      {/* Action Bar - Floating Glass Dock */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-slate-900/80 backdrop-blur-md text-white px-2 py-2 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-1 print:hidden transition-all hover:bg-slate-900/90 hover:scale-105">

         <div className="flex items-center gap-2 px-3 border-r border-white/10 mr-1">
             <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
             <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">Editor</span>
         </div>

         <button
             onClick={() => setIsPreviewMode(!isPreviewMode)}
             className="p-3 hover:bg-white/20 rounded-xl transition-colors tooltip-trigger"
             title={isPreviewMode ? "Edit Mode" : "Preview Mode"}
         >
            {isPreviewMode ? <EyeOff size={20} /> : <Eye size={20} />}
         </button>

         <button
            onClick={handlePrint}
            className="p-3 hover:bg-white/20 rounded-xl transition-colors"
            title="Print Note"
         >
            <Printer size={20} />
         </button>

         <div className="w-px h-6 bg-white/10 mx-1"></div>

         <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-500 transition-all font-bold text-sm shadow-lg shadow-indigo-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
         >
            <Save size={18} />
            {isSaving ? 'Saving...' : 'Save Changes'}
         </button>
      </div>

      {/* Main Document Container - Paper Effect */}
      <div ref={contentRef} className="w-full max-w-[8.5in] bg-white shadow-2xl shadow-slate-300/50 rounded-sm min-h-[11in] relative overflow-hidden print:shadow-none print:rounded-none print:w-full print:max-w-none print:m-0 print:overflow-visible print:min-h-0 print:h-auto">

        {/* Paper Texture/Header Decoration (Screen only) */}
        <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 print:hidden opacity-80"></div>

        {/* Header Section */}
        <header className="border-b-2 border-slate-900 p-8 md:p-12 print:p-8 print:border-black">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <div className="relative group">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 group-focus-within:text-indigo-600 transition-colors">Topic / Subject</label>

                {/* Always render Preview but hide if in Edit Mode */}
                <div className={`${!isPreviewMode ? 'hidden print:block' : 'block'}`}>
                    <div className="text-3xl font-black text-slate-900 leading-tight">{metadata.topic || "Untitled Topic"}</div>
                </div>

                {/* Render Input only if in Edit Mode and NOT printing */}
                <div className={`${isPreviewMode ? 'hidden' : 'block print:hidden'}`}>
                  <input
                    type="text"
                    placeholder="e.g. Linear Algebra"
                    className="w-full text-3xl font-black bg-transparent border-b-2 border-transparent hover:border-slate-100 focus:border-indigo-600 focus:outline-none py-1 transition-all placeholder:text-slate-200"
                    value={metadata.topic}
                    onChange={(e) => setMetadata({...metadata, topic: e.target.value})}
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 group-focus-within:text-indigo-600 transition-colors">Learning Objective</label>

                <div className={`${!isPreviewMode ? 'hidden print:block' : 'block'}`}>
                    <div className="text-sm font-medium text-slate-600 leading-relaxed">{metadata.objective || "No objective defined."}</div>
                </div>

                <div className={`${isPreviewMode ? 'hidden' : 'block print:hidden'}`}>
                  <textarea
                    placeholder="What are you trying to learn today?"
                    rows={2}
                    className="w-full text-sm font-medium bg-transparent border-b-2 border-transparent hover:border-slate-100 focus:border-indigo-600 focus:outline-none py-1 resize-none placeholder:text-slate-200 transition-all"
                    value={metadata.objective}
                    onChange={(e) => setMetadata({...metadata, objective: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 md:items-end">
              <div className="w-full md:w-48 relative group">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 md:text-right group-focus-within:text-indigo-600 transition-colors">Course Code</label>

                <div className={`${!isPreviewMode ? 'hidden print:block' : 'block'}`}>
                    <div className="text-lg font-bold text-slate-900 md:text-right font-mono uppercase tracking-wider">{metadata.course || "N/A"}</div>
                </div>

                <div className={`${isPreviewMode ? 'hidden' : 'block print:hidden'}`}>
                  <input
                    type="text"
                    placeholder="CODE 101"
                    className="w-full text-lg font-bold text-left md:text-right bg-transparent border-b-2 border-transparent hover:border-slate-100 focus:border-indigo-600 focus:outline-none py-1 font-mono uppercase tracking-wider placeholder:text-slate-200 transition-all"
                    value={metadata.course}
                    onChange={(e) => setMetadata({...metadata, course: e.target.value})}
                  />
                </div>
              </div>
              <div className="w-full md:w-48 relative group">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 md:text-right group-focus-within:text-indigo-600 transition-colors">Date</label>

                <div className={`${!isPreviewMode ? 'hidden print:block' : 'block'}`}>
                    <div className="text-base font-medium text-slate-600 md:text-right">{metadata.date}</div>
                </div>

                <div className={`${isPreviewMode ? 'hidden' : 'block print:hidden'}`}>
                  <input
                    type="text"
                    className="w-full text-base font-medium text-left md:text-right bg-transparent border-b-2 border-transparent hover:border-slate-100 focus:border-indigo-600 focus:outline-none py-1 placeholder:text-slate-200 transition-all"
                    value={metadata.date}
                    onChange={(e) => setMetadata({...metadata, date: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Cornell Body */}
        <main className="flex flex-col min-h-[8in] print:min-h-0 relative">

          {/* Vertical Divider Line (Visual) */}
          <div className="absolute left-[30%] top-0 bottom-0 w-0.5 bg-slate-900 hidden md:block print:block print:bg-black z-0"></div>

          {/* Column Headers */}
          <div className="flex flex-col md:flex-row print:flex-row border-b-2 border-slate-900 print:border-black z-10 relative">
             <div className="w-full md:w-[30%] print:w-[30%] p-4 md:pl-8 flex items-center gap-2 opacity-50">
                <Type size={12} />
                <h2 className="text-[10px] font-bold uppercase tracking-widest">Cues</h2>
             </div>
             <div className="w-full md:w-[70%] print:w-[70%] p-4 md:pl-8 flex items-center gap-2 opacity-50">
                <Layout size={12} />
                <h2 className="text-[10px] font-bold uppercase tracking-widest">Notes</h2>
             </div>
          </div>

          {/* Rows */}
          <div className="flex flex-col z-10">
            {rows.map((row) => (
              <div key={row.id} className="group relative flex flex-col md:flex-row print:flex-row print:break-inside-avoid border-b border-slate-100 print:border-slate-300 last:border-0 min-h-[120px]">

                {/* Cue Column (30%) */}
                <div className="w-full md:w-[30%] print:w-[30%] p-4 md:pl-8 pt-6 relative">
                  <div className={`${!isPreviewMode ? 'hidden print:block' : 'block'}`}>
                     <MathPreview content={row.cue} className="text-sm font-bold text-indigo-900 print:text-black leading-relaxed" placeholder="" />
                  </div>

                  <div className={`${isPreviewMode ? 'hidden' : 'block print:hidden'} h-full`}>
                    <textarea
                      placeholder="Add cue..."
                      className="w-full h-full bg-transparent resize-none focus:outline-none text-sm font-bold leading-relaxed text-indigo-900 placeholder:text-slate-200 min-h-[100px] transition-colors focus:bg-indigo-50/30 rounded p-1 -ml-1"
                      value={row.cue}
                      onChange={(e) => updateRow(row.id, 'cue', e.target.value)}
                    />
                  </div>
                </div>

                {/* Note Column (70%) */}
                <div className="w-full md:w-[70%] print:w-[70%] p-4 md:pl-8 md:pr-12 pt-6 relative">
                   {/* Dotted lines for writing guide (visual only, light) */}
                   <div className="absolute inset-0 pointer-events-none opacity-5 flex flex-col pt-1.5 print:hidden">
                       {[...Array(5)].map((_, i) => <div key={i} className="h-6 border-b border-slate-900 w-full"></div>)}
                   </div>

                  <div className="relative z-10 h-full">
                    <div className={`${!isPreviewMode ? 'hidden print:block' : 'block'}`}>
                        <MathPreview content={row.note} className="text-sm leading-relaxed text-slate-800 print:text-black font-medium" placeholder="" />
                    </div>

                    <div className={`${isPreviewMode ? 'hidden' : 'block print:hidden'} h-full`}>
                        <textarea
                        placeholder="Start typing your notes here..."
                        className="w-full h-full bg-transparent resize-none focus:outline-none text-sm leading-6 text-slate-800 placeholder:text-slate-200 min-h-[100px] transition-colors focus:bg-indigo-50/30 rounded p-1 -ml-1"
                        style={{lineHeight: '1.5rem'}}
                        value={row.note}
                        onChange={(e) => updateRow(row.id, 'note', e.target.value)}
                        />
                    </div>
                  </div>

                  {/* Row Actions */}
                  {!isPreviewMode && (
                    <div className="absolute -right-8 top-0 opacity-0 group-hover:opacity-100 transition-all flex flex-col gap-2 print:hidden z-20">
                      <button
                        onClick={() => removeRow(row.id)}
                        className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        title="Delete row"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add Row Button */}
          {!isPreviewMode && (
            <div className="py-4 print:hidden px-8">
                <button
                onClick={addRow}
                className="w-full py-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-lg transition-all flex items-center justify-center gap-2 border-2 border-dashed border-slate-100 hover:border-indigo-200"
                >
                <PlusCircle size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Add New Section</span>
                </button>
            </div>
          )}
        </main>

        {/* Summary Section */}
        <footer className="border-t-2 border-slate-900 print:border-black print:border-t-2 bg-slate-50 print:bg-white break-inside-avoid">
          <div className="p-4 md:p-8 flex flex-col gap-4">
             <div className="flex items-center gap-2 opacity-50">
               <FileText size={12} />
               <h2 className="text-[10px] font-bold uppercase tracking-widest">Summary</h2>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm min-h-[100px] print:border-none print:shadow-none print:p-0 print:bg-transparent">
                <div className={`${!isPreviewMode ? 'hidden print:block' : 'block'}`}>
                    <MathPreview content={summary} className="text-sm italic text-slate-700 print:text-black leading-relaxed" placeholder="No summary provided." />
                </div>

                <div className={`${isPreviewMode ? 'hidden' : 'block print:hidden'}`}>
                    <textarea
                        placeholder="Summarize the main points..."
                        rows={3}
                        className="w-full bg-transparent border-none focus:outline-none resize-none text-sm italic text-slate-700 placeholder:text-slate-300"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                    />
                </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Spacer for floating dock */}
      <div className="h-24 print:hidden"></div>

      <style>
        {`
        @media print {
          @page {
            margin: 0mm;
          }
          body {
            background-color: white !important;
            padding: 0.5in !important;
            margin: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          /* Ensure textareas are really hidden and MathPreviews are really shown */
          .print\\:hidden {
              display: none !important;
          }
          .print\\:block {
              display: block !important;
          }

          /* Hide all non-editor UI */
          nav, aside, .floating-dock {
              display: none !important;
          }
        }
        `}
      </style>
    </div>
  );
};

export default CornellEditor;
