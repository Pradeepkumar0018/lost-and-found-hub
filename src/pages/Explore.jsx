import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLostFound } from '../context/LostFoundContext';
import { SearchBar } from '../components/reports/SearchBar';
import { FilterPanel } from '../components/reports/FilterPanel';
import { ItemCard } from '../components/reports/ItemCard';
import { MapVisualizer } from '../components/reports/MapVisualizer';
import { SightingModal } from '../components/forms/SightingModal';
import { EmptyState } from '../components/common/EmptyState';
import { LayoutGrid, List, MapPin } from 'lucide-react';

export const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { reports, addSighting } = useLostFound();

  // Search & Filter State
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'all';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedDateFilter, setSelectedDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list' | 'map'

  const [activeSightingReport, setActiveSightingReport] = useState(null);

  // Available Cities
  const availableCities = useMemo(() => {
    const cities = new Set(reports.map((r) => r.location?.city).filter(Boolean));
    return Array.from(cities);
  }, [reports]);

  // Filter & Search Logic
  const filteredReports = useMemo(() => {
    return reports
      .filter((report) => {
        // Type filter
        if (selectedType !== 'all' && report.type !== selectedType) return false;

        // Category filter
        if (selectedCategory !== 'all' && report.category !== selectedCategory) return false;

        // Status filter
        if (selectedStatus !== 'all' && report.status !== selectedStatus) return false;

        // City filter
        if (selectedCity !== 'all' && report.location?.city !== selectedCity) return false;

        // Date Filter
        if (selectedDateFilter !== 'all') {
          const reportTime = new Date(report.date || report.createdAt).getTime();
          const now = Date.now();
          const dayMs = 24 * 60 * 60 * 1000;
          const diffDays = (now - reportTime) / dayMs;

          if (selectedDateFilter === 'today' && diffDays > 1) return false;
          if (selectedDateFilter === '3days' && diffDays > 3) return false;
          if (selectedDateFilter === '7days' && diffDays > 7) return false;
          if (selectedDateFilter === '30days' && diffDays > 30) return false;
        }

        // Text Search Filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = report.item?.name?.toLowerCase().includes(q);
          const matchBrand = report.item?.brand?.toLowerCase().includes(q);
          const matchDesc = report.item?.description?.toLowerCase().includes(q);
          const matchArea = report.location?.area?.toLowerCase().includes(q);
          const matchCity = report.location?.city?.toLowerCase().includes(q);
          const matchId = report.id?.toLowerCase().includes(q);

          return matchName || matchBrand || matchDesc || matchArea || matchCity || matchId;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
        if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
        if (sortBy === 'updated') return new Date(b.updatedAt) - new Date(a.updatedAt);
        if (sortBy === 'nearest') {
          // Sort by location area / city alphabetically as simulated proximity
          const locA = `${a.location?.city || ''} ${a.location?.area || ''}`;
          const locB = `${b.location?.city || ''} ${b.location?.area || ''}`;
          return locA.localeCompare(locB);
        }
        return 0;
      });
  }, [reports, selectedType, selectedCategory, selectedStatus, selectedCity, selectedDateFilter, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSelectedCity('all');
    setSelectedDateFilter('all');
    setSortBy('newest');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Header & Search Input */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Explore Community Recovery Network
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Search {reports.length} active lost, found, and spotted items across regions
            </p>
          </div>

          {/* View Mode Toggle Switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" /> Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <List className="w-4 h-4" /> List
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'map'
                  ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <MapPin className="w-4 h-4" /> Map Pin View
            </button>
          </div>
        </div>

        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery('')}
        />
      </div>

      {/* Main Content Layout (Filter Panel + View) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar Filter */}
        <div className="lg:col-span-1">
          <FilterPanel
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            selectedDateFilter={selectedDateFilter}
            setSelectedDateFilter={setSelectedDateFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            availableCities={availableCities}
            onReset={handleResetFilters}
          />
        </div>

        {/* Right Main Listing View */}
        <div className="lg:col-span-3">
          {viewMode === 'map' ? (
            <MapVisualizer
              reports={filteredReports}
              onOpenSighting={(rep) => setActiveSightingReport(rep)}
            />
          ) : filteredReports.length === 0 ? (
            <EmptyState
              title="No reports match your filters"
              description="We couldn't find any lost or found reports matching your current search parameters."
              actionText="Reset Filters"
              onAction={handleResetFilters}
            />
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredReports.map((report) => (
                <ItemCard
                  key={report.id}
                  report={report}
                  onOpenSighting={(rep) => setActiveSightingReport(rep)}
                />
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {filteredReports.map((report) => (
                <div key={report.id} className="w-full">
                  <ItemCard
                    report={report}
                    onOpenSighting={(rep) => setActiveSightingReport(rep)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sighting Modal Container */}
      <SightingModal
        isOpen={!!activeSightingReport}
        onClose={() => setActiveSightingReport(null)}
        report={activeSightingReport}
        onSubmitSighting={addSighting}
      />
    </div>
  );
};
