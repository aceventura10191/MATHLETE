'use client';

import React, { useState, useEffect } from 'react';
import MathCanvas from '@/components/MathCanvas';
import DailyQuestion from '@/components/DailyQuestion';
import StreakCounter from '@/components/StreakCounter';
import BackgroundEquations from '@/components/BackgroundEquations';
import { GameState, GameStates } from '@/lib/gameState';
import { Question } from '@/lib/questions';
import { ClientLesson } from '@/lib/lessons';
import { getRandomClientLesson, validateAnswer } from '@/app/actions';

export default function Home() {
  const [gameState, setGameState] = useState<GameState>(GameStates.LESSON_CONCEPT);
  const [streak, setStreak] = useState(0);
  const [currentLesson, setCurrentLesson] = useState<ClientLesson | null>(null);
  const [fullChallengeQuestion, setFullChallengeQuestion] = useState<Question | null>(null);
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [replayCount, setReplayCount] = useState(0);

  useEffect(() => {
    async function loadLesson() {
      setIsLoading(true);
      const l = await getRandomClientLesson();
      setCurrentLesson(l);
      setGameState(GameStates.LESSON_CONCEPT);
      setIsLoading(false);
    }
    loadLesson();
  }, []);

  const handleShowExample = () => {
    setGameState(GameStates.LESSON_EXAMPLE);
  };

  const handleTakeChallenge = () => {
    setGameState(GameStates.CHALLENGE_INPUT);
  };

  const handleAnswerSubmit = async (answer: string) => {
    if (!currentLesson) return;

    // Securely validate the answer on the server
    const { correct, feedback: serverFeedback, fullQuestion } = await validateAnswer(currentLesson.challengeQuestion.id, answer);

    if (fullQuestion) {
      setFullChallengeQuestion(fullQuestion);
    }

    setWasCorrect(correct);
    setFeedback(serverFeedback || null);
    if (correct) setStreak(prev => prev + 1);
    else setStreak(0);
    
    setGameState(GameStates.CHALLENGE_SUBMITTED);
    setTimeout(() => {
      setGameState(GameStates.CHALLENGE_ANIMATION);
    }, 500);
  };

  const handleReplay = () => {
    setReplayCount(prev => prev + 1);
  };

  const handleNextLesson = async () => {
    setGameState(GameStates.LESSON_CONCEPT);
    setWasCorrect(null);
    setFeedback(null);
    setFullChallengeQuestion(null);
    setIsLoading(true);
    const l = await getRandomClientLesson();
    setTimeout(() => {
      setCurrentLesson(l);
      setIsLoading(false);
    }, 300); // Wait for fade out
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 to-black p-4 overflow-x-hidden relative pt-12 md:pt-20">
      {/* Deep background ambient glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Floating math equations background */}
      <BackgroundEquations />

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
      <div className={`fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 transform ${gameState === GameStates.CHALLENGE_ANIMATION || gameState === GameStates.CHALLENGE_SUBMITTED ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-20 opacity-0 scale-90 pointer-events-none'}`}>
        {wasCorrect !== null && (
          <div className={`px-8 py-4 rounded-full backdrop-blur-xl border font-bold tracking-widest text-sm shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center gap-4 ${wasCorrect ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.3)]' : 'bg-rose-500/20 border-rose-400/50 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.3)]'}`}>
            <span className="uppercase">{wasCorrect ? 'Correct!' : (feedback ? 'Close!' : 'Incorrect.')}</span>
            {!wasCorrect && feedback && (
              <span className="text-xs font-medium text-rose-200 normal-case max-w-sm text-center md:text-left border-t md:border-t-0 md:border-l border-rose-400/30 pt-2 md:pt-0 md:pl-4">{feedback}</span>
            )}
            {!wasCorrect && !feedback && (
              <span className="text-xs font-medium text-rose-200 normal-case">Solution below.</span>
            )}
            
            {/* Control Buttons (Replay / Next) */}
            {gameState === GameStates.CHALLENGE_ANIMATION && (
              <div className="flex gap-2 ml-4 pl-4 border-l border-[inherit]">
                <button 
                  onClick={handleReplay}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg transition-colors active:scale-95"
                  title="Replay Animation"
                >
                  Replay
                </button>
                <button 
                  onClick={handleNextLesson}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg transition-colors active:scale-95"
                  title="Next Lesson"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="relative z-10 w-full max-w-4xl grid place-items-center flex-1 mt-4 mb-8">
        
        {/* LOADING LAYER */}
        <div 
          className={`col-start-1 row-start-1 w-full flex items-center justify-center transition-all duration-700 ease-in-out ${
            isLoading ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-90 pointer-events-none blur-md'
          }`}
        >
          {isLoading && (
            <div className="w-full max-w-xl mx-auto p-14 bg-neutral-950/80 backdrop-blur-3xl border border-neutral-800/80 rounded-[3rem] shadow-[0_0_80px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center min-h-[400px]">
               <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4" />
               <p className="text-neutral-500 font-mono text-sm tracking-widest uppercase animate-pulse">Loading Lesson...</p>
            </div>
          )}
        </div>

        {/* CONCEPT LAYER */}
        <div 
          className={`col-start-1 row-start-1 w-full flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
            gameState === GameStates.LESSON_CONCEPT && !isLoading ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-90 pointer-events-none blur-md'
          }`}
        >
          {gameState === GameStates.LESSON_CONCEPT && currentLesson && !isLoading && (
            <div className="w-full max-w-2xl mx-auto p-12 bg-neutral-950/80 backdrop-blur-3xl border border-neutral-800/80 rounded-[3rem] shadow-[0_0_80px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center text-center">
              <span className="text-blue-400 font-mono text-xs tracking-widest uppercase mb-4">{currentLesson.topic}</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">{currentLesson.title}</h2>
              <p className="text-neutral-300 text-lg md:text-xl leading-relaxed mb-10 font-serif">{currentLesson.conceptText}</p>
              <button 
                onClick={handleShowExample}
                className="px-8 py-4 bg-white text-black font-bold tracking-widest uppercase text-sm rounded-full hover:scale-105 transition-transform active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
              >
                Show Example
              </button>
            </div>
          )}
        </div>

        {/* EXAMPLE LAYER */}
        <div 
          className={`col-start-1 row-start-1 w-full flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
            gameState === GameStates.LESSON_EXAMPLE ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-110 pointer-events-none blur-md'
          }`}
        >
          {gameState === GameStates.LESSON_EXAMPLE && currentLesson && (
            <div className="flex flex-col items-center w-full">
              <MathCanvas key={`ex-${currentLesson.id}`} isVisible={true} question={currentLesson.exampleQuestion as Question} />
              <button 
                onClick={handleTakeChallenge}
                className="mt-8 px-8 py-4 bg-blue-500 text-white font-bold tracking-widest uppercase text-sm rounded-full hover:scale-105 transition-transform active:scale-95 shadow-[0_0_40px_rgba(59,130,246,0.4)]"
              >
                Take Challenge
              </button>
            </div>
          )}
        </div>

        {/* CHALLENGE INPUT LAYER */}
        <div 
          className={`col-start-1 row-start-1 w-full flex items-center justify-center transition-all duration-700 ease-in-out ${
            gameState === GameStates.CHALLENGE_INPUT || gameState === GameStates.CHALLENGE_SUBMITTED ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-90 pointer-events-none blur-md'
          }`}
        >
          {/* We only render this if it's the active step, to prevent double rendering DailyQuestion issues */}
          {(gameState === GameStates.CHALLENGE_INPUT || gameState === GameStates.CHALLENGE_SUBMITTED) && currentLesson && (
             <div className={`transition-all duration-700 ${gameState === GameStates.CHALLENGE_SUBMITTED ? 'opacity-0 scale-90 blur-md pointer-events-none' : ''}`}>
               <DailyQuestion question={currentLesson.challengeQuestion} onSubmit={handleAnswerSubmit} />
             </div>
          )}
        </div>

        {/* CHALLENGE ANIMATION LAYER */}
        <div 
          className={`col-start-1 row-start-1 w-full flex items-center justify-center transition-all duration-1000 ease-out delay-300 ${
            gameState === GameStates.CHALLENGE_ANIMATION ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-110 pointer-events-none blur-md'
          }`}
        >
          {gameState === GameStates.CHALLENGE_ANIMATION && fullChallengeQuestion && <MathCanvas key={`chal-${replayCount}`} isVisible={true} question={fullChallengeQuestion} />}
        </div>

      </div>
    </main>
  );
}
