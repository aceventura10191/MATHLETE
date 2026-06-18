'use client';

import React, { useEffect, useState } from 'react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const EQUATIONS = [
  '\\int e^x dx = e^x + C',
  'e^{i\\pi} + 1 = 0',
  '\\nabla \\times \\mathbf{E} = -\\frac{\\partial \\mathbf{B}}{\\partial t}',
  'f(x) = \\sum_{n=0}^\\infty \\frac{f^{(n)}(a)}{n!} (x-a)^n',
  'A = \\pi r^2',
  'c^2 = a^2 + b^2',
  'E = mc^2',
  '\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1',
  '\\frac{d}{dx}(\\ln x) = \\frac{1}{x}',
  '\\sum_{n=1}^\\infty \\frac{1}{n^2} = \\frac{\\pi^2}{6}',
  'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
  'V = \\frac{4}{3}\\pi r^3',
  'F = G \\frac{m_1 m_2}{r^2}',
  '\\oint \\mathbf{B} \\cdot d\\mathbf{l} = \\mu_0 I',
  'i^2 = -1',
  '\\frac{\\partial^2 u}{\\partial t^2} = c^2 \\nabla^2 u',
  '\\det(A-\\lambda I) = 0',
  'P(A|B) = \\frac{P(B|A)P(A)}{P(B)}'
];

interface EqProps {
  id: number;
  eq: string;
  top: number;
  left: number;
  rotate: number;
  opacity: number;
  fontSize: number;
}

export default function BackgroundEquations() {
  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState<EqProps[]>([]);

  useEffect(() => {
    // Generate equations randomly on client mount to avoid hydration mismatch
    const generated = Array.from({ length: 40 }).map((_, i) => {
      const eq = EQUATIONS[i % EQUATIONS.length];
      const top = Math.floor(Math.random() * 100);
      const left = Math.floor(Math.random() * 100);
      const rotate = Math.floor(Math.random() * 60) - 30; // -30 to 30 deg
      const opacity = 0.02 + Math.random() * 0.06; // 0.02 to 0.08
      const fontSize = 1 + Math.random() * 2; // 1rem to 3rem

      return { id: i, eq, top, left, rotate, opacity, fontSize };
    });
    setItems(generated);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute text-neutral-500 whitespace-nowrap drop-shadow-md"
          style={{
            top: `${item.top}%`,
            left: `${item.left}%`,
            transform: `translate(-50%, -50%) rotate(${item.rotate}deg)`,
            opacity: item.opacity,
            fontSize: `${item.fontSize}rem`,
          }}
        >
          <BlockMath math={item.eq} />
        </div>
      ))}
    </div>
  );
}
