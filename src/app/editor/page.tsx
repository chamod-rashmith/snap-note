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
    // Redirect to the new note creation page which doesn't auto-save
    router.replace('/editor/new');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
      {creating ? "Redirecting..." : "Redirecting..."}
    </div>
  );
}
