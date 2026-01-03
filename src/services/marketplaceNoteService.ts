import { db } from "../lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
  orderBy,
  query,
} from "firebase/firestore";

export interface MarketplaceNoteContent {
  metadata: {
    topic: string;
    date: string;
    course: string;
    objective: string;
  };
  rows: { id: string; cue: string; note: string }[];
  summary: string;
}

export interface MarketplaceNote {
  id: string;
  topic: string;
  courseCode: string;
  content: MarketplaceNoteContent;
  price: number;
  currency: "USD" | "LKR";
  createdAt: number | Timestamp;
  updatedAt: number | Timestamp;
}

// Collection reference
const getMarketplaceNotesCollectionRef = () => {
  return collection(db, "marketplace_notes");
};

const getMarketplaceNoteRef = (noteId: string) => {
  return doc(db, "marketplace_notes", noteId);
};

// Create a new marketplace note (Admin only)
export const createMarketplaceNote = async (
  noteData: Omit<MarketplaceNote, "id" | "createdAt" | "updatedAt">
): Promise<MarketplaceNote> => {
  const notesCollection = getMarketplaceNotesCollectionRef();
  const newNoteRef = doc(notesCollection);
  
  const note: MarketplaceNote = {
    ...noteData,
    id: newNoteRef.id,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  
  await setDoc(newNoteRef, note);
  return note;
};

// Update an existing marketplace note (Admin only)
export const updateMarketplaceNote = async (
  noteId: string,
  data: Partial<Omit<MarketplaceNote, "id" | "createdAt">>
): Promise<void> => {
  const noteRef = getMarketplaceNoteRef(noteId);
  await updateDoc(noteRef, {
    ...data,
    updatedAt: Date.now(),
  });
};

// Delete a marketplace note (Admin only)
export const deleteMarketplaceNote = async (noteId: string): Promise<void> => {
  const noteRef = getMarketplaceNoteRef(noteId);
  await deleteDoc(noteRef);
};

// Get all marketplace notes (Public)
export const getMarketplaceNotes = async (): Promise<MarketplaceNote[]> => {
  const notesCollection = getMarketplaceNotesCollectionRef();
  const q = query(notesCollection, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => doc.data() as MarketplaceNote);
};

// Get a single marketplace note by ID (Public)
export const getMarketplaceNote = async (
  noteId: string
): Promise<MarketplaceNote | null> => {
  const noteRef = getMarketplaceNoteRef(noteId);
  const snap = await getDoc(noteRef);
  if (snap.exists()) {
    return snap.data() as MarketplaceNote;
  }
  return null;
};

// Helper to format price with currency
export const formatPrice = (price: number, currency: "USD" | "LKR"): string => {
  if (price === 0) {
    return "FREE";
  }
  if (currency === "USD") {
    return `$${price.toFixed(2)}`;
  }
  return `LKR ${price.toLocaleString()}`;
};
