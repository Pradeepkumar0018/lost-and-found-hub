import React from 'react';
import { AlertCircle, CheckCircle2, Eye, CheckCheck, Sparkles, Heart } from 'lucide-react';

export const StatsOverview = ({ reports = [] }) => {
  const lostCount = reports.filter((r) => r.type === 'lost' && r.status !== 'returned' && r.status !== 'reunited').length;
  const foundCount = reports.filter((r) => r.type === 'found' && r.status !== 'returned' && r.status !== 'reunited').length;
  const sightingsCount = reports.reduce((acc, r) => acc + (r.sightings?.length || 0), 0);
  const returnedCount = reports.filter((r) => r.status === 'returned' || r.status === 'reunited').length;

  const stats = [
    { label: 'Active Lost Reports', value: lostCount, icon: AlertCircle, color: 'text-red-500 bg-red-50 dark:bg-red-950/60' },
    { label: 'Active Found Items', value: foundCount, icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60' },
    { label: 'Community Sightings', value: sightingsCount, icon: Eye, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60' },
    { label: 'Items Recovered & Returned', value: returnedCount, icon: CheckCheck, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/60' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((st, i) => {
        const IconComp = st.icon;
        return (
          <div
            key={i}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-2 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {st.label}
              </span>
              <div className={`p-2 rounded-xl ${st.color}`}>
                <IconComp className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {st.value}
            </div>
          </div>
        );
      })}
    </div>
  );
};
