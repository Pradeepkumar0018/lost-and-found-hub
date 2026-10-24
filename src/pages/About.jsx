import React from 'react';
import { Shield, Sparkles, Heart, GitCommit, Users, Lock, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 text-xs font-extrabold border border-brand-200 dark:border-brand-800">
          <Shield className="w-4 h-4" /> About Lost & Found Hub
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Community-Powered Recovery Network
        </h1>
        <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
          "Don't just report what's missing. Help it find its way home."
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-500" /> Our Mission & Vision
          </h2>
          <p>
            Traditional lost-and-found boards are static notice lists where items get forgotten. Lost & Found Hub replaces passive bulletin boards with an interactive, community-driven recovery ecosystem centered around the <strong>Missing Trail</strong>.
          </p>
          <p>
            By empowering commuters, neighbors, and airport travelers to submit timestamped sightings without needing to hold physical possession of an item, we dramatically increase recovery rates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-2">
            <GitCommit className="w-8 h-8 text-brand-500 mb-2" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">1. Missing Trail Journey</h3>
            <p className="text-xs text-slate-500">
              Every missing item gets a dedicated timeline tracking its journey: Lost → Spotted → Found → Matched → Verified → Handover → Returned.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-2">
            <Lock className="w-8 h-8 text-blue-500 mb-2" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">2. Private Ownership Verification</h3>
            <p className="text-xs text-slate-500">
              Protects item owners from fraudulent claims by enforcing secret identifying detail checks before safe handovers can be arranged.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-600 text-white font-bold text-xs shadow-lg shadow-brand-500/20 hover:bg-brand-700 transition-colors"
        >
          <Compass className="w-4 h-4" /> Explore Recovery Network
        </Link>
      </div>
    </div>
  );
};
