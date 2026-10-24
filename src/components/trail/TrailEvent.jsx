import React from 'react';
import { StatusBadge } from '../common/Badge';
import { formatDate, formatTimeAgo } from '../../utils/dateFormatter';
import {
  AlertCircle,
  Eye,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Handshake,
  CheckCheck,
  Heart,
  MapPin,
  Clock,
  UserCheck
} from 'lucide-react';

export const TrailEvent = ({ event, isLast = false }) => {
  if (!event) return null;

  const getEventIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'lost':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'spotted':
        return <Eye className="w-5 h-5 text-amber-500" />;
      case 'found':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'matched':
        return <Sparkles className="w-5 h-5 text-purple-500" />;
      case 'verified':
        return <ShieldCheck className="w-5 h-5 text-blue-500" />;
      case 'handover':
        return <Handshake className="w-5 h-5 text-cyan-500" />;
      case 'returned':
        return <CheckCheck className="w-5 h-5 text-emerald-500" />;
      case 'reunited':
        return <Heart className="w-5 h-5 text-teal-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-brand-500" />;
    }
  };

  return (
    <div className="relative pl-8 pb-8 group">
      {/* Vertical Connecting Line */}
      {!isLast && (
        <span className="absolute top-6 left-3.5 -ml-px h-full w-0.5 bg-slate-200 dark:bg-slate-800 group-hover:bg-brand-500/50 transition-colors" />
      )}

      {/* Node Bullet Icon Container */}
      <div className="absolute top-0 left-0 w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform z-10">
        {getEventIcon(event.status)}
      </div>

      {/* Event Details Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <StatusBadge status={event.status} />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">{event.title}</h4>
          </div>

          <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {formatTimeAgo(event.timestamp)} ({formatDate(event.timestamp)})
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          {event.description}
        </p>

        {/* Optional Event Photo Preview */}
        {event.image && (
          <div className="mt-2 w-full max-w-sm h-40 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Footer info: Contributor & Location */}
        <div className="pt-2 flex flex-wrap items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 gap-2">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-brand-500" />
            {event.location}
          </span>
          <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
            <UserCheck className="w-3.5 h-3.5 text-brand-500" />
            {event.contributor}
          </span>
        </div>
      </div>
    </div>
  );
};
