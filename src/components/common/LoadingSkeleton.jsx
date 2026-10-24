import React from 'react';

export const LoadingSkeleton = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm animate-pulse space-y-4">
          <div className="w-full h-48 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
          <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
          <div className="flex justify-between items-center pt-2">
            <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-full" />
            <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
};
