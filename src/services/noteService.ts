import { db } from "../lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  Timestamp
} from "firebase/firestore";

const USE_LOCAL_STORAGE = false;

export interface NoteContent {
  metadata: {
    topic: string;
    date: string;
    course: string;
    objective: string;
  };
  rows: { id: string; cue: string; note: string }[];
  summary: string;
}

export interface Note {
  id: string;
  ownerId: string;
  topic: string;
  courseCode: string;
  content: NoteContent;
  isPublic: boolean;
  price?: number;
  createdAt: number | Timestamp;
}

// Helper to use a specific path as requested: /users/{userId}/notes/{noteId}
export const getUserNoteRef = (userId: string, noteId: string) => {
  return doc(db, "users", userId, "notes", noteId);
};

export const getUserNotesCollectionRef = (userId: string) => {
  return collection(db, "users", userId, "notes");
};

// Local Storage Helpers
const getStorageKey = (userId: string, noteId: string) => `note_${userId}_${noteId}`;

const getFromStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  return null;
};

const saveToStorage = (key: string, data: unknown) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

const deleteFromStorage = (key: string) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
    }
}


export const saveNote = async (userId: string, note: Note) => {
  if (USE_LOCAL_STORAGE) {
    const key = getStorageKey(userId, note.id);
    saveToStorage(key, note);
    return;
  }
  const noteRef = getUserNoteRef(userId, note.id);
  const noteData = { ...note };
  await setDoc(noteRef, noteData);
};

export const createNote = async (userId: string, noteContent: NoteContent) => {
  if (USE_LOCAL_STORAGE) {
    const noteId = "note-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
    const newNote: Note = {
      id: noteId,
      ownerId: userId,
      topic: noteContent.metadata.topic || "Untitled",
      courseCode: noteContent.metadata.course || "",
      content: noteContent,
      isPublic: false,
      price: 0,
      createdAt: Date.now(),
    };
    const key = getStorageKey(userId, noteId);
    saveToStorage(key, newNote);
    return newNote;
  }

  const notesCollection = getUserNotesCollectionRef(userId);
  const newNoteRef = doc(notesCollection);
  const note: Note = {
    id: newNoteRef.id,
    ownerId: userId,
    topic: noteContent.metadata.topic || "Untitled",
    courseCode: noteContent.metadata.course || "",
    content: noteContent,
    isPublic: false,
    price: 0,
    createdAt: Date.now(),
  };
  await setDoc(newNoteRef, note);
  return note;
};

export const getNote = async (userId: string, noteId: string): Promise<Note | null> => {
  if (USE_LOCAL_STORAGE) {
    const key = getStorageKey(userId, noteId);
    return getFromStorage(key) as Note | null;
  }
  const noteRef = getUserNoteRef(userId, noteId);
  const snap = await getDoc(noteRef);
  if (snap.exists()) {
    return snap.data() as Note;
  }
  return null;
};

export const getUserNotes = async (userId: string): Promise<Note[]> => {
  if (USE_LOCAL_STORAGE) {
    if (typeof window === 'undefined') return [];
    const notes: Note[] = [];
    const prefix = `note_${userId}_`;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(prefix)) {
            const note = getFromStorage(key);
            if (note) notes.push(note);
        }
    }
    // Sort by createdAt descending
    return notes.sort((a, b) => {
        const dateA = typeof a.createdAt === 'number' ? a.createdAt : (a.createdAt as Timestamp).toMillis();
        const dateB = typeof b.createdAt === 'number' ? b.createdAt : (b.createdAt as Timestamp).toMillis();
        return dateB - dateA;
    });
  }
  const notesCollection = getUserNotesCollectionRef(userId);
  const snap = await getDocs(notesCollection);
  return snap.docs.map(doc => doc.data() as Note);
};

export const deleteNote = async (userId: string, noteId: string) => {
  if (USE_LOCAL_STORAGE) {
    const key = getStorageKey(userId, noteId);
    deleteFromStorage(key);
    return;
  }
  const noteRef = getUserNoteRef(userId, noteId);
  await deleteDoc(noteRef);
};

export const getMarketplaceCollectionRef = () => {
  return collection(db, "public", "data", "marketplace");
};

export const publishNoteToMarketplace = async (note: Note, price: number) => {
  if (USE_LOCAL_STORAGE) {
    // In local storage mode, we just update the note to be public
    // and save it.
    const updatedNote = { ...note, isPublic: true, price };
    const key = getStorageKey(note.ownerId, note.id);
    saveToStorage(key, updatedNote);
    return;
  }
  const marketplaceRef = getMarketplaceCollectionRef();
  const publicNoteRef = doc(marketplaceRef, note.id);

  const publicNoteData = {
    ...note,
    isPublic: true,
    price: price,
  };

  await setDoc(publicNoteRef, publicNoteData);

  await updateDoc(getUserNoteRef(note.ownerId, note.id), {
    isPublic: true,
    price: price
  });
};

export const getMarketplaceNotes = async (): Promise<Note[]> => {
  if (USE_LOCAL_STORAGE) {
    if (typeof window === 'undefined') return [];
    const notes: Note[] = [];
    // Scan all keys looking for any notes that are public
    // This assumes we want to see "other users" notes if we simulated them
    // or just our own public notes.
    // For simplicity, we scan all "note_*" keys.
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("note_")) {
            const note = getFromStorage(key);
            if (note && note.isPublic) notes.push(note);
        }
    }
    return notes;
  }
  const marketplaceRef = getMarketplaceCollectionRef();
  const snap = await getDocs(marketplaceRef);
  return snap.docs.map(doc => doc.data() as Note);
};

export const getPublicNote = async (noteId: string): Promise<Note | null> => {
   if (USE_LOCAL_STORAGE) {
     // Search for any note with this ID in local storage
     // We might not know the userId, so we have to scan.
     if (typeof window === 'undefined') return null;
     for (let i = 0; i < localStorage.length; i++) {
         const key = localStorage.key(i);
         if (key && key.startsWith("note_") && key.endsWith(`_${noteId}`)) {
             const note = getFromStorage(key);
             if (note && note.isPublic) return note;
         }
     }
     return null;
   }
   const marketplaceRef = getMarketplaceCollectionRef();
   const docRef = doc(marketplaceRef, noteId);
   const snap = await getDoc(docRef);
   if (snap.exists()) {
     return snap.data() as Note;
   }
   return null;
};
