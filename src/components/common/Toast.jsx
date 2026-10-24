import React from 'react';
import { useLostFound } from '../../context/LostFoundContext';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useLostFound();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start justify-between gap-3 p-4 rounded-xl shadow-xl border backdrop-blur-md animate-slide-up transition-all ${
            toast.type === 'error'
              ? 'bg-red-50/95 dark:bg-red-950/95 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
              : toast.type === 'info'
              ? 'bg-blue-50/95 dark:bg-blue-950/95 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200'
              : 'bg-emerald-50/95 dark:bg-emerald-950/95 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
          }`}
        >
          <div className="flex items-start gap-2.5">
            {toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            ) : toast.type === 'info' ? (
              <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            )}
            <p className="text-sm font-medium leading-relaxed">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-0.5 shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
