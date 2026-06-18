'use client';

import React, { useState, useEffect } from 'react';
import MathCanvas from '@/components/MathCanvas';
import DailyQuestion from '@/components/DailyQuestion';
import StreakCounter from '@/components/StreakCounter';
import { GameState, GameStates } from '@/lib/gameState';
import { Question, getRandomQuestion } from '@/lib/questions';

export default function Home() {
  const [gameState, setGameState] = useState<GameState>(GameStates.NOT_STARTED);
  const [streak, setStreak] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);

  const [replayCount, setReplayCount] = useState(0);

  useEffect(() => {
    setCurrentQuestion(getRandomQuestion());
  }, []);

  const handleAnswerSubmit = (isCorrect: boolean) => {
    setWasCorrect(isCorrect);
    if (isCorrect) setStreak(prev => prev + 1);
    else setStreak(0);
    
    setGameState(GameStates.ANSWER_SUBMITTED);
    setTimeout(() => {
      setGameState(GameStates.SHOWING_ANIMATION);
    }, 500);
  };

  const handleReplay = () => {
    setReplayCount(prev => prev + 1);
  };

  const handleNextQuestion = () => {
    setGameState(GameStates.NOT_STARTED);
    setWasCorrect(null);
    setTimeout(() => {
      setCurrentQuestion(getRandomQuestion());
    }, 300); // Wait for fade out
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 to-black p-4 overflow-x-hidden relative pt-12 md:pt-20">
      {/* Deep background ambient glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Global Persistent Header */}
      <div className="relative z-20 text-center mb-12 flex flex-col items-center">
        <h1 className="title-glow text-5xl md:text-6xl lg:text-7xl font-black text-white mb-1 tracking-tighter drop-shadow-[0_0_25px_rgba(59,130,246,0.6)]">
          Mathlete
        </h1>
        <p className="text-blue-400 font-mono text-xs md:text-sm tracking-[0.3em] uppercase font-bold drop-shadow-[0_0_10px_rgba(96,165,250,0.8)]">
          By Kay
        </p>
      </div>

      <StreakCounter streak={streak} />
      
      {/* Banner for correct/incorrect feedback overlay */}
      <div className={`fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 transform ${gameState === GameStates.SHOWING_ANIMATION || gameState === GameStates.ANSWER_SUBMITTED ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-20 opacity-0 scale-90 pointer-events-none'}`}>
        {wasCorrect !== null && (
          <div className={`px-8 py-4 rounded-full backdrop-blur-xl border font-bold tracking-widest uppercase text-sm shadow-[0_0_40px_rgba(0,0,0,0.5)] flex items-center gap-4 ${wasCorrect ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.3)]' : 'bg-rose-500/20 border-rose-400/50 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.3)]'}`}>
            <span>{wasCorrect ? 'Correct! 🎯' : 'Incorrect. Solution below 👇'}</span>
            
            {/* Control Buttons (Replay / Next) */}
            {gameState === GameStates.SHOWING_ANIMATION && (
              <div className="flex gap-2 ml-4 pl-4 border-l border-[inherit]">
                <button 
                  onClick={handleReplay}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg transition-colors active:scale-95"
                  title="Replay Animation"
                >
                  Replay
                </button>
                <button 
                  onClick={handleNextQuestion}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg transition-colors active:scale-95"
                  title="Next Question"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="relative z-10 w-full max-w-4xl grid place-items-center flex-1 mt-4 mb-8">
        {/* We use grid overlapping to stack the components while maintaining intrinsic height */}
        <div 
          className={`col-start-1 row-start-1 w-full flex items-center justify-center transition-all duration-700 ease-in-out ${
            gameState === GameStates.SHOWING_ANIMATION || gameState === GameStates.ANSWER_SUBMITTED ? 'opacity-0 scale-90 pointer-events-none blur-md' : 'opacity-100 scale-100 blur-0'
          }`}
        >
          <DailyQuestion question={currentQuestion} onSubmit={handleAnswerSubmit} />
        </div>

        <div 
          className={`col-start-1 row-start-1 w-full flex items-center justify-center transition-all duration-1000 ease-out delay-300 ${
            gameState === GameStates.SHOWING_ANIMATION ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-110 pointer-events-none blur-md'
          }`}
        >
          {gameState === GameStates.SHOWING_ANIMATION && currentQuestion && <MathCanvas key={replayCount} isVisible={true} question={currentQuestion} />}
        </div>
      </div>
    </main>
  );
}
