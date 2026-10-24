import React from 'react';
import { useLostFound } from '../context/LostFoundContext';
import { MysteryItemCard } from '../components/reports/MysteryItemCard';
import { HelpCircle } from 'lucide-react';

export const MysteryItems = () => {
  const { mysteryItems, addMysteryGuess, voteMysteryGuess } = useLostFound();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 rounded-3xl p-8 text-white space-y-3 shadow-xl">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-800/60 border border-purple-600 text-xs font-bold text-purple-200">
          <HelpCircle className="w-4 h-4 text-purple-400" /> Community Crowd-sourcing
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight">🔎 Mystery Items Identification</h1>
        <p className="text-xs text-purple-200 leading-relaxed max-w-2xl">
          Found something unusual that you cannot identify? Ask the community to help identify the item, submit guesses, and vote on accurate suggestions.
        </p>
      </div>

      <div className="space-y-6">
        {mysteryItems.map((item) => (
          <MysteryItemCard
            key={item.id}
            item={item}
            onAddGuess={addMysteryGuess}
            onVoteGuess={voteMysteryGuess}
          />
        ))}
      </div>
    </div>
  );
};
