import React from 'react';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import { Check, Star, Zap, Crown, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />

      {/* Hero Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-gradient-to-br from-indigo-100/30 to-purple-100/30 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4 animate-blob" />
        <div className="absolute bottom-0 left-0 w-3/4 h-3/4 bg-gradient-to-tr from-blue-100/30 to-teal-100/30 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4 animate-blob animation-delay-2000" />
      </div>

      <main className="relative z-10 pt-32 pb-20 px-6 md:px-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-4 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
            Simple, Transparent <span className="text-indigo-600">Pricing</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            One-time payments for lifetime access. No subscriptions, no hidden fees. Choose the plan that fits your academic journey.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">

          {/* Student Plan */}
          <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="absolute -inset-0.5 bg-gradient-to-b from-slate-200 to-slate-100 rounded-2xl blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl p-8 h-full flex flex-col hover:transform hover:-translate-y-2 transition-all duration-300 shadow-xl shadow-slate-200/50">
              <div className="mb-6">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 mb-4 shadow-inner">
                  <Star size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Student Starter</h3>
                <p className="text-slate-500 mt-2">Perfect for getting started with digital Cornell Notes.</p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-extrabold text-slate-900">$5</span>
                <span className="text-slate-500 font-medium ml-2">/ one-time</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {[
                  'Unlimited Local Notes',
                  'Basic PDF Export',
                  '5 Cloud Notes (Sync)',
                  'Standard Support',
                  'Dark Mode Access'
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <Check size={20} className="text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 px-6 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
                Get Started
              </button>
            </div>
          </div>

          {/* Scholar Plan (Popular) */}
          <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-xl border border-indigo-100 rounded-2xl p-8 h-full flex flex-col transform md:-translate-y-4 hover:transform hover:-translate-y-6 transition-all duration-300 shadow-2xl shadow-indigo-500/20">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                  Most Popular
                </span>
              </div>
              <div className="mb-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-4 shadow-inner">
                  <Zap size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Scholar Pro</h3>
                <p className="text-slate-500 mt-2">For serious students who need to organize everywhere.</p>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-extrabold text-indigo-600">$10</span>
                <span className="text-slate-500 font-medium ml-2">/ one-time</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {[
                  'Everything in Student',
                  'Unlimited Cloud Sync',
                  'Advanced PDF Export',
                  'Priority Support',
                  'Access to Marketplace'
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <Check size={20} className="text-indigo-500 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98]">
                Buy Scholar Pro
              </button>
            </div>
          </div>

          {/* Polymath Plan */}
          <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="absolute -inset-0.5 bg-gradient-to-b from-amber-200 to-yellow-100 rounded-2xl blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl p-8 h-full flex flex-col hover:transform hover:-translate-y-2 transition-all duration-300 shadow-xl shadow-amber-200/50">
              <div className="mb-6">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-4 shadow-inner">
                  <Crown size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Polymath Elite</h3>
                <p className="text-slate-500 mt-2">The ultimate toolkit for lifelong learners.</p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-extrabold text-slate-900">$15</span>
                <span className="text-slate-500 font-medium ml-2">/ one-time</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {[
                  'Everything in Scholar',
                  'Publish to Marketplace',
                  'AI Summarization (Beta)',
                  'Early Access Features',
                  'Lifetime Updates'
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <Check size={20} className="text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 px-6 rounded-xl bg-white border-2 border-slate-200 text-slate-700 font-bold hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]">
                Become Elite
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-24 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-sm">
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">Is this really a one-time payment?</h4>
                    <p className="text-slate-600">Yes! We believe in owning your tools. Pay once and get lifetime access to the features in your plan.</p>
                </div>
                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-sm">
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">Can I upgrade later?</h4>
                    <p className="text-slate-600">Absolutely. You can upgrade to a higher tier at any time by paying the difference.</p>
                </div>
                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-sm">
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">What happens to my notes if I don't pay?</h4>
                    <p className="text-slate-600">The free version is always available for local notes. You will never lose access to your local data.</p>
                </div>
            </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
             <p className="text-slate-500 mb-4">Not sure yet? Start for free.</p>
             <Link href="/editor" className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
                Try the Editor Now <ArrowRight size={16} />
             </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
