import React from 'react';
import { STATUSES } from '../../constants/statuses';

export const StatusBadge = ({ status, className = '' }) => {
  const statusConfig = STATUSES[status?.toUpperCase()] || {
    label: status || 'Unknown',
    badgeClass: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${statusConfig.badgeClass} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current animate-pulse"></span>
      {statusConfig.label}
    </span>
  );
};
