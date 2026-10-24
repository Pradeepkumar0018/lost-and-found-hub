import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLostFound } from '../context/LostFoundContext';
import { ItemCard } from '../components/reports/ItemCard';
import { EmptyState } from '../components/common/EmptyState';
import { SightingModal } from '../components/forms/SightingModal';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import {
  Trash2,
  Eye,
  GitCommit,
  CheckCheck,
  Edit3,
  XCircle,
  ExternalLink,
  PlusCircle,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const MyReports = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { reports, deleteReport, updateReport, closeReport, addSighting, markAsReturned } = useLostFound();
  
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'lost' | 'found' | 'spotted' | 'returned'
  const [activeSightingReport, setActiveSightingReport] = useState(null);

  // Edit Modal State
  const [editingReport, setEditingReport] = useState(null);
  const [editName, setEditName] = useState('');
  const [editBrand, setEditBrand] = useState('');
  const [editModel, setEditModel] = useState('');
  const [editColor, setEditColor] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editArea, setEditArea] = useState('');
  const [editCity, setEditCity] = useState('');

  // User's own reports
  const userReports = reports.filter(
    (r) =>
      r.reporter?.email === currentUser?.email ||
      r.reporter?.name === currentUser?.name ||
      // Also show demo reports if logged in as demo user
      (currentUser?.email === 'rohan.sharma@example.com' && r.reporter?.name === 'Rohan Sharma')
  );

  const filteredReports = userReports.filter((r) => {
    if (activeTab === 'lost') return r.type === 'lost' && r.status !== 'returned' && r.status !== 'reunited' && r.status !== 'closed';
    if (activeTab === 'found') return r.type === 'found' && r.status !== 'returned' && r.status !== 'reunited' && r.status !== 'closed';
    if (activeTab === 'spotted') return r.status === 'spotted' || (r.sightings && r.sightings.length > 0);
    if (activeTab === 'returned') return r.status === 'returned' || r.status === 'reunited';
    return true;
  });

  const handleOpenEdit = (report) => {
    setEditingReport(report);
    setEditName(report.item?.name || '');
    setEditBrand(report.item?.brand || '');
    setEditModel(report.item?.model || '');
    setEditColor(report.item?.color || '');
    setEditDescription(report.item?.description || '');
    setEditArea(report.location?.area || '');
    setEditCity(report.location?.city || '');
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editName.trim() || !editDescription.trim()) return;

    updateReport(editingReport.id, {
      item: {
        name: editName.trim(),
        brand: editBrand.trim(),
        model: editModel.trim(),
        color: editColor.trim(),
        description: editDescription.trim()
      },
      location: {
        area: editArea.trim(),
        city: editCity.trim()
      },
      editSummary: `Updated description and location details to: ${editArea}, ${editCity}.`
    });

    setEditingReport(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My Recovery Reports ({userReports.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your submitted Lost & Found listings, view sightings, edit details, and track Missing Trails.
          </p>
        </div>

        <div className="flex gap-2">
          <Link to="/report-lost">
            <Button size="sm" variant="primary" className="bg-red-600 hover:bg-red-700" icon={PlusCircle}>
              Report Lost
            </Button>
          </Link>
          <Link to="/report-found">
            <Button size="sm" variant="primary" className="bg-emerald-600 hover:bg-emerald-700" icon={CheckCircle}>
              Report Found
            </Button>
          </Link>
        </div>
      </div>

      {/* 5 Required Tabs: All, Lost, Found, Spotted, Returned */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        {[
          { key: 'all', label: 'All Reports' },
          { key: 'lost', label: '🔴 Lost' },
          { key: 'found', label: '🟢 Found' },
          { key: 'spotted', label: '🟡 Spotted' },
          { key: 'returned', label: '🔵 Returned / Reunited' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.key
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Reports Grid */}
      {filteredReports.length === 0 ? (
        <EmptyState
          title="No Reports Found in this View"
          description="You don't have any reports matching the selected category tab."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <div key={report.id} className="relative group flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <ItemCard
                report={report}
                onOpenSighting={(rep) => setActiveSightingReport(rep)}
              />
              
              {/* Comprehensive Action Toolbar */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5">
                  <Link
                    to={`/item/${report.id}`}
                    className="p-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-brand-600 font-semibold flex items-center gap-1 border border-slate-200 dark:border-slate-600 shadow-sm"
                    title="View Item"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> View
                  </Link>

                  <Link
                    to={`/trail/${report.id}`}
                    className="p-1.5 rounded-lg bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 hover:underline font-semibold flex items-center gap-1 border border-slate-200 dark:border-slate-600 shadow-sm"
                    title="View Missing Trail"
                  >
                    <GitCommit className="w-3.5 h-3.5" /> Trail
                  </Link>

                  <button
                    onClick={() => handleOpenEdit(report)}
                    className="p-1.5 rounded-lg bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 font-semibold flex items-center gap-1 border border-slate-200 dark:border-slate-600 shadow-sm"
                    title="Edit Report"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  {report.status !== 'returned' && report.status !== 'reunited' && report.status !== 'closed' && (
                    <>
                      <button
                        onClick={() => markAsReturned(report.id)}
                        className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 font-semibold flex items-center gap-1 border border-emerald-200 dark:border-emerald-800"
                        title="Mark Returned"
                      >
                        <CheckCheck className="w-3.5 h-3.5" /> Returned
                      </button>

                      <button
                        onClick={() => closeReport(report.id)}
                        className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 font-semibold flex items-center gap-1"
                        title="Close Report"
                      >
                        <XCircle className="w-3.5 h-3.5" /> Close
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => deleteReport(report.id)}
                    className="p-1.5 rounded-lg bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-300 hover:bg-red-100 font-semibold flex items-center gap-1 border border-red-200 dark:border-red-800"
                    title="Delete Report"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Report Modal */}
      {editingReport && (
        <Modal
          isOpen={!!editingReport}
          onClose={() => setEditingReport(null)}
          title={`Edit Report: ${editingReport.id}`}
        >
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Item Name / Title *
              </label>
              <input
                type="text"
                required
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Brand
                </label>
                <input
                  type="text"
                  value={editBrand}
                  onChange={(e) => setEditBrand(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Model
                </label>
                <input
                  type="text"
                  value={editModel}
                  onChange={(e) => setEditModel(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Color
                </label>
                <input
                  type="text"
                  value={editColor}
                  onChange={(e) => setEditColor(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Area / Venue *
                </label>
                <input
                  type="text"
                  required
                  value={editArea}
                  onChange={(e) => setEditArea(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={editCity}
                  onChange={(e) => setEditCity(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Description *
              </label>
              <textarea
                rows={3}
                required
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setEditingReport(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Sighting Modal */}
      <SightingModal
        isOpen={!!activeSightingReport}
        onClose={() => setActiveSightingReport(null)}
        report={activeSightingReport}
        onSubmitSighting={addSighting}
      />
    </div>
  );
};
