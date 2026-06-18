'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { Question } from '@/lib/questions';
import TextualSolverCanvas from './TextualSolverCanvas';

interface MathCanvasProps {
  isVisible: boolean;
  question: Question;
}

export default function MathCanvas({ isVisible, question }: MathCanvasProps) {
  // Dual-Animation Logic Switch
  if (question.animationType === 'step-by-step') {
    return <TextualSolverCanvas isVisible={isVisible} question={question} />;
  }

  // Otherwise, run the bespoke Geometric SVG Animation (Sum of Odd Numbers)
  return <GeometricMathCanvas isVisible={isVisible} question={question} />;
}

// Extracted the original hardcoded SVG logic here
function GeometricMathCanvas({ isVisible, question }: MathCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set('.math-equation', { opacity: 0, y: 30 });
      gsap.set('.block-1', { scale: 0, transformOrigin: 'center center' });
      gsap.set('.block-2', { x: 80, y: -80, opacity: 0 });
      gsap.set('.block-3', { x: 80, y: -80, opacity: 0 });
      gsap.set('.bracket-line', { strokeDasharray: 300, strokeDashoffset: 300 });
      gsap.set('.bracket-label', { opacity: 0, scale: 0.5 });
      gsap.set('.answer-text', { opacity: 0, scale: 0.5, transformOrigin: 'center center' });

      const tl = gsap.timeline({ delay: 0.3 });

      tl.to('.math-equation', { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out' });
      tl.to('.block-1', { scale: 1, duration: 1.4, ease: 'elastic.out(1, 0.4)' }, "+=0.4");
      tl.to('.block-2', { x: 0, y: 0, opacity: 1, duration: 1, ease: 'back.out(1.2)', stagger: 0.08 }, "+=0.3");
      tl.to('.block-3', { x: 0, y: 0, opacity: 1, duration: 1.2, ease: 'back.out(1.1)', stagger: 0.08 }, "+=0.3");
      
      tl.to('.bracket-line', { strokeDashoffset: 0, duration: 1.5, ease: 'power3.inOut' }, "+=0.5")
        .to('.bracket-label', { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)' }, "-=0.8");

      tl.to('.question-mark', { opacity: 0, scale: 0.5, duration: 0.4, ease: 'power2.in' }, "+=0.2")
        .to('.answer-text', { opacity: 1, scale: 1, duration: 1.2, ease: 'elastic.out(1, 0.3)' });

      tl.to('.answer-text-glow', {
        textShadow: '0px 0px 20px rgba(96, 165, 250, 0.8), 0px 0px 40px rgba(96, 165, 250, 0.4)',
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: 'sine.inOut'
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div 
      ref={containerRef} 
      className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-8 bg-neutral-950/90 rounded-[2.5rem] shadow-2xl overflow-hidden border border-neutral-800/50"
    >
      <div className="math-equation flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-widest mb-16">
        <span 
          className="mr-4"
          dangerouslySetInnerHTML={{ __html: katex.renderToString(question.equation.split('=')[0] + '=', { throwOnError: false, displayMode: true }) }}
        />
        <div className="relative flex items-center justify-center w-16 h-16">
          <span 
            className="question-mark absolute text-neutral-500"
            dangerouslySetInnerHTML={{ __html: katex.renderToString('?', { throwOnError: false, displayMode: true }) }}
          />
          <span 
            className="answer-text absolute text-blue-400 font-bold drop-shadow-lg answer-text-glow"
            dangerouslySetInnerHTML={{ __html: katex.renderToString('n^2', { throwOnError: false, displayMode: true }) }}
          />
        </div>
      </div>

      <div className="relative w-full max-w-md aspect-square">
        <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible">
          <g className="proof-grid">
            <rect className="block-1" x="119" y="119" width="50" height="50" rx="8" fill="#3b82f6" fillOpacity="0.9" stroke="#60a5fa" strokeWidth="2" />
            <g className="group-2">
              <rect className="block-2" x="175" y="119" width="50" height="50" rx="8" fill="#8b5cf6" fillOpacity="0.85" stroke="#a78bfa" strokeWidth="2" />
              <rect className="block-2" x="175" y="175" width="50" height="50" rx="8" fill="#8b5cf6" fillOpacity="0.85" stroke="#a78bfa" strokeWidth="2" />
              <rect className="block-2" x="119" y="175" width="50" height="50" rx="8" fill="#8b5cf6" fillOpacity="0.85" stroke="#a78bfa" strokeWidth="2" />
            </g>
            <g className="group-3">
              <rect className="block-3" x="231" y="119" width="50" height="50" rx="8" fill="#ec4899" fillOpacity="0.85" stroke="#f472b6" strokeWidth="2" />
              <rect className="block-3" x="231" y="175" width="50" height="50" rx="8" fill="#ec4899" fillOpacity="0.85" stroke="#f472b6" strokeWidth="2" />
              <rect className="block-3" x="231" y="231" width="50" height="50" rx="8" fill="#ec4899" fillOpacity="0.85" stroke="#f472b6" strokeWidth="2" />
              <rect className="block-3" x="175" y="231" width="50" height="50" rx="8" fill="#ec4899" fillOpacity="0.85" stroke="#f472b6" strokeWidth="2" />
              <rect className="block-3" x="119" y="231" width="50" height="50" rx="8" fill="#ec4899" fillOpacity="0.85" stroke="#f472b6" strokeWidth="2" />
            </g>
          </g>
          <g className="brackets" stroke="#52525b" strokeWidth="3" fill="none" strokeLinecap="round">
            <path className="bracket-line" d="M119,300 L119,310 L281,310 L281,300" />
            <text className="bracket-label" x="200" y="340" fill="#a1a1aa" fontSize="24" fontFamily="serif" fontStyle="italic" textAnchor="middle">n</text>
            <path className="bracket-line" d="M300,119 L310,119 L310,281 L300,281" />
            <text className="bracket-label" x="340" y="208" fill="#a1a1aa" fontSize="24" fontFamily="serif" fontStyle="italic" textAnchor="middle">n</text>
          </g>
        </svg>
      </div>
    </div>
  );
}
