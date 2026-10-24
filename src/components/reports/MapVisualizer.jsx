import React, { useState } from 'react';
import { MapPin, Navigation, Eye, GitCommit, Layers } from 'lucide-react';
import { StatusBadge } from '../common/Badge';
import { Link } from 'react-router-dom';

export const MapVisualizer = ({ reports = [], onOpenSighting }) => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [mapCity, setMapCity] = useState('all');

  const filteredReports = reports.filter((r) => {
    if (mapCity !== 'all' && r.location?.city !== mapCity) return false;
    return true;
  });

  const getPinColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'lost':
        return 'bg-red-500 text-white ring-red-300';
      case 'spotted':
        return 'bg-amber-500 text-white ring-amber-300';
      case 'found':
        return 'bg-emerald-500 text-white ring-emerald-300';
      case 'returned':
      case 'reunited':
        return 'bg-blue-500 text-white ring-blue-300';
      default:
        return 'bg-brand-500 text-white ring-brand-300';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-lg relative">
      {/* Map Control Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Navigation className="w-5 h-5 text-brand-500 animate-pulse" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Community Pin Visualization ({filteredReports.length} Items)
          </h3>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-red-600 dark:text-red-400">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Lost
          </span>
          <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Spotted
          </span>
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Found
          </span>
          <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Returned
          </span>
        </div>
      </div>

      {/* Mock Interactive Canvas Map */}
      <div className="relative h-[480px] w-full bg-slate-900 overflow-hidden flex items-center justify-center">
        {/* Map Grid Pattern background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(#818cf8 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Simulated Map Topography Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none stroke-brand-400 fill-none" strokeWidth="1">
          <path d="M0,100 Q300,50 600,200 T1200,100" />
          <path d="M0,250 Q400,350 800,200 T1200,400" />
          <path d="M100,0 Q200,400 400,480" />
          <path d="M700,0 Q600,250 900,480" />
        </svg>

        {/* City Filter Pills */}
        <div className="absolute top-4 left-4 z-10 flex gap-1.5 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700">
          {['all', 'Chennai', 'Bengaluru', 'New Delhi', 'Mumbai'].map((city) => (
            <button
              key={city}
              onClick={() => setMapCity(city)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize transition-all ${
                mapCity === city
                  ? 'bg-brand-600 text-white shadow'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Dynamic Pins */}
        <div className="absolute inset-0 p-12">
          {filteredReports.map((report, idx) => {
            // Generate pseudo-coordinates relative offset inside map viewport
            const topPercent = 20 + ((idx * 27) % 60);
            const leftPercent = 15 + ((idx * 33) % 70);

            return (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report)}
                style={{ top: `${topPercent}%`, left: `${leftPercent}%` }}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg ring-4 transition-all duration-300 hover:scale-125 z-20 group ${getPinColor(
                  report.status
                )}`}
                title={`${report.item.name} (${report.location.area})`}
              >
                <MapPin className="w-5 h-5 animate-bounce-slow" />
                {/* Tooltip on hover */}
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white text-[11px] font-bold py-1 px-2.5 rounded-lg whitespace-nowrap shadow-xl border border-slate-700 pointer-events-none">
                  {report.item.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Item Popup Modal Card */}
        {selectedReport && (
          <div className="absolute bottom-6 left-6 right-6 max-w-md mx-auto bg-slate-900/95 backdrop-blur-md border border-slate-700 text-white rounded-2xl p-4 shadow-2xl z-30 animate-slide-up">
            <div className="flex items-start justify-between gap-3">
              <div className="flex gap-3">
                <img
                  src={selectedReport.item.image}
                  alt={selectedReport.item.name}
                  className="w-16 h-16 rounded-xl object-cover ring-2 ring-slate-700"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <StatusBadge status={selectedReport.status} />
                    <span className="text-[10px] text-slate-400 font-mono">{selectedReport.id}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{selectedReport.item.name}</h4>
                  <p className="text-xs text-slate-300 line-clamp-1">{selectedReport.location.area}, {selectedReport.location.city}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedReport(null)}
                className="text-slate-400 hover:text-white text-xs font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
              <Link
                to={`/item/${selectedReport.id}`}
                className="flex-1 py-1.5 text-center bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <GitCommit className="w-3.5 h-3.5" />
                View Missing Trail
              </Link>
              {selectedReport.type === 'lost' && (
                <button
                  onClick={() => {
                    if (onOpenSighting) onOpenSighting(selectedReport);
                    setSelectedReport(null);
                  }}
                  className="py-1.5 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Spot
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
