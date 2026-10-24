import React from 'react';
import { CATEGORIES } from '../../constants/categories';
import { STATUSES } from '../../constants/statuses';
import { Filter, RotateCcw, Calendar, ArrowUpDown, MapPin } from 'lucide-react';

export const FilterPanel = ({
  selectedType,
  setSelectedType,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  selectedCity,
  setSelectedCity,
  selectedDateFilter,
  setSelectedDateFilter,
  sortBy,
  setSortBy,
  availableCities = [],
  onReset
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-500" />
          Filter & Sort Reports
        </h3>
        <button
          onClick={onReset}
          className="text-xs text-brand-600 dark:text-brand-400 font-semibold hover:underline flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          Reset All
        </button>
      </div>

      {/* Type Toggle: All / Lost / Found */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Report Type
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          {['all', 'lost', 'found'].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                selectedType === t
                  ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {t === 'lost' ? '🔴 Lost' : t === 'found' ? '🟢 Found' : 'All'}
            </button>
          ))}
        </div>
      </div>

      {/* Category Dropdown */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Status Filter */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Lifecycle Status
        </label>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="all">All Statuses</option>
          {Object.values(STATUSES).map((st) => (
            <option key={st.id} value={st.id}>
              {st.label}
            </option>
          ))}
        </select>
      </div>

      {/* Location / City Filter */}
      {availableCities.length > 0 && (
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-brand-500" />
            Location / City
          </label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="all">All Locations</option>
            {availableCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Date Filter */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-brand-500" />
          Date Reported
        </label>
        <select
          value={selectedDateFilter}
          onChange={(e) => setSelectedDateFilter(e.target.value)}
          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="all">Any Date</option>
          <option value="today">Today</option>
          <option value="3days">Past 3 Days</option>
          <option value="7days">Past 7 Days</option>
          <option value="30days">Past 30 Days</option>
        </select>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
          <ArrowUpDown className="w-3.5 h-3.5 text-brand-500" />
          Sort By
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="nearest">Nearest Location</option>
          <option value="updated">Recently Updated</option>
        </select>
      </div>
    </div>
  );
};
