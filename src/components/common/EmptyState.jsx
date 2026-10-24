import React from 'react';
import { SearchX } from 'lucide-react';
import { Button } from './Button';

export const EmptyState = ({
  title = 'No reports found',
  description = 'Try adjusting your search query or clear existing filters.',
  actionText,
  onAction,
  icon: Icon = SearchX
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-3xl my-6 backdrop-blur-sm">
      <div className="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800/60 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-4 shadow-sm">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 max-w-md text-sm mb-6 leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <Button onClick={onAction} variant="primary">
          {actionText}
        </Button>
      )}
    </div>
  );
};
