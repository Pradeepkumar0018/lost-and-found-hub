import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLostFound } from '../context/LostFoundContext';
import { CATEGORIES } from '../constants/categories';
import { ItemCard } from '../components/reports/ItemCard';
import { SightingModal } from '../components/forms/SightingModal';
import {
  Search,
  PlusCircle,
  CheckCircle,
  GitCommit,
  Sparkles,
  Eye,
  ShieldCheck,
  CheckCheck,
  ArrowRight,
  Dog,
  HelpCircle,
  TrendingUp,
  Users,
  MapPin,
  Heart
} from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();
  const { reports, addSighting } = useLostFound();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSightingReport, setActiveSightingReport] = useState(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const recentReports = reports.slice(0, 6);

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 bg-gradient-to-b from-brand-50/50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-slate-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Top Tagline pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100/80 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-bold shadow-sm animate-pulse-subtle">
              <Sparkles className="w-4 h-4 text-brand-500" />
              Community-Powered Recovery Network
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">
              Lost something? <br />
              <span className="bg-gradient-to-r from-brand-600 via-purple-600 to-indigo-500 bg-clip-text text-transparent">
                Help it find its way home.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Don't just report what's missing. Trace every step with the <strong>Missing Trail</strong>, submit community sightings, smart match reports, and verify ownership securely.
            </p>

            {/* Search Input Bar */}
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto pt-2">
              <div className="relative flex items-center shadow-xl rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border-2 border-brand-500/40 focus-within:border-brand-500 transition-all">
                <Search className="w-6 h-6 text-brand-500 ml-4 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search lost, found or spotted items (e.g. iPhone, Passport, Milo, Keys)..."
                  className="w-full px-4 py-4 text-sm font-medium bg-transparent text-slate-900 dark:text-white focus:outline-none placeholder-slate-400"
                />
                <button
                  type="submit"
                  className="px-6 py-4 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold tracking-wide uppercase flex items-center gap-1.5 shrink-0 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/report-lost"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <PlusCircle className="w-5 h-5" />
                🔴 I Lost Something
              </Link>
              <Link
                to="/report-found"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <CheckCircle className="w-5 h-5" />
                🟢 I Found Something
              </Link>
            </div>
          </div>

          {/* Missing Trail Concept Showcase Graphic */}
          <div className="mt-14 max-w-4xl mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-600 dark:text-brand-400 flex items-center gap-1.5">
                <GitCommit className="w-4 h-4" /> Signature Feature — The Missing Trail Timeline
              </span>
              <span className="text-xs text-slate-500 font-mono">LF-20260808-1001</span>
            </div>

            {/* Simulated Live Trail Nodes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-2 text-center text-xs">
              <div className="p-3 rounded-2xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 font-bold">
                🔴 LOST
              </div>
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 font-bold">
                🟡 SPOTTED
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-bold">
                🟢 FOUND
              </div>
              <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 font-bold">
                ✨ MATCHED 92%
              </div>
              <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold">
                🔐 VERIFIED
              </div>
              <div className="p-3 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300 font-bold">
                🤝 HANDOVER
              </div>
              <div className="p-3 rounded-2xl bg-green-50 dark:bg-green-950/60 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 font-bold">
                🔵 RETURNED
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Explore Item Categories
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Browse lost and found reports grouped by item classification
            </p>
          </div>
          <Link
            to="/explore"
            className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1 mt-2 md:mt-0"
          >
            View All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/explore?category=${cat.id}`}
              className="group p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-brand-500/40 transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="w-10 h-10 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors">
                  {cat.label}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* RECENT REPORTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Recent Missing & Found Reports
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Active recovery trails requiring community sightings or ownership claims
            </p>
          </div>
          <Link
            to="/explore"
            className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1 mt-2 md:mt-0"
          >
            Explore All {reports.length} Reports <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentReports.map((report) => (
            <ItemCard
              key={report.id}
              report={report}
              onOpenSighting={(rep) => setActiveSightingReport(rep)}
            />
          ))}
        </div>
      </section>

      {/* STATISTICS COUNTER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-white shadow-2xl">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Community Recovery Impact
            </h2>
            <p className="text-xs text-slate-400">
              Real-time platform statistics driving lost item recoveries
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-brand-400">1,245</div>
              <div className="text-xs font-semibold text-slate-300">Total Reports</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400">842</div>
              <div className="text-xs font-semibold text-slate-300">Found Items</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-blue-400">531</div>
              <div className="text-xs font-semibold text-slate-300">Returned to Owner</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-amber-400">3,400+</div>
              <div className="text-xs font-semibold text-slate-300">Community Sightings</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS WORKFLOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How The Recovery Network Works
          </h2>
          <p className="text-xs text-slate-500">
            6 seamless steps from lost report to safe home return
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {[
            { step: '01', title: 'Report', desc: 'Create Lost or Found listing', icon: PlusCircle },
            { step: '02', title: 'Spot', desc: 'Community posts sightings', icon: Eye },
            { step: '03', title: 'Match', desc: 'Algorithm calculates score', icon: Sparkles },
            { step: '04', title: 'Verify', desc: 'Owner proves secret detail', icon: ShieldCheck },
            { step: '05', title: 'Handover', desc: 'Coordinate safe meetup', icon: GitCommit },
            { step: '06', title: 'Return', desc: 'Item safely reunited', icon: CheckCheck }
          ].map((st, i) => {
            const IconComp = st.icon;
            return (
              <div
                key={i}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm text-center space-y-3"
              >
                <span className="text-xs font-mono font-bold text-brand-600 dark:text-brand-400">
                  {st.step}
                </span>
                <div className="w-10 h-10 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto">
                  <IconComp className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{st.title}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">{st.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sighting Modal Container */}
      <SightingModal
        isOpen={!!activeSightingReport}
        onClose={() => setActiveSightingReport(null)}
        report={activeSightingReport}
        onSubmitSighting={addSighting}
      />
    </div>
  );
};
