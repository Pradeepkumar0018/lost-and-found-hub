import React from 'react';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../common/Badge';
import { formatDate, formatTimeAgo } from '../../utils/dateFormatter';
import { getCategoryById } from '../../constants/categories';
import { MapPin, Calendar, Eye, GitCommit, Sparkles } from 'lucide-react';

export const ItemCard = ({ report, onOpenSighting, matchScore }) => {
  if (!report) return null;

  const category = getCategoryById(report.category);
  const isLost = report.type === 'lost';

  return (
    <div className="group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-500/40 dark:hover:border-brand-500/40 transition-all duration-300 flex flex-col h-full relative">
      
      {/* Image Banner & Overlay Badges */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={report.item.image || 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80'}
          alt={report.item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <StatusBadge status={report.status} />
          {report.category === 'pet' && (
            <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
              🐾 Pet Mode
            </span>
          )}
        </div>

        {matchScore && (
          <div className="absolute top-3 right-3 bg-purple-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            {matchScore}% Match
          </div>
        )}

        {/* Bottom Image Overlay text */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1">
            <span>{category.label}</span>
          </span>
          <h3 className="text-base font-bold truncate leading-tight group-hover:text-brand-300 transition-colors">
            {report.item.name}
          </h3>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {report.item.description}
        </p>

        {/* Location & Date */}
        <div className="space-y-1.5 pt-1 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0" />
            <span className="truncate">{report.location.area}, {report.location.city}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{formatDate(report.date)}</span>
            </div>
            <span className="text-[11px] text-slate-400">{formatTimeAgo(report.createdAt)}</span>
          </div>
        </div>

        {/* Missing Trail Event Count Indicator */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <GitCommit className="w-3.5 h-3.5 text-brand-500" />
            Missing Trail: <strong className="text-slate-700 dark:text-slate-200">{report.trail?.length || 1} events</strong>
          </span>

          {report.sightings?.length > 0 && (
            <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800/60">
              👀 {report.sightings.length} Sightings
            </span>
          )}
        </div>

        {/* Card Action Buttons */}
        <div className="pt-2 flex items-center gap-2">
          <Link
            to={`/item/${report.id}`}
            className="flex-1 text-center py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1"
          >
            <GitCommit className="w-3.5 h-3.5 text-brand-500" />
            View Trail
          </Link>

          {isLost && report.status !== 'returned' && report.status !== 'reunited' && (
            <button
              onClick={() => onOpenSighting && onOpenSighting(report)}
              className="py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 text-amber-700 dark:text-amber-300 text-xs font-semibold transition-colors flex items-center justify-center gap-1 border border-amber-200 dark:border-amber-800/60"
              title="I Saw This Item"
            >
              <Eye className="w-3.5 h-3.5" />
              I Saw This
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
