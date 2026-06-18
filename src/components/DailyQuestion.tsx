'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { Question } from '@/lib/questions';

interface DailyQuestionProps {
  question: Question | null;
  onSubmit: (isCorrect: boolean) => void;
}

export default function DailyQuestion({ question, onSubmit }: DailyQuestionProps) {
  const [answer, setAnswer] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Sleek stagger reveal for all text items
      gsap.fromTo('.stagger-animate', 
        { y: 40, opacity: 0, scale: 0.98 }, 
        { y: 0, opacity: 1, scale: 1, duration: 1.2, stagger: 0.1, ease: 'power4.out', delay: 0.1 }
      );
      
      // Intense neon glow pulse for the title
      gsap.to('.title-glow', {
        textShadow: '0px 0px 25px rgba(96, 165, 250, 1), 0px 0px 60px rgba(139, 92, 246, 0.8), 0px 0px 100px rgba(236, 72, 153, 0.4)',
        repeat: -1,
        yoyo: true,
        duration: 2.5,
        ease: 'sine.inOut'
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, [question]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim() || !question) return;
    
    const formattedAnswer = answer.toLowerCase().replace(/\s/g, '');
    const isCorrect = question.accepts.includes(formattedAnswer);
    
    onSubmit(isCorrect);
  };

  if (!question) return null;

  const difficultyColors = {
    Basic: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30 shadow-[0_0_15px_rgba(52,211,153,0.2)]',
    Intermediate: 'text-amber-400 bg-amber-400/10 border-amber-400/30 shadow-[0_0_15px_rgba(251,191,36,0.2)]',
    Hard: 'text-orange-500 bg-orange-500/10 border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.2)]',
    Advanced: 'text-rose-500 bg-rose-500/10 border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.2)]',
  };

  return (
    <div ref={containerRef} className="w-full max-w-xl mx-auto p-10 md:p-14 bg-neutral-950/80 backdrop-blur-3xl border border-neutral-800/80 rounded-[3rem] shadow-[0_0_80px_rgba(0,0,0,0.8)] transition-all duration-500 relative overflow-hidden group">
      {/* Dynamic ambient sweep effect on hover */}
      <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_2s_infinite] pointer-events-none transition-opacity duration-1000" />
      
      {/* Top heavy glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[250%] h-80 bg-gradient-to-b from-blue-600/30 to-transparent blur-[80px] pointer-events-none" />

      <div className="relative z-10">
        <div className="mb-10 text-center stagger-animate">
          <p className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-md mx-auto font-light">
            Welcome to your daily gamified mathematics challenge. 
            Solve the problem below to unlock the underlying visual proof.
          </p>
        </div>

        <div className="bg-black/60 rounded-[2rem] p-8 border border-neutral-800/80 mb-10 stagger-animate shadow-[inset_0_2px_20px_rgba(255,255,255,0.02)] relative overflow-hidden">
          {/* subtle inner glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-violet-600/20 blur-[50px]" />
          
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
              <span className="text-neutral-500 font-mono text-xs uppercase tracking-widest font-bold">{question.topic}</span>
              <span className={`px-4 py-1.5 rounded-full text-xs font-black border uppercase tracking-wider ${difficultyColors[question.difficulty]}`}>
                {question.difficulty}
              </span>
            </div>

            <p className="text-neutral-200 mb-8 text-center text-lg font-medium">{question.description}</p>
            
            <div className="math-equation flex items-center justify-center text-3xl md:text-4xl font-serif text-white tracking-widest mb-2 text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
               <span dangerouslySetInnerHTML={{ __html: katex.renderToString(question.equation, { throwOnError: false, displayMode: true }) }} />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 stagger-animate">
          <input 
            type="text" 
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer..." 
            className="w-full px-6 py-5 bg-neutral-900/90 border border-neutral-700/80 rounded-2xl text-white font-mono text-xl focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 transition-all placeholder:text-neutral-600 shadow-inner"
          />
          <button 
            type="submit"
            className="w-full py-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:via-indigo-500 hover:to-violet-500 text-white font-black tracking-widest uppercase rounded-2xl text-lg transition-all active:scale-[0.98] shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:shadow-[0_0_40px_rgba(79,70,229,0.6)]"
          >
            Submit Answer
          </button>
        </form>
      </div>
    </div>
  );
}
