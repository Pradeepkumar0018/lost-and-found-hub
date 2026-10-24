import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLostFound } from '../context/LostFoundContext';
import { useAuth } from '../context/AuthContext';
import { StatusBadge } from '../components/common/Badge';
import { TrailStatusTracker } from '../components/trail/TrailStatusTracker';
import { TrailTimeline } from '../components/trail/TrailTimeline';
import { SightingModal } from '../components/forms/SightingModal';
import { VerificationModal } from '../components/forms/VerificationModal';
import { ClaimModal } from '../components/forms/ClaimModal';
import { HandoverModal } from '../components/forms/HandoverModal';
import { Button } from '../components/common/Button';
import { getCategoryById } from '../constants/categories';
import { formatDate, formatTimeAgo } from '../utils/dateFormatter';
import { maskContactInfo } from '../utils/validators';
import {
  MapPin,
  Calendar,
  Clock,
  User,
  ShieldCheck,
  Eye,
  Sparkles,
  Handshake,
  CheckCheck,
  ArrowLeft,
  Share2,
  Lock,
  GitCommit,
  AlertCircle,
  MessageSquare,
  Send,
  CheckCircle2,
  HelpCircle,
  Heart
} from 'lucide-react';

export const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const {
    getReportById,
    addSighting,
    verifyOwnershipDetail,
    submitClaim,
    approveClaim,
    arrangeHandover,
    addHandoverMessage,
    markAsReturned,
    getMatches,
    showToast
  } = useLostFound();

  const report = getReportById(id);

  // Modal States
  const [sightingOpen, setSightingOpen] = useState(false);
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [claimOpen, setClaimOpen] = useState(false);
  const [handoverOpen, setHandoverOpen] = useState(false);

  // Chat message state in Handover
  const [chatMessage, setChatMessage] = useState('');

  if (!report) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Report Not Found</h2>
        <p className="text-xs text-slate-500">
          The requested report ID <strong>{id}</strong> could not be found or may have been deleted.
        </p>
        <Button onClick={() => navigate('/explore')} variant="primary">
          Return to Explore Reports
        </Button>
      </div>
    );
  }

  const category = getCategoryById(report.category);
  const matches = getMatches(report.id);
  const isLost = report.type === 'lost';
  const isFinished = report.status === 'returned' || report.status === 'reunited';
  const isPet = report.category === 'pet';

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('🔗 Missing Trail link copied to clipboard!');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    const sender = currentUser ? currentUser.name : (isLost ? 'Owner' : 'Finder');
    addHandoverMessage(report.id, chatMessage.trim(), sender);
    setChatMessage('');
    showToast('💬 Message sent in secure coordination chat!');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Button & Top Toolbar */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-600 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Search
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-200 transition-colors"
          >
            <Share2 className="w-4 h-4" /> Share Trail
          </button>
        </div>
      </div>

      {/* Main Item Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-1 space-y-4">
          <div className="w-full h-80 rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-md relative">
            <img
              src={report.item.image}
              alt={report.item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <StatusBadge status={report.status} />
              {isPet && (
                <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                  🐾 Pet Mode
                </span>
              )}
            </div>
          </div>

          {/* Quick Reporter Info Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Reporter Identity
            </h4>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 font-bold flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                  {report.reporter?.anonymous ? 'Anonymous Member' : report.reporter?.name}
                </h5>
                <p className="text-[11px] text-slate-400">
                  {maskContactInfo(report.reporter?.email)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Main Metadata & Actions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
              <span>{category.label}</span>
              <span>•</span>
              <span className="font-mono text-slate-400">{report.id}</span>
            </div>

            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {report.item.name}
            </h1>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal pt-1">
              {report.item.description}
            </p>
          </div>

          {/* Key Attributes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block font-semibold">Location</span>
              <strong className="text-xs text-slate-900 dark:text-white font-bold truncate block">
                {report.location.area}, {report.location.city}
              </strong>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block font-semibold">Date Reported</span>
              <strong className="text-xs text-slate-900 dark:text-white font-bold block">
                {formatDate(report.date)}
              </strong>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block font-semibold">Brand / Model</span>
              <strong className="text-xs text-slate-900 dark:text-white font-bold truncate block">
                {report.item.brand || 'Standard'} {report.item.model || ''}
              </strong>
            </div>
          </div>

          {/* Action Trigger Buttons Banner */}
          <div className="p-5 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Community & Recovery Actions
            </h4>

            <div className="flex flex-wrap gap-2">
              {isLost && !isFinished && (
                <Button
                  onClick={() => setSightingOpen(true)}
                  variant="primary"
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                  icon={Eye}
                >
                  👀 I Saw This Item
                </Button>
              )}

              {!isLost && !isFinished && (
                <Button
                  onClick={() => setClaimOpen(true)}
                  variant="primary"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  icon={Sparkles}
                >
                  ✨ This Might Be Mine
                </Button>
              )}

              {report.status !== 'verified' && !isFinished && (
                <Button
                  onClick={() => setVerifyOpen(true)}
                  variant="secondary"
                  icon={ShieldCheck}
                >
                  🔐 Verify Ownership
                </Button>
              )}

              {report.status === 'verified' && !isFinished && (
                <Button
                  onClick={() => setHandoverOpen(true)}
                  variant="primary"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                  icon={Handshake}
                >
                  🤝 Arrange Handover
                </Button>
              )}

              {!isFinished && (
                <Button
                  onClick={() => markAsReturned(report.id)}
                  variant="success"
                  icon={CheckCheck}
                >
                  {isPet ? '🐾 Mark Reunited' : '🔵 Mark Returned'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MISSING TRAIL STATUS TRACKER */}
      <TrailStatusTracker currentStatus={report.status} category={report.category} />

      {/* HANDOVER COORDINATION & RETURN CONFIRMATION SECTION */}
      {report.status === 'handover' && (
        <div className="bg-cyan-50/60 dark:bg-cyan-950/40 border-2 border-cyan-300 dark:border-cyan-800 rounded-3xl p-6 space-y-6 animate-slide-up shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyan-200 dark:border-cyan-800/80 pb-4">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-700 dark:text-cyan-300 flex items-center gap-1.5">
                <Handshake className="w-4 h-4 text-cyan-600" /> Active Safe Handover Protocol
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1">
                Meetup Scheduled: {report.handover?.meetingLocation || report.location?.area}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Date: <strong>{report.handover?.date || 'Today'}</strong> at <strong>{report.handover?.time || 'Scheduled Time'}</strong>
              </p>
            </div>

            {/* Crucial Question: Did the owner receive the item? */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-cyan-200 dark:border-cyan-800 space-y-2 text-center sm:text-right">
              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                Did the owner receive the item?
              </span>
              <div className="flex items-center justify-center sm:justify-end gap-2">
                <Button
                  onClick={() => markAsReturned(report.id)}
                  variant="success"
                  size="sm"
                  icon={CheckCheck}
                >
                  {isPet ? 'Yes, Reunited 🐾' : 'Yes, Returned 🔵'}
                </Button>
                <Button
                  onClick={() => showToast('Handover still in progress. Coordinates kept open.', 'info')}
                  variant="secondary"
                  size="sm"
                >
                  Not Yet
                </Button>
              </div>
            </div>
          </div>

          {/* Simulated Secure Meetup Chat */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-cyan-600" />
              Simulated Private Handover Messenger
            </h4>

            <div className="max-h-48 overflow-y-auto space-y-2 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              {(report.handover?.messages || [
                { id: 'm1', sender: 'System Coordinator', text: `Handover coordinates locked at ${report.handover?.meetingLocation || 'Public Desk'}. Meet in public and verify item condition.` }
              ]).map((msg) => (
                <div key={msg.id} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
                  <span className="font-bold text-brand-600 dark:text-brand-400 block">{msg.sender}:</span>
                  <p className="text-slate-700 dark:text-slate-300">{msg.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Coordinate safe arrival details (e.g., 'Wearing blue coat near entrance')..."
                className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <Button type="submit" variant="primary" size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                <Send className="w-3.5 h-3.5" />
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* CLAIMS REVIEW SECTION */}
      {report.claims && report.claims.length > 0 && (
        <div className="bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-purple-100 dark:border-purple-800 pb-3">
            <h3 className="text-base font-bold text-purple-950 dark:text-purple-200 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Ownership Claims Submitted ({report.claims.length})
            </h3>
            <span className="text-xs text-purple-600 font-semibold">Verification Required</span>
          </div>

          <div className="space-y-3">
            {report.claims.map((claim) => (
              <div
                key={claim.id}
                className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900 dark:text-white font-bold">{claim.claimantName}</strong>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        claim.status === 'approved'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {claim.status}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">{claim.claimNotes}</p>
                  <span className="text-[10px] text-slate-400">
                    Contact: {maskContactInfo(claim.claimantEmail)} • {formatTimeAgo(claim.timestamp)}
                  </span>
                </div>

                {claim.status === 'pending' && (
                  <Button
                    onClick={() => approveClaim(report.id, claim.id)}
                    variant="primary"
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700"
                    icon={ShieldCheck}
                  >
                    Approve Claim
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SMART MATCHES SIMULATION SECTION */}
      {matches && matches.length > 0 && (
        <div className="bg-purple-50/60 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-purple-950 dark:text-purple-200 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600 animate-pulse" />
              Smart Match Detector ({matches.length} Potential Match{matches.length > 1 ? 'es' : ''})
            </h3>
            <span className="text-xs font-bold text-purple-700 dark:text-purple-300">
              Frontend Algorithm Simulation
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matches.map((m) => (
              <div
                key={m.candidateId}
                className="bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between gap-3"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {m.overallConfidence}% Match Confidence
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{m.candidateItem.id}</span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {m.candidateItem.item?.name}
                  </h4>

                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    {m.candidateItem.location?.area}, {m.candidateItem.location?.city}
                  </p>

                  {/* Score Breakdown Bars */}
                  {m.breakdown && (
                    <div className="pt-2 grid grid-cols-4 gap-1 text-[10px] text-center font-semibold">
                      <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                        <span className="text-slate-400 block">Item</span>
                        <span>{m.breakdown.item}%</span>
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                        <span className="text-slate-400 block">Color</span>
                        <span>{m.breakdown.color}%</span>
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                        <span className="text-slate-400 block">Location</span>
                        <span>{m.breakdown.location}%</span>
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                        <span className="text-slate-400 block">Time</span>
                        <span>{m.breakdown.time}%</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-2 flex gap-2">
                  <Link
                    to={`/item/${m.candidateId}`}
                    className="flex-1 py-1.5 text-center rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold"
                  >
                    View Match Report
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FULL MISSING TRAIL TIMELINE */}
      <TrailTimeline trail={report.trail} />

      {/* MODAL CONTAINERS */}
      <SightingModal
        isOpen={sightingOpen}
        onClose={() => setSightingOpen(false)}
        report={report}
        onSubmitSighting={addSighting}
      />

      <VerificationModal
        isOpen={verifyOpen}
        onClose={() => setVerifyOpen(false)}
        report={report}
        onVerifySuccess={verifyOwnershipDetail}
      />

      <ClaimModal
        isOpen={claimOpen}
        onClose={() => setClaimOpen(false)}
        report={report}
        onSubmitClaim={submitClaim}
      />

      <HandoverModal
        isOpen={handoverOpen}
        onClose={() => setHandoverOpen(false)}
        report={report}
        onArrangeHandover={arrangeHandover}
      />
    </div>
  );
};
