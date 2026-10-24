import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, Shield, Compass, Sparkles, Dog, HelpCircle } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 transition-colors pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/25">
                <Search className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                LOST & FOUND <span className="text-brand-400">HUB</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Don't just report what's missing. Help it find its way home. Driven by community sightings, Missing Trail timelines, smart matching, and secure ownership verification.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Community Network Active
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Quick Navigation</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/explore" className="hover:text-brand-400 transition-colors flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" /> Explore All Reports
                </Link>
              </li>
              <li>
                <Link to="/pets" className="hover:text-brand-400 transition-colors flex items-center gap-1.5">
                  <Dog className="w-3.5 h-3.5 text-amber-400" /> Pet Recovery Hub
                </Link>
              </li>
              <li>
                <Link to="/mystery-items" className="hover:text-brand-400 transition-colors flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-purple-400" /> Mystery Items
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-brand-400 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> How Missing Trail Works
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-400 transition-colors flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-blue-400" /> About Our Platform
                </Link>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Community Actions</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/report-lost" className="hover:text-red-400 transition-colors flex items-center gap-1">
                  🔴 Report a Lost Item
                </Link>
              </li>
              <li>
                <Link to="/report-found" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  🟢 Report a Found Item
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-brand-400 transition-colors flex items-center gap-1">
                  📊 User Dashboard & Claims
                </Link>
              </li>
              <li>
                <Link to="/notifications" className="hover:text-brand-400 transition-colors flex items-center gap-1">
                  🔔 Activity Notifications
                </Link>
              </li>
            </ul>
          </div>

          {/* Core USP Missing Trail Banner */}
          <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-4 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-brand-400" /> The Missing Trail
            </h4>
            <p className="text-[11px] text-slate-300 leading-normal">
              Every missing item has a story. Every sighting can help. Every trail can lead home.
            </p>
            <div className="text-[10px] text-slate-400 font-mono pt-1">
              LOST → SPOTTED → FOUND → MATCHED → VERIFIED → HANDOVER → RETURNED
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Lost & Found Hub. Autonomous Production Frontend Application.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            <span>for community recovery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
