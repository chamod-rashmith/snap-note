import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "mock-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "mock-domain",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "mock-project-id",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "mock-bucket",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "mock-sender-id",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "mock-app-id",
};

let app;
let auth: any = {
    currentUser: null,
    onAuthStateChanged: () => () => {},
    signOut: async () => {},
    signInWithEmailAndPassword: async () => {},
    createUserWithEmailAndPassword: async () => {},
};
let db: any = {};

try {
    // Initialize Firebase only if we have a valid key or we want to try anyway (but with mocks it might fail on init)
    // Actually, if we are in a build environment without keys, initializeApp might throw if keys are empty/invalid strings
    // However, the error seen was auth/invalid-api-key, which comes from the service trying to use it.

    // Check if we have env vars, if not we might skip initialization if we can.
    // But other parts of the app import 'auth' and 'db'.

    if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
         app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
         auth = getAuth(app);
         db = getFirestore(app);
    } else {
        console.warn("Firebase environment variables missing. Using mock instances.");
        // We can't really "mock" the auth object fully to satisfy Firebase SDK calls unless we mock the SDK itself.
        // But since we saw "Error [FirebaseError]: Firebase: Error (auth/invalid-api-key)." it means it TRIED to init.
        // The previous code passed undefined/empty strings to initializeApp, which is fine, but getAuth() triggered the validation.

        // Solution: Create a dummy app if needed, or just export dummy objects.
        // If we export dummy objects, we must ensure downstream code checks for them or handles them.
        // The error happened in dashboard/page.tsx during build (static generation).
    }

} catch (e) {
    console.warn("Firebase initialization failed:", e);
}

export { app, auth, db };
