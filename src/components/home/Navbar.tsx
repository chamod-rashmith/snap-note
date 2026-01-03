'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Menu, X, Edit3 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import SignInForm from '../auth/SignInForm';
import SignUpForm from '../auth/SignUpForm';
import UserMenu from '../auth/UserMenu';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const { user, loading } = useAuth();

  const handleSwitchToSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  const handleSwitchToSignIn = () => {
    setShowSignUp(false);
    setShowSignIn(true);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="backdrop-blur-lg bg-white/70 border-b border-white/20 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 group z-50 relative">
              <div className="bg-indigo-600 p-2 rounded-lg text-white group-hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30">
                <BookOpen size={24} />
              </div>
              <span className="font-bold text-xl text-slate-800 tracking-tight">CornellNotes<span className="text-indigo-600">+</span></span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/pricing" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors text-sm uppercase tracking-wide">
                Pricing
              </Link>
              <Link href="/dashboard" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors text-sm uppercase tracking-wide">
                Dashboard
              </Link>
              <Link href="/marketplace" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors text-sm uppercase tracking-wide">
                Marketplace
              </Link>
              <Link href="/documentation" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors text-sm uppercase tracking-wide">
                Docs
              </Link>

              {!loading && !user && (
                <>
                  <button
                    onClick={() => setShowSignIn(true)}
                    className="text-slate-600 hover:text-indigo-600 font-medium transition-colors text-sm uppercase tracking-wide"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setShowSignUp(true)}
                    className="px-5 py-2.5 bg-indigo-600 text-white rounded-full font-medium text-sm hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg"
                  >
                    Sign Up
                  </button>
                </>
              )}

              {!loading && user && (
                <UserMenu />
              )}

              <Link
                href="/editor"
                className="px-5 py-2.5 bg-slate-900 text-white rounded-full font-medium text-sm hover:bg-slate-800 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <Edit3 size={16} />
                <span>Create Note</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-slate-700 p-2 z-50 relative"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-white/95 backdrop-blur-xl z-40 transition-transform duration-300 ease-in-out md:hidden flex flex-col items-center justify-center gap-8 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <Link
            href="/pricing"
            className="text-2xl font-bold text-slate-800 hover:text-indigo-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href="/dashboard"
            className="text-2xl font-bold text-slate-800 hover:text-indigo-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/marketplace"
            className="text-2xl font-bold text-slate-800 hover:text-indigo-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Marketplace
          </Link>
          <Link
            href="/documentation"
            className="text-2xl font-bold text-slate-800 hover:text-indigo-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Documentation
          </Link>

          {!loading && !user && (
            <>
              <button
                className="text-2xl font-bold text-slate-800 hover:text-indigo-600"
                onClick={() => {
                  setIsMenuOpen(false);
                  setShowSignIn(true);
                }}
              >
                Sign In
              </button>
              <button
                className="px-6 py-3 bg-indigo-600 text-white rounded-full font-medium text-xl hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg"
                onClick={() => {
                  setIsMenuOpen(false);
                  setShowSignUp(true);
                }}
              >
                Sign Up
              </button>
            </>
          )}

          {!loading && user && (
            <div className="transform scale-150">
              <UserMenu />
            </div>
          )}

          <Link
            href="/editor"
            className="text-2xl font-bold text-slate-800 hover:text-indigo-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Create Note
          </Link>
        </div>
      </nav>

      {/* Auth Modals */}
      <SignInForm
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
        onSwitchToSignUp={handleSwitchToSignUp}
      />
      <SignUpForm
        isOpen={showSignUp}
        onClose={() => setShowSignUp(false)}
        onSwitchToSignIn={handleSwitchToSignIn}
      />
    </>
  );
}
