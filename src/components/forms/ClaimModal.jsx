import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Sparkles, MessageSquare, Phone, Mail, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ClaimModal = ({ isOpen, onClose, report, onSubmitClaim }) => {
  const { currentUser } = useAuth();
  const [claimantName, setClaimantName] = useState(currentUser ? currentUser.name : '');
  const [claimantEmail, setClaimantEmail] = useState(currentUser ? currentUser.email : '');
  const [claimantPhone, setClaimantPhone] = useState(currentUser ? currentUser.phone : '');
  const [claimNotes, setClaimNotes] = useState('');

  if (!report) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!claimNotes.trim()) return;

    onSubmitClaim(report.id, {
      claimantName,
      claimantEmail,
      claimantPhone,
      claimNotes
    });

    setClaimNotes('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <span className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
          <Sparkles className="w-5 h-5" /> Submit Claim — "This Might Be Mine"
        </span>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          You are claiming item <strong>{report.item.name}</strong> ({report.id}). Provide contact details and notes to coordinate identity verification with the finder.
        </p>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={claimantName}
            onChange={(e) => setClaimantName(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Email *
            </label>
            <input
              type="email"
              required
              value={claimantEmail}
              onChange={(e) => setClaimantEmail(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={claimantPhone}
              onChange={(e) => setClaimantPhone(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Claim Notes & Identification Message *
          </label>
          <textarea
            rows={3}
            required
            value={claimNotes}
            onChange={(e) => setClaimNotes(e.target.value)}
            placeholder="State why you believe this item belongs to you (e.g. date lost, specific accessories...)"
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white"
          />
        </div>

        <div className="pt-2 flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" className="bg-purple-600 hover:bg-purple-700 text-white">
            Send Claim to Finder
          </Button>
        </div>
      </form>
    </Modal>
  );
};
