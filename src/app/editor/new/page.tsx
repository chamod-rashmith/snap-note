'use client';
import React, { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import CornellEditor from '../../../components/editor/CornellEditor';
import { createNote, NoteContent, Note } from '../../../services/noteService';
import { useAuth } from '../../../context/AuthContext';
import Link from 'next/link';
import { ArrowLeft, Loader2, AlertCircle, Sparkles } from 'lucide-react';

const MOCK_USER_ID = "test-user-123";

export default function NewNotePage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user } = useAuth();
    const [saving, setSaving] = useState(false);

    // Parse AI-generated content from URL params
    const generatedContent = useMemo(() => {
        const contentParam = searchParams.get('content');
        if (contentParam) {
            try {
                return JSON.parse(decodeURIComponent(contentParam)) as NoteContent;
            } catch (e) {
                console.error("Failed to parse generated content", e);
                return null;
            }
        }
        return null;
    }, [searchParams]);

    // Create a temporary note object for the editor
    const tempNote: Note | null = generatedContent ? {
        id: 'new',
        ownerId: user?.uid || MOCK_USER_ID,
        topic: generatedContent.metadata.topic,
        courseCode: generatedContent.metadata.course,
        content: generatedContent,
        isPublic: false,
        createdAt: Date.now()
    } : null;

    const handleSave = async (content: NoteContent) => {
        setSaving(true);
        const userId = user?.uid || MOCK_USER_ID;

        try {
            const newNote = await createNote(userId, content);
            // Redirect to the saved note's editor page
            router.push(`/editor/${newNote.id}`);
        } catch (e) {
            console.error("Error saving note", e);
            alert("Failed to save note.");
            setSaving(false);
        }
    };

    if (!generatedContent) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 p-8 text-center space-y-6">
                <div className="bg-white p-6 rounded-full shadow-lg">
                    <AlertCircle size={48} className="text-rose-500" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 mb-2">No Content Found</h1>
                    <p className="text-slate-500 max-w-md mx-auto mb-8">
                        No AI-generated content was found. Please generate a note from the dashboard.
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
                    <span className="flex items-center text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
                        <Sparkles size={12} className="mr-1.5" /> AI Generated - Not Saved Yet
                    </span>
                </div>
            </div>

            <div className="pb-24">
                <CornellEditor
                    initialData={tempNote!}
                    onSave={handleSave}
                    isSaving={saving}
                />
            </div>
        </div>
    );
}
