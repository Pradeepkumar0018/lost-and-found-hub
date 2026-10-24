import React, { useState } from 'react';
import { HelpCircle, ThumbsUp, MessageSquare, Send } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const MysteryItemCard = ({ item, onAddGuess, onVoteGuess }) => {
  const [guessInput, setGuessInput] = useState('');
  const { currentUser } = useAuth();

  const handleGuessSubmit = (e) => {
    e.preventDefault();
    if (!guessInput.trim()) return;
    const username = currentUser ? currentUser.name : 'Community Member';
    onAddGuess(item.id, username, guessInput.trim());
    setGuessInput('');
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all p-6 space-y-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-48 h-48 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <span className="bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-bold px-2.5 py-1 rounded-full border border-purple-200 dark:border-purple-800/60 flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" /> Mystery Item
            </span>
            <span className="text-xs text-slate-400">Found near {item.location}</span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {item.description}
          </p>

          <div className="text-[11px] text-slate-400 font-medium">
            Found on {item.dateFound} by {item.finderName}
          </div>
        </div>
      </div>

      {/* Community Guesses Section */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 uppercase tracking-wider">
          <MessageSquare className="w-4 h-4 text-purple-500" />
          Community Identification Guesses ({item.communityGuesses?.length || 0})
        </h4>

        <div className="space-y-2">
          {item.communityGuesses?.map((g) => (
            <div
              key={g.id}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs"
            >
              <div>
                <span className="font-semibold text-slate-900 dark:text-white">{g.guess}</span>
                <span className="text-[10px] text-slate-400 ml-2">by {g.user}</span>
              </div>
              <button
                onClick={() => onVoteGuess(item.id, g.id)}
                className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-purple-600 font-bold bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                <ThumbsUp className="w-3.5 h-3.5 text-purple-500" />
                {g.votes}
              </button>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleGuessSubmit} className="flex gap-2 pt-2">
          <input
            type="text"
            value={guessInput}
            onChange={(e) => setGuessInput(e.target.value)}
            placeholder="Do you know what this item is? Submit identification..."
            className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs flex items-center gap-1 shadow-md shadow-purple-500/20"
          >
            <Send className="w-3.5 h-3.5" /> Guess
          </button>
        </form>
      </div>
    </div>
  );
};
