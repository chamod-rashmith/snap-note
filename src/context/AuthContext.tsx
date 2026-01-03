'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
    User,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAdmin: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userDocRef = doc(db, 'users', user.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setIsAdmin(userData.role === 'admin');
                    } else {
                        // If user doc doesn't exist (e.g. older user), treat as normal user
                        setIsAdmin(false);
                    }
                } catch (error) {
                    console.error("Error fetching user role:", error);
                    setIsAdmin(false);
                }
            } else {
                setIsAdmin(false);
            }
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signIn = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const signUp = async (email: string, password: string) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        // Create user document in Firestore with default 'user' role
        try {
            await setDoc(doc(db, 'users', result.user.uid), {
                uid: result.user.uid,
                email: result.user.email,
                role: 'user',
                createdAt: new Date()
            });
        } catch (error) {
            console.error("Error creating user document:", error);
        }
    };

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);

        // Check if user document exists, if not create it
        try {
            const userDocRef = doc(db, 'users', result.user.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                await setDoc(userDocRef, {
                    uid: result.user.uid,
                    email: result.user.email,
                    role: 'user',
                    createdAt: new Date()
                });
            }
        } catch (error) {
            console.error("Error checking/creating user document:", error);
        }
    };

    const signOut = async () => {
        await firebaseSignOut(auth);
    };

    const value: AuthContextType = {
        user,
        loading,
        isAdmin,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
