import React from 'react';
import { TRAIL_STAGES, PET_TRAIL_STAGES } from '../../constants/statuses';
import { Check } from 'lucide-react';

export const TrailStatusTracker = ({ currentStatus, category }) => {
  const isPet = category === 'pet';
  const stages = isPet ? PET_TRAIL_STAGES : TRAIL_STAGES;

  const getStageIndex = (statusKey) => {
    const s = statusKey?.toLowerCase();
    if (s === 'returned' || s === 'reunited') return stages.length - 1;
    const idx = stages.findIndex((st) => st.key === s);
    return idx >= 0 ? idx : 0;
  };

  const currentIndex = getStageIndex(currentStatus);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xs font-extrabold uppercase tracking-widest text-brand-600 dark:text-brand-400">
          Missing Trail Lifecycle Progress
        </h4>
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
          Stage {currentIndex + 1} of {stages.length}
        </span>
      </div>

      {/* Responsive Horizontal Tracker Bar */}
      <div className="relative">
        {/* Progress Background Line */}
        <div className="absolute top-4 left-4 right-4 h-1 bg-slate-200 dark:bg-slate-800 -z-0" />
        
        {/* Active Progress Colored Line */}
        <div
          className="absolute top-4 left-4 h-1 bg-gradient-to-r from-brand-600 via-purple-500 to-emerald-500 transition-all duration-500 -z-0"
          style={{ width: `${(currentIndex / (stages.length - 1)) * 95}%` }}
        />

        <div className="grid grid-cols-5 md:grid-cols-7 gap-2 relative z-10">
          {stages.map((stage, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;

            return (
              <div key={stage.key} className="flex flex-col items-center text-center group">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    isCompleted
                      ? 'bg-emerald-500 text-white ring-4 ring-emerald-100 dark:ring-emerald-950'
                      : isCurrent
                      ? 'bg-brand-600 text-white ring-4 ring-brand-200 dark:ring-brand-900 animate-bounce-slow scale-110'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
                </div>

                <span
                  className={`mt-2 text-[11px] font-bold tracking-tight block ${
                    isCurrent
                      ? 'text-brand-600 dark:text-brand-400 font-extrabold'
                      : isCompleted
                      ? 'text-slate-800 dark:text-slate-200'
                      : 'text-slate-400 dark:text-slate-600'
                  }`}
                >
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
