import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLostFound } from '../context/LostFoundContext';
import { StatsOverview } from '../components/dashboard/StatsOverview';
import { ReputationBadge } from '../components/dashboard/ReputationBadge';
import { ItemCard } from '../components/reports/ItemCard';
import { Button } from '../components/common/Button';
import {
  LayoutDashboard,
  PlusCircle,
  CheckCircle,
  Search,
  Bell,
  Sparkles,
  GitCommit,
  Compass,
  Eye,
  CheckCheck,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export const Dashboard = () => {
  const { currentUser } = useAuth();
  const { reports, getMatches } = useLostFound();

  // User's own reports simulation
  const myReports = reports.filter(
    (r) =>
      r.reporter?.email === currentUser?.email ||
      r.reporter?.name === currentUser?.name ||
      (currentUser?.email === 'rohan.sharma@example.com' && r.reporter?.name === 'Rohan Sharma')
  );

  const userLostCount = myReports.filter((r) => r.type === 'lost').length;
  const userFoundCount = myReports.filter((r) => r.type === 'found').length;
  const userSightingsCount = currentUser?.reputation?.sightingsSubmitted || 4;
  const userClaimsCount = myReports.reduce((acc, r) => acc + (r.claims?.length || 0), 0);
  const userReturnedCount = myReports.filter((r) => r.status === 'returned' || r.status === 'reunited').length;

  // Potential matches for user's lost reports
  const userLostReports = myReports.filter((r) => r.type === 'lost' && r.status !== 'returned');
  const userMatches = userLostReports.flatMap((lr) =>
    getMatches(lr.id).map((m) => ({ ...m, sourceItem: lr }))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Welcome Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
            alt={currentUser?.name}
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-brand-500/20"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Welcome back, {currentUser?.name || 'Helper'} 👋
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {currentUser?.email} • {currentUser?.reputation?.badgeTier || 'Community Helper'}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <Link to="/report-lost">
            <Button variant="primary" className="bg-red-600 hover:bg-red-700" size="sm" icon={PlusCircle}>
              Report Lost
            </Button>
          </Link>
          <Link to="/report-found">
            <Button variant="primary" className="bg-emerald-600 hover:bg-emerald-700" size="sm" icon={CheckCircle}>
              Report Found
            </Button>
          </Link>
          <Link to="/explore">
            <Button variant="secondary" size="sm" icon={Compass}>
              Explore
            </Button>
          </Link>
        </div>
      </div>

      {/* User Personal Metric Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-1">
          <span className="text-[11px] font-bold text-red-600 dark:text-red-400 uppercase">Lost Reports</span>
          <div className="text-xl font-black text-slate-900 dark:text-white">{userLostCount}</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-1">
          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">Found Reports</span>
          <div className="text-xl font-black text-slate-900 dark:text-white">{userFoundCount}</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-1">
          <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase">Sightings</span>
          <div className="text-xl font-black text-slate-900 dark:text-white">{userSightingsCount}</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-1">
          <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase">Claims</span>
          <div className="text-xl font-black text-slate-900 dark:text-white">{userClaimsCount}</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-1 col-span-2 sm:col-span-1">
          <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase">Returned</span>
          <div className="text-xl font-black text-slate-900 dark:text-white">{userReturnedCount}</div>
        </div>
      </div>

      {/* Global Stats Overview */}
      <StatsOverview reports={reports} />

      {/* Reputation & Badges Section */}
      <ReputationBadge userReputation={currentUser?.reputation} />

      {/* AI Smart Matches For User's Lost Items */}
      {userMatches.length > 0 && (
        <div className="bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-purple-900 dark:text-purple-200 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600 animate-pulse" />
              Possible Smart Matches Detected For Your Reports
            </h3>
            <span className="text-xs font-bold text-purple-600">{userMatches.length} Found Matches</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userMatches.slice(0, 4).map((m, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-purple-200 dark:border-purple-800 flex items-center justify-between gap-4 shadow-sm"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {m.overallConfidence}% Match
                    </span>
                    <span className="text-xs text-slate-500 font-medium truncate">
                      For: {m.sourceItem.item?.name}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Found Item: {m.candidateItem.item?.name} ({m.candidateItem.id})
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Location: {m.candidateItem.location?.area}, {m.candidateItem.location?.city}
                  </p>
                </div>

                <Link
                  to={`/item/${m.candidateId}`}
                  className="px-3 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 shrink-0"
                >
                  Verify Match
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* User's Reports Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <GitCommit className="w-5 h-5 text-brand-500" />
            My Active Recovery Trails ({myReports.length})
          </h3>
          <Link to="/my-reports" className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1">
            Manage All My Reports <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {myReports.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-3">
            <Search className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-xs text-slate-500">You haven't created any reports yet.</p>
            <div className="flex justify-center gap-2">
              <Link to="/report-lost">
                <Button size="sm" variant="primary" className="bg-red-600">Report Lost Item</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myReports.map((report) => (
              <ItemCard key={report.id} report={report} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
