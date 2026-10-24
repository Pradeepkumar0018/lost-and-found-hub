import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Eye, MapPin, Calendar, Clock, Camera, FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const SightingModal = ({ isOpen, onClose, report, onSubmitSighting }) => {
  const { currentUser } = useAuth();
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState('10:00 AM');
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState('');
  const [reporterName, setReporterName] = useState(currentUser ? currentUser.name : '');

  if (!report) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location.trim() || !notes.trim()) return;

    onSubmitSighting(report.id, {
      reporterName: reporterName || 'Community Helper',
      location,
      date,
      time,
      notes,
      image
    });

    // Reset Form
    setLocation('');
    setNotes('');
    setImage('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <span className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
          <Eye className="w-5 h-5" /> Submit Community Sighting for {report.item.name}
        </span>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Every sighting helps connect missing items to their owners. Provide location details and observations below.
        </p>

        {/* Reporter Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Your Name / Handle
          </label>
          <input
            type="text"
            value={reporterName}
            onChange={(e) => setReporterName(e.target.value)}
            placeholder="e.g. Ananya R. (or Anonymous Helper)"
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        {/* Location Spot */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            Where did you see it? *
          </label>
          <input
            type="text"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Bus stop bench #3 near Kattankulathur"
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-500" /> Date Seen *
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-500" /> Approx Time *
            </label>
            <input
              type="text"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g. 11:15 AM"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
            <FileText className="w-3.5 h-3.5 text-amber-500" /> Observation Notes *
          </label>
          <textarea
            rows={3}
            required
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Describe condition, surroundings, or if anyone was holding it..."
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        {/* Optional Photo Upload */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
            <Camera className="w-3.5 h-3.5 text-amber-500" /> Upload Sighting Photo (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-50 file:text-amber-700 dark:file:bg-amber-950 dark:file:text-amber-300 hover:file:bg-amber-100"
          />
          {image && (
            <img src={image} alt="Preview" className="mt-2 h-24 rounded-lg object-cover border border-amber-300" />
          )}
        </div>

        <div className="pt-2 flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" className="bg-amber-600 hover:bg-amber-700 text-white">
            Publish Sighting Event
          </Button>
        </div>
      </form>
    </Modal>
  );
};
