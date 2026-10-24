import React from 'react';

export const Card = ({ children, className = '', hover = true, onClick, ...props }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm transition-all duration-200 ${
        hover ? 'hover:shadow-md hover:border-brand-500/30 dark:hover:border-brand-500/30' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
