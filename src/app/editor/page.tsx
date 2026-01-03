'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createNote } from '../../services/noteService';
import { auth } from '../../lib/firebase';

const MOCK_USER_ID = "test-user-123";

export default function NewNotePage() {
  const router = useRouter();
  const [creating, setCreating] = useState(true);

  useEffect(() => {
    const initNote = async () => {
      const userId = auth.currentUser?.uid || MOCK_USER_ID;

      const defaultContent = {
        metadata: {
          topic: '',
          date: new Date().toLocaleDateString(),
          course: '',
          objective: ''
        },
        rows: [{ id: '1', cue: '', note: '' }],
        summary: ''
      };

      try {
        const newNote = await createNote(userId, defaultContent);
        router.replace(`/editor/${newNote.id}`);
      } catch (e) {
        console.error("Error creating note", e);
        setCreating(false);
      }
    };

    initNote();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
      {creating ? "Creating your note..." : "Error creating note."}
    </div>
  );
}
