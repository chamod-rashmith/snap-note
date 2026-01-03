'use client';

import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

export default function UserMenu() {
    const { user, signOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!user) return null;

    const initials = user.email
        ? user.email.substring(0, 2).toUpperCase()
        : 'U';

    const displayName = user.displayName || user.email || 'User';

    const handleSignOut = async () => {
        await signOut();
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            >
                {user.photoURL ? (
                    <img
                        src={user.photoURL}
                        alt={displayName}
                        className="w-9 h-9 rounded-full object-cover border-2 border-indigo-100"
                    />
                ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                        {initials}
                    </div>
                )}
                <ChevronDown
                    size={16}
                    className={`text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-fade-in-up">
                    <div className="px-4 py-3 border-b border-slate-100">
                        <p className="font-bold text-slate-900 truncate">{displayName}</p>
                        <p className="text-sm text-slate-500 truncate">{user.email}</p>
                    </div>

                    <div className="py-1">
                        <Link
                            href="/dashboard"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                            <LayoutDashboard size={18} className="text-slate-400" />
                            <span className="font-medium">Dashboard</span>
                        </Link>
                    </div>

                    <div className="border-t border-slate-100 py-1">
                        <button
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                            <LogOut size={18} />
                            <span className="font-medium">Sign Out</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
