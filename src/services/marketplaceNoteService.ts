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

// -- Purchase Logic --

// Collection reference for user purchased notes
const getUserPurchasedNotesCollectionRef = (userId: string) => {
  return collection(db, "users", userId, "purchased");
};

// Purchase a note (save to user's purchased subcollection)
export const purchaseNote = async (
  userId: string,
  noteId: string
): Promise<void> => {
  const userPurchasedRef = getUserPurchasedNotesCollectionRef(userId);
  const purchaseDocRef = doc(userPurchasedRef, noteId);
  
  // We can save metadata here if we want, like purchase date
  await setDoc(purchaseDocRef, {
    purchasedAt: Date.now(),
    noteId: noteId
  });
};

// Check if a note is purchased by the user
export const checkIfPurchased = async (
  userId: string,
  noteId: string
): Promise<boolean> => {
  const userPurchasedRef = getUserPurchasedNotesCollectionRef(userId);
  const purchaseDocRef = doc(userPurchasedRef, noteId);
  const snap = await getDoc(purchaseDocRef);
  return snap.exists();
};

// Get all purchased notes for a user
export const getPurchasedNotes = async (
  userId: string
): Promise<MarketplaceNote[]> => {
  const userPurchasedRef = getUserPurchasedNotesCollectionRef(userId);
  const purchasedSnaps = await getDocs(userPurchasedRef);
  
  if (purchasedSnaps.empty) return [];
  
  const noteIds = purchasedSnaps.docs.map(doc => doc.id);
  
  const notesPromises = noteIds.map(id => getMarketplaceNote(id));
  const notesResults = await Promise.all(notesPromises);
  
  return notesResults.filter((n): n is MarketplaceNote => n !== null);
};
