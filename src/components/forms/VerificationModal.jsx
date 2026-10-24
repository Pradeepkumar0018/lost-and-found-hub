import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { ShieldCheck, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { maskPrivateText } from '../../utils/validators';

export const VerificationModal = ({ isOpen, onClose, report, onVerifySuccess }) => {
  const [answer, setAnswer] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  if (!report) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!answer.trim()) {
      setErrorMsg('Please enter your private detail answer.');
      return;
    }

    const passed = onVerifySuccess(report.id, answer.trim());
    if (passed) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setAnswer('');
        onClose();
      }, 1500);
    } else {
      setErrorMsg('Verification failed. The detail entered does not match our records.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <span className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
          <ShieldCheck className="w-5 h-5" /> Ownership Verification
        </span>
      }
    >
      <div className="space-y-4">
        {/* Security Banner */}
        <div className="p-3.5 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 rounded-2xl flex items-start gap-2.5 text-blue-900 dark:text-blue-200">
          <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <p className="font-bold">Private Verification Protocol</p>
            <p className="text-slate-600 dark:text-slate-300">
              Enter one private identifying detail that was submitted during lost report creation. This secret is never displayed publicly.
            </p>
          </div>
        </div>

        {success ? (
          <div className="p-6 text-center space-y-2 animate-fade-in">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white">✅ Verification Successful!</h4>
            <p className="text-xs text-slate-500">Ownership identity has been validated for report {report.id}.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Secret Private Detail (e.g. unique scratch, wallpaper image, key count...)
              </label>
              <input
                type="text"
                required
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter private detail answer..."
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="pt-2 flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" className="bg-blue-600 hover:bg-blue-700 text-white">
                Verify Ownership
              </Button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};
