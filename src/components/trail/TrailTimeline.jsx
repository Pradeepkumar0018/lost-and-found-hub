import React from 'react';
import { TrailEvent } from './TrailEvent';
import { GitCommit, Sparkles } from 'lucide-react';

export const TrailTimeline = ({ trail = [] }) => {
  if (!trail || trail.length === 0) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
        <GitCommit className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          No events recorded on this Missing Trail yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-500" />
          The Missing Trail Journey ({trail.length} Milestone{trail.length > 1 ? 's' : ''})
        </h3>
        <span className="text-xs font-semibold text-slate-500">Chronological Lifecycle</span>
      </div>

      <div className="pt-2">
        {trail.map((event, index) => (
          <TrailEvent
            key={event.id || index}
            event={event}
            isLast={index === trail.length - 1}
          />
        ))}
      </div>
    </div>
  );
};
