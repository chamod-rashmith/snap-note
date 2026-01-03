import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">CornellNotes<span className="text-indigo-600">+</span></h3>
            <p className="text-slate-500 max-w-sm mb-6">
                Empowering students to learn better through structured note-taking and knowledge sharing. Built for the modern academic journey.
            </p>
            <div className="flex gap-4">
                {/* Social placeholders */}
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer">
                    <span className="sr-only">Twitter</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer">
                     <span className="sr-only">GitHub</span>
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </div>
            </div>
        </div>

        <div>
            <h4 className="font-bold text-slate-900 mb-4">Product</h4>
            <ul className="space-y-3 text-slate-500 text-sm">
                <li><Link href="/editor" className="hover:text-indigo-600 transition-colors">Smart Editor</Link></li>
                <li><Link href="/marketplace" className="hover:text-indigo-600 transition-colors">Marketplace</Link></li>
                <li><Link href="/dashboard" className="hover:text-indigo-600 transition-colors">My Library</Link></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Pricing</a></li>
            </ul>
        </div>

        <div>
            <h4 className="font-bold text-slate-900 mb-4">Resources</h4>
            <ul className="space-y-3 text-slate-500 text-sm">
                <li><Link href="/documentation" className="hover:text-indigo-600 transition-colors">Documentation</Link></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Contact</a></li>
            </ul>
        </div>
      </div>
      <div className="border-t border-slate-100 pt-8 text-center text-slate-400 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <span>&copy; {new Date().getFullYear()} CornellNotes+. All rights reserved.</span>
        <div className="flex gap-6">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
