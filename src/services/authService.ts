import { auth } from "../lib/firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from "firebase/auth";

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out", error);
    throw error;
  }
};

// Hook or listener would be used in components
export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
