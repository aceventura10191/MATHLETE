import React from 'react';
import { Flame } from 'lucide-react';

interface StreakCounterProps {
  streak: number;
}

export default function StreakCounter({ streak }: StreakCounterProps) {
  return (
    <div className="fixed top-8 right-8 flex items-center gap-3 px-5 py-3 bg-neutral-900 border border-neutral-800 rounded-full shadow-lg z-50">
      <Flame className={`w-6 h-6 ${streak > 0 ? 'text-orange-500' : 'text-neutral-600'}`} />
      <span className="text-white font-bold text-xl">{streak}</span>
    </div>
  );
}
