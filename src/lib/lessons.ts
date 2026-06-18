import { Question, questions } from './questions';

export interface Lesson {
  id: string;
  topic: string;
  title: string;
  conceptText: string;
  exampleQuestion: Question;     // Animated automatically
  challengeQuestion: Question;   // The user must solve this
}

export type ClientLesson = Omit<Lesson, 'challengeQuestion'> & {
  challengeQuestion: Omit<Question, 'accepts' | 'steps' | 'historicalContext'>
};

// Helper to pull existing questions by ID
const getQuestion = (id: string): Question => {
  const q = questions.find(q => q.id === id);
  if (!q) throw new Error(`Question ${id} not found`);
  return q;
};

export const lessons: Lesson[] = [
  {
    id: 'lesson-product-rule',
    topic: 'Calculus',
    title: 'The Product Rule',
    conceptText: 'When taking the derivative of two functions multiplied together, you cannot simply multiply their derivatives. Instead, you must use the Product Rule: (u · v)′ = u′v + uv′. This ensures both rates of change interact correctly.',
    exampleQuestion: {
      id: 'example-calculus-1',
      topic: 'Calculus',
      description: 'Find the derivative of f(x) = x^2 \\sin(x).',
      equation: '\\frac{d}{dx} (x^2 \\sin x) = ?',
      difficulty: 'Intermediate',
      accepts: [], // Doesn't need accepts since it's just an example
      animationType: 'step-by-step',
      steps: [
        '\\frac{d}{dx} (\\textcolor{#ec4899}{x^2} \\textcolor{#3b82f6}{\\sin x})',
        '\\text{Product rule: } (\\textcolor{#ec4899}{u}\\cdot \\textcolor{#3b82f6}{v})\' = \\textcolor{#ec4899}{u\'}\\textcolor{#3b82f6}{v} + \\textcolor{#ec4899}{u}\\textcolor{#3b82f6}{v\'}',
        '\\textcolor{#ec4899}{2x} \\textcolor{#3b82f6}{\\sin(x)} + \\textcolor{#ec4899}{x^2} \\textcolor{#3b82f6}{\\cos(x)}',
        'x (\\textcolor{#ec4899}{2} \\textcolor{#3b82f6}{\\sin x} + \\textcolor{#ec4899}{x} \\textcolor{#3b82f6}{\\cos x})'
      ],
    },
    challengeQuestion: getQuestion('hard-calculus-1')
  },
  {
    id: 'lesson-determinant',
    topic: 'Linear Algebra',
    title: '2x2 Determinants',
    conceptText: 'The determinant of a 2x2 matrix geometrically represents the scaling factor of the linear transformation described by the matrix. For a matrix [[a, b], [c, d]], it is calculated as (ad - bc).',
    exampleQuestion: {
      id: 'example-matrix-1',
      topic: 'Linear Algebra',
      description: 'Find the determinant of the 2x2 matrix.',
      equation: '\\det \\begin{pmatrix} 5 & 3 \\\\ 2 & 4 \\end{pmatrix} = ?',
      difficulty: 'Intermediate',
      accepts: [],
      animationType: 'step-by-step',
      steps: [
        '\\det \\begin{pmatrix} \\textcolor{#ec4899}{5} & \\textcolor{#3b82f6}{3} \\\\ \\textcolor{#3b82f6}{2} & \\textcolor{#ec4899}{4} \\end{pmatrix}',
        '(\\textcolor{#ec4899}{5} \\times \\textcolor{#ec4899}{4}) - (\\textcolor{#3b82f6}{3} \\times \\textcolor{#3b82f6}{2})',
        '\\textcolor{#ec4899}{20} - \\textcolor{#3b82f6}{6}',
        '\\textcolor{#10b981}{14}'
      ],
    },
    challengeQuestion: getQuestion('hard-matrix-1')
  },
  {
    id: 'lesson-geometric-series',
    topic: 'Series',
    title: 'Infinite Geometric Series',
    conceptText: 'An infinite geometric series sums an endless sequence of numbers where each term is multiplied by a constant ratio "r". If the absolute value of r is less than 1, the infinite sum converges to a finite value: S = a / (1 - r), where "a" is the first term.',
    exampleQuestion: {
      id: 'example-series-1',
      topic: 'Series',
      description: 'Evaluate the infinite geometric series.',
      equation: '\\sum_{n=1}^{\\infty} \\left(\\frac{1}{3}\\right)^n = ?',
      difficulty: 'Intermediate',
      accepts: [],
      animationType: 'step-by-step',
      steps: [
        '\\sum_{n=1}^{\\infty} \\left(\\textcolor{#3b82f6}{\\frac{1}{3}}\\right)^n',
        'S = \\frac{\\textcolor{#ec4899}{a}}{1 - \\textcolor{#3b82f6}{r}}',
        'S = \\frac{\\textcolor{#ec4899}{1/3}}{1 - \\textcolor{#3b82f6}{1/3}}',
        'S = \\frac{1/3}{2/3}',
        'S = \\textcolor{#10b981}{\\frac{1}{2}}'
      ],
    },
    challengeQuestion: getQuestion('int-series-1')
  },
  {
    id: 'lesson-quadratics',
    topic: 'Quadratics',
    title: 'Factoring Quadratics',
    conceptText: 'To find the roots of a quadratic equation in the form x² + bx + c = 0, we can factor it into (x + p)(x + q) = 0. We need to find two numbers p and q that multiply to "c" and add up to "b".',
    exampleQuestion: {
      id: 'example-quad-1',
      topic: 'Quadratics',
      description: 'Find any root for x.',
      equation: 'x^2 + 5x + 6 = 0',
      difficulty: 'Basic',
      accepts: [],
      animationType: 'step-by-step',
      steps: [
        'x^2 + \\textcolor{#ec4899}{5x} + \\textcolor{#3b82f6}{6} = 0',
        '\\text{Find numbers that multiply to 6 and add to 5}',
        '(x + \\textcolor{#ec4899}{2})(x + \\textcolor{#3b82f6}{3}) = 0',
        'x = \\textcolor{#10b981}{-2} \\quad \\text{or} \\quad x = \\textcolor{#10b981}{-3}'
      ],
    },
    challengeQuestion: getQuestion('int-algebra-1')
  }
];

export const getRandomLesson = (): Lesson => {
  return lessons[Math.floor(Math.random() * lessons.length)];
};
