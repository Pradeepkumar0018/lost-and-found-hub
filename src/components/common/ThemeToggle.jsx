import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className={`p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 border border-slate-200/80 dark:border-slate-800 shadow-sm ${className}`}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-amber-400 animate-fade-in" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700 animate-fade-in" />
      )}
    </button>
  );
};
