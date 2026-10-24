import React from 'react';
import { REPUTATION_BADGES } from '../../constants/badges';
import { Award, ShieldCheck, Search, Sprout, Crown } from 'lucide-react';

export const ReputationBadge = ({ userReputation }) => {
  const badgeIcons = {
    Sprout,
    Search,
    ShieldCheck,
    Award,
    Crown
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          Community Reputation & Badges
        </h3>
        <span className="text-xs font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950 px-3 py-1 rounded-full border border-brand-200 dark:border-brand-800">
          Tier: {userReputation?.badgeTier || 'First Helper'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {REPUTATION_BADGES.map((b) => {
          const IconComp = badgeIcons[b.icon] || Award;
          const isUnlocked = userReputation?.badgeTier === b.title || (userReputation?.itemsReturned >= (b.minReturns || 0) && userReputation?.sightingsSubmitted >= (b.minSightings || 0));

          return (
            <div
              key={b.id}
              className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all ${
                isUnlocked
                  ? 'bg-amber-50/70 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-50'
              }`}
            >
              <div className={`p-2.5 rounded-xl ${isUnlocked ? 'bg-amber-500 text-white shadow' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                <IconComp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{b.title}</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">{b.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
