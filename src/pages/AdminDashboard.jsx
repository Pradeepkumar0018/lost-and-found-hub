import React, { useState } from 'react';
import { useLostFound } from '../context/LostFoundContext';
import { StatusBadge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import {
  Shield,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Users,
  FileText,
  Search,
  Flag,
  UserX,
  UserCheck,
  ExternalLink,
  Eye,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_COMMUNITY_USERS = [
  { id: 'usr-101', name: 'Rohan Sharma', email: 'rohan.sharma@example.com', role: 'Helper', reputation: 'Sharp Eye', sightings: 4, returns: 2, status: 'active' },
  { id: 'usr-102', name: 'Priya Sundaram', email: 'priya.s@example.com', role: 'Member', reputation: 'First Helper', sightings: 1, returns: 0, status: 'active' },
  { id: 'usr-103', name: 'Vikram Patel', email: 'vikram.p@example.com', role: 'Finder', reputation: 'Trusted Finder', sightings: 3, returns: 1, status: 'active' },
  { id: 'usr-104', name: 'Rahul Verma', email: 'rahul.verma@example.com', role: 'Member', reputation: '5 Items Returned', sightings: 8, returns: 5, status: 'active' },
  { id: 'usr-105', name: 'Amitabh Sen', email: 'amitabh.sen@example.com', role: 'Member', reputation: 'Community Guardian', sightings: 12, returns: 7, status: 'active' },
  { id: 'usr-106', name: 'Sneha Kapur', email: 'sneha.k@example.com', role: 'Finder', reputation: 'Trusted Finder', sightings: 2, returns: 1, status: 'active' },
  { id: 'usr-107', name: 'Suspicious Bot Account', email: 'bot_spammer@scam.xyz', role: 'Flagged', reputation: 'None', sightings: 0, returns: 0, status: 'suspended' },
];

export const AdminDashboard = () => {
  const { reports, deleteReport, approveReport, flagReport, showToast } = useLostFound();
  
  const [activeTab, setActiveTab] = useState('moderation'); // 'moderation' | 'flagged' | 'users'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [usersList, setUsersList] = useState(MOCK_COMMUNITY_USERS);

  // Stats calculation
  const totalCount = reports.length;
  const lostCount = reports.filter((r) => r.type === 'lost').length;
  const foundCount = reports.filter((r) => r.type === 'found').length;
  const spottedCount = reports.filter((r) => r.status === 'spotted').length;
  const returnedCount = reports.filter((r) => r.status === 'returned' || r.status === 'reunited').length;
  const pendingCount = reports.filter((r) => r.status === 'found' || r.flagged).length;

  const filteredReports = reports.filter((r) => {
    if (filterType !== 'all' && r.type !== filterType) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        r.item?.name?.toLowerCase().includes(q) ||
        r.id?.toLowerCase().includes(q) ||
        r.reporter?.name?.toLowerCase().includes(q) ||
        r.location?.city?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const flaggedReports = reports.filter((r) => r.flagged || r.status === 'spotted');

  const toggleUserStatus = (userId) => {
    setUsersList((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const next = u.status === 'active' ? 'suspended' : 'active';
          showToast(`User ${u.name} status updated to: ${next.toUpperCase()}`, next === 'active' ? 'success' : 'info');
          return { ...u, status: next };
        }
        return u;
      })
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 border border-purple-800 rounded-3xl p-8 text-white space-y-3 shadow-xl">
        <div className="flex items-center gap-2 text-purple-300 font-bold text-xs uppercase tracking-wider">
          <Shield className="w-5 h-5 text-purple-400" /> Administrative Moderation Portal
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">Platform Admin & Content Governance</h1>
        <p className="text-xs text-purple-200 max-w-2xl leading-relaxed">
          Review community reports, verify ownership integrity, moderate flagged submissions, and manage platform contributors.
        </p>
      </div>

      {/* 6 Required Admin Stats: Total, Lost, Found, Spotted, Returned, Pending */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl">
          <span className="text-[11px] text-slate-500 font-semibold block">Total Reports</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">{totalCount}</div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl">
          <span className="text-[11px] text-red-500 font-semibold block">Lost Listings</span>
          <div className="text-2xl font-black text-red-600 mt-1">{lostCount}</div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl">
          <span className="text-[11px] text-emerald-500 font-semibold block">Found Items</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">{foundCount}</div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl">
          <span className="text-[11px] text-amber-500 font-semibold block">Spotted</span>
          <div className="text-2xl font-black text-amber-600 mt-1">{spottedCount}</div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl">
          <span className="text-[11px] text-blue-500 font-semibold block">Returned</span>
          <div className="text-2xl font-black text-blue-600 mt-1">{returnedCount}</div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl">
          <span className="text-[11px] text-purple-500 font-semibold block">Pending / Under Review</span>
          <div className="text-2xl font-black text-purple-600 mt-1">{pendingCount}</div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('moderation')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'moderation'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" /> All Reports Moderation ({reports.length})
        </button>

        <button
          onClick={() => setActiveTab('flagged')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'flagged'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-amber-500" /> Review Suspicious Content ({flaggedReports.length})
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'users'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Users className="w-4 h-4 text-blue-500" /> Manage Community Users ({usersList.length})
        </button>
      </div>

      {/* TAB 1: REPORTS MODERATION */}
      {activeTab === 'moderation' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-500" />
              Report Moderation Queue ({filteredReports.length})
            </h3>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by ID, item name, reporter..."
                className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
              />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
              >
                <option value="all">All Types</option>
                <option value="lost">Lost Only</option>
                <option value="found">Found Only</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-extrabold uppercase text-slate-400">
                  <th className="py-3 px-3">Report ID</th>
                  <th className="py-3 px-3">Item Details</th>
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Reporter</th>
                  <th className="py-3 px-3">Location</th>
                  <th className="py-3 px-3 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-white">
                      <Link to={`/item/${report.id}`} className="hover:text-purple-500 underline flex items-center gap-1">
                        {report.id}
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </Link>
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                      <div>{report.item.name}</div>
                      <span className="text-[10px] text-slate-400 capitalize">{report.category}</span>
                    </td>
                    <td className="py-3 px-3 capitalize font-semibold">
                      {report.type === 'lost' ? '🔴 Lost' : '🟢 Found'}
                    </td>
                    <td className="py-3 px-3">
                      <StatusBadge status={report.status} />
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                      <div>{report.reporter?.name}</div>
                      <span className="text-[10px] text-slate-400">{report.reporter?.email}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-500">
                      {report.location?.area}, {report.location?.city}
                    </td>
                    <td className="py-3 px-3 text-right space-x-1">
                      <button
                        onClick={() => approveReport(report.id)}
                        className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-100 font-bold text-xs"
                        title="Approve Report"
                      >
                        <CheckCircle className="w-4 h-4 inline" />
                      </button>

                      <button
                        onClick={() => flagReport(report.id, 'Flagged by Admin for Review')}
                        className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-300 hover:bg-amber-100 font-bold text-xs"
                        title="Flag Suspicious"
                      >
                        <Flag className="w-4 h-4 inline" />
                      </button>

                      <button
                        onClick={() => deleteReport(report.id)}
                        className="p-1.5 rounded-lg bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-300 hover:bg-red-100 font-bold text-xs"
                        title="Remove Inappropriate Report"
                      >
                        <Trash2 className="w-4 h-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: REVIEW SUSPICIOUS & FLAGGED CONTENT */}
      {activeTab === 'flagged' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Review Suspicious & Community Flagged Reports
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Investigate reports with anomalous activity or community reports of fraud.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {flaggedReports.map((report) => (
              <div
                key={report.id}
                className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-amber-800 dark:text-amber-200">{report.id}</span>
                    <StatusBadge status={report.status} />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{report.item.name}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Flag Reason: <strong>{report.flagReason || 'Requires verification check before claims approval'}</strong>
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Reporter: {report.reporter?.name} • Location: {report.location?.area}, {report.location?.city}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    to={`/item/${report.id}`}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" /> Inspect
                  </Link>

                  <button
                    onClick={() => approveReport(report.id)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1"
                  >
                    <CheckCircle className="w-3.5 h-3.5" /> Approve
                  </button>

                  <button
                    onClick={() => deleteReport(report.id)}
                    className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: USER MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                Community User Management
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage registered users, review reputation badges, and maintain community trust.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-extrabold uppercase text-slate-400">
                  <th className="py-3 px-3">User</th>
                  <th className="py-3 px-3">Role</th>
                  <th className="py-3 px-3">Reputation Tier</th>
                  <th className="py-3 px-3">Sightings Contributed</th>
                  <th className="py-3 px-3">Items Returned</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Account Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {usersList.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                      <div>{user.name}</div>
                      <span className="text-[10px] text-slate-400">{user.email}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-medium">
                      {user.role}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-300 text-[10px] font-bold border border-purple-200 dark:border-purple-800">
                        {user.reputation}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-bold text-amber-600 dark:text-amber-400">
                      👀 {user.sightings}
                    </td>
                    <td className="py-3 px-3 font-bold text-emerald-600 dark:text-emerald-400">
                      🤝 {user.returns}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          user.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200'
                            : 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 border border-red-200'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`px-2.5 py-1 rounded-xl font-bold text-[11px] transition-colors ${
                          user.status === 'active'
                            ? 'bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950 dark:text-red-300'
                            : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300'
                        }`}
                      >
                        {user.status === 'active' ? 'Suspend' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
