import React, { useState } from 'react';
import { useLostFound } from '../context/LostFoundContext';
import { ItemCard } from '../components/reports/ItemCard';
import { SightingModal } from '../components/forms/SightingModal';
import { Link } from 'react-router-dom';
import { Dog, Heart, PlusCircle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';

export const Pets = () => {
  const { reports, addSighting } = useLostFound();
  const [activeSightingReport, setActiveSightingReport] = useState(null);

  const petReports = reports.filter((r) => r.category === 'pet');
  const missingPetsCount = petReports.filter((r) => r.type === 'lost' && r.status !== 'reunited').length;
  const reunitedPetsCount = petReports.filter((r) => r.status === 'reunited').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Pet Hub Hero Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white uppercase tracking-wider">
            <Dog className="w-4 h-4" /> Dedicated Pet Mode
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            🐾 Community Pet Recovery Hub
          </h1>

          <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
            Missing pets require urgent community eyes. Track missing dogs, cats, and domestic pets with specialized Pet Missing Trails and community neighbor sightings.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              to="/report-lost"
              className="px-5 py-2.5 rounded-xl bg-white text-amber-900 text-xs font-extrabold hover:bg-amber-50 shadow-md transition-all flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4 text-red-600" />
              Report Lost Pet
            </Link>
          </div>
        </div>

        <Dog className="absolute -right-8 -bottom-8 w-64 h-64 text-white/10 pointer-events-none" />
      </div>

      {/* Pet Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex items-center gap-3">
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950 text-red-600">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{missingPetsCount}</span>
            <span className="text-xs text-slate-500 block font-semibold">Active Missing Pets</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex items-center gap-3">
          <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{reunitedPetsCount}</span>
            <span className="text-xs text-slate-500 block font-semibold">Happily Reunited 🐾</span>
          </div>
        </div>
      </div>

      {/* Pet Reports Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Dog className="w-5 h-5 text-amber-500" />
          Pet Reports ({petReports.length})
        </h3>

        {petReports.length === 0 ? (
          <EmptyState
            title="No Pet Reports Currently"
            description="There are currently no missing pet reports."
            icon={Dog}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {petReports.map((report) => (
              <ItemCard
                key={report.id}
                report={report}
                onOpenSighting={(rep) => setActiveSightingReport(rep)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Sighting Modal */}
      <SightingModal
        isOpen={!!activeSightingReport}
        onClose={() => setActiveSightingReport(null)}
        report={activeSightingReport}
        onSubmitSighting={addSighting}
      />
    </div>
  );
};
