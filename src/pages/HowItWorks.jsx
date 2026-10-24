import React from 'react';
import { Sparkles, PlusCircle, Eye, GitCommit, ShieldCheck, Handshake, CheckCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HowItWorks = () => {
  const steps = [
    {
      num: '01',
      title: 'Report',
      icon: PlusCircle,
      desc: 'Owner creates a Lost Report with item details, last known location, and a secret private verification detail.'
    },
    {
      num: '02',
      title: 'Community Spotting',
      icon: Eye,
      desc: 'Neighbors and commuters submit sightings ("I Saw This") with photos and location timestamps.'
    },
    {
      num: '03',
      title: 'Smart Matching',
      icon: Sparkles,
      desc: 'The frontend algorithm calculates similarity scores between Lost & Found reports.'
    },
    {
      num: '04',
      title: 'Secure Verification',
      icon: ShieldCheck,
      desc: 'Claimant proves identity by entering the stored private verification answer.'
    },
    {
      num: '05',
      title: 'Safe Handover',
      icon: Handshake,
      desc: 'Finder and owner coordinate safe meetup at a public location desk.'
    },
    {
      num: '06',
      title: 'Returned Home',
      icon: CheckCheck,
      desc: 'The item status updates to Returned / Reunited and seals the Missing Trail.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 text-xs font-extrabold border border-brand-200 dark:border-brand-800">
          <Sparkles className="w-4 h-4 text-brand-500" /> Platform Guide
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          How The Missing Trail Works
        </h1>
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          Every missing item has a story. Every sighting can help. Every trail can lead home.
        </p>
      </div>

      <div className="space-y-6">
        {steps.map((st) => {
          const IconComp = st.icon;
          return (
            <div
              key={st.num}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-start gap-5 hover:border-brand-500/40 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-black text-lg flex items-center justify-center shrink-0">
                {st.num}
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <IconComp className="w-4 h-4 text-brand-500" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{st.title}</h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center pt-4">
        <Link
          to="/report-lost"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-600 text-white font-bold text-sm shadow-xl shadow-brand-500/25 hover:bg-brand-700 transition-colors"
        >
          Start a Missing Trail Now
        </Link>
      </div>
    </div>
  );
};
