import React from 'react';
import { Link } from 'react-router-dom';
import { formatTimeAgo } from '../../utils/dateFormatter';
import { Eye, Sparkles, CheckCheck, Info, X } from 'lucide-react';

export const NotificationItem = ({ notification, onMarkRead, onClear }) => {
  if (!notification) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'sighting':
        return <Eye className="w-4 h-4 text-amber-500" />;
      case 'match':
        return <Sparkles className="w-4 h-4 text-purple-500" />;
      case 'returned':
        return <CheckCheck className="w-4 h-4 text-emerald-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div
      className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
        notification.read
          ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-80'
          : 'bg-brand-50/60 dark:bg-brand-950/40 border-brand-200 dark:border-brand-800 shadow-sm'
      }`}
    >
      <div className="flex items-start gap-3 flex-1">
        <div className="p-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 shrink-0 mt-0.5">
          {getIcon(notification.type)}
        </div>

        <div className="space-y-1">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
            {notification.title}
            {!notification.read && (
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            )}
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {notification.message}
          </p>

          <div className="flex items-center gap-3 pt-1 text-[11px]">
            <span className="text-slate-400">{formatTimeAgo(notification.timestamp)}</span>
            {notification.link && (
              <Link
                to={notification.link}
                onClick={() => onMarkRead(notification.id)}
                className="text-brand-600 dark:text-brand-400 font-bold hover:underline"
              >
                View Details →
              </Link>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={() => onClear(notification.id)}
        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
        title="Remove"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
