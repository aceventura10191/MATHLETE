'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { Question } from '@/lib/questions';

interface TextualSolverCanvasProps {
  isVisible: boolean;
  question: Question;
}

export default function TextualSolverCanvas({ isVisible, question }: TextualSolverCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible || !containerRef.current || !question.steps) return;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set('.solver-step', { opacity: 1 }); // container stays visible
      
      // Target the direct children of KaTeX's .base element, ignoring .strut which is just for line height
      const termsSelector = '.solver-step .base > *:not(.strut)';
      gsap.set(termsSelector, { opacity: 0, y: -15, scale: 0.8, display: 'inline-block' });
      
      gsap.set('.final-answer', { opacity: 0, scale: 0.5, transformOrigin: 'center center' });
      gsap.set('.final-question-mark', { opacity: 1, scale: 1 });

      const tl = gsap.timeline({ delay: 0.4 });

      // Animate line by line, but term by term inside each line
      const steps = gsap.utils.toArray('.solver-step');
      steps.forEach((step, index) => {
        const terms = (step as HTMLElement).querySelectorAll('.base > *:not(.strut)');
        if (terms.length > 0) {
          tl.to(terms, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.12, 
            ease: 'back.out(1.5)'
          }, index > 0 ? "+=0.3" : ""); // small pause between lines
        }
      });

      // The ? morphs into the final glowing answer
      tl.to('.final-question-mark', {
        opacity: 0,
        scale: 0.3,
        duration: 0.4,
        ease: 'power2.in'
      }, "+=0.6")
      .to('.final-answer', {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'elastic.out(1, 0.4)'
      });

      // Pulse glow on final answer
      tl.to('.final-answer-glow', {
        textShadow: '0px 0px 25px rgba(96, 165, 250, 0.9), 0px 0px 50px rgba(96, 165, 250, 0.5)',
        repeat: -1,
        yoyo: true,
        duration: 1.8,
        ease: 'sine.inOut'
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isVisible, question]);

  if (!isVisible || !question.steps) return null;

  const intermediateSteps = question.steps.slice(0, -1);
  const finalStep = question.steps[question.steps.length - 1];

  return (
    <div 
      ref={containerRef} 
      className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-8 bg-neutral-950/90 rounded-[2.5rem] shadow-2xl overflow-hidden border border-neutral-800/50 min-h-[500px] relative"
    >
      {/* Background ambient glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 to-transparent pointer-events-none rounded-[2.5rem]" />
      
      <div className="flex flex-col items-center justify-center gap-8 w-full z-10">
        {intermediateSteps.map((step, idx) => (
          <div 
            key={idx} 
            className="solver-step text-2xl sm:text-3xl lg:text-4xl font-serif text-white tracking-widest text-center"
            dangerouslySetInnerHTML={{ __html: katex.renderToString(step, { throwOnError: false, displayMode: true }) }}
          />
        ))}

        {/* Final Step Container with morphing ? */}
        <div className="relative flex items-center justify-center mt-6 w-full h-24">
          <span 
            className="final-question-mark absolute text-neutral-500 text-4xl sm:text-5xl font-serif"
            dangerouslySetInnerHTML={{ __html: katex.renderToString("?", { throwOnError: false, displayMode: true }) }}
          />
          <span 
            className="final-answer absolute text-blue-400 font-bold text-4xl sm:text-5xl lg:text-6xl drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] final-answer-glow font-serif"
            dangerouslySetInnerHTML={{ __html: katex.renderToString(finalStep, { throwOnError: false, displayMode: true }) }}
          />
        </div>
      </div>
    </div>
  );
}
