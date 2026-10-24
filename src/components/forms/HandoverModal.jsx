import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Handshake, MapPin, Calendar, Clock, ShieldCheck, Send } from 'lucide-react';

export const HandoverModal = ({ isOpen, onClose, report, onArrangeHandover }) => {
  const [meetingLocation, setMeetingLocation] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState('04:00 PM');
  const [notes, setNotes] = useState('');

  if (!report) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!meetingLocation.trim()) return;

    onArrangeHandover(report.id, {
      meetingLocation,
      date,
      time,
      notes
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <span className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
          <Handshake className="w-5 h-5" /> Arrange Safe Handover Meeting
        </span>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Safety Tip Banner */}
        <div className="p-3 bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 rounded-xl text-xs text-cyan-900 dark:text-cyan-200 space-y-1">
          <p className="font-bold flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-cyan-600" /> Safe Recovery Protocol
          </p>
          <p className="text-slate-600 dark:text-slate-300">
            Always choose a well-lit, public location (e.g., airport help desk, police station front lobby, metro station customer care counter).
          </p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-cyan-500" /> Public Meeting Point *
          </label>
          <input
            type="text"
            required
            value={meetingLocation}
            onChange={(e) => setMeetingLocation(e.target.value)}
            placeholder="e.g. Metro Station Security Desk Gate 2"
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-cyan-500" /> Meet Date *
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-cyan-500" /> Meet Time *
            </label>
            <input
              type="text"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g. 04:30 PM"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Handover Instructions & Identification Notes
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Will be wearing a blue jacket holding a black binder..."
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white"
          />
        </div>

        <div className="pt-2 flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" className="bg-cyan-600 hover:bg-cyan-700 text-white">
            Confirm Handover Schedule
          </Button>
        </div>
      </form>
    </Modal>
  );
};
