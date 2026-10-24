import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { SearchX, Home, Compass } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 rounded-3xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-6 border border-brand-200 dark:border-brand-800 shadow-lg">
        <SearchX className="w-10 h-10" />
      </div>

      <h1 className="text-6xl font-black text-slate-900 dark:text-white tracking-tight">404</h1>
      <h2 className="text-xl font-bold text-slate-700 dark:text-slate-200 mt-2">Page Not Found</h2>
      
      <p className="text-xs text-slate-500 max-w-sm mt-2 mb-8 leading-relaxed">
        The route or missing trail page you were looking for does not exist or has been moved.
      </p>

      <div className="flex items-center gap-3">
        <Link to="/">
          <Button variant="primary" icon={Home}>
            Go Home
          </Button>
        </Link>
        <Link to="/explore">
          <Button variant="secondary" icon={Compass}>
            Explore Reports
          </Button>
        </Link>
      </div>
    </div>
  );
};
