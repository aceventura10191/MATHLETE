export type Difficulty = 'Basic' | 'Intermediate' | 'Hard' | 'Advanced';
export type AnimationType = 'geometric' | 'step-by-step';

export interface Question {
  id: string;
  topic: string;
  description: string;
  equation: string;
  difficulty: Difficulty;
  accepts: string[];
  animationType: AnimationType;
  steps?: string[]; // The steps for the GSAP Textual Solver
}

export const questions: Question[] = [
  // BASIC (6 questions)
  {
    id: 'basic-algebra-1',
    topic: 'Algebra',
    description: 'Solve for x.',
    equation: '2x + 5 = 13',
    difficulty: 'Basic',
    accepts: ['4', 'x=4'],
    animationType: 'step-by-step',
    steps: [
      '2x + 5 = 13',
      '2x = 13 - 5',
      '2x = 8',
      'x = 4'
    ]
  },
  {
    id: 'basic-algebra-2',
    topic: 'Algebra',
    description: 'Solve for y.',
    equation: '3y - 7 = 14',
    difficulty: 'Basic',
    accepts: ['7', 'y=7'],
    animationType: 'step-by-step',
    steps: [
      '3y - 7 = 14',
      '3y = 14 + 7',
      '3y = 21',
      'y = 7'
    ]
  },
  {
    id: 'basic-arithmetic-1',
    topic: 'Arithmetic',
    description: 'Calculate the value.',
    equation: '15 \\times 4 - 20 = ?',
    difficulty: 'Basic',
    accepts: ['40'],
    animationType: 'step-by-step',
    steps: [
      '15 \\times 4 - 20',
      '60 - 20',
      '40'
    ]
  },
  {
    id: 'basic-arithmetic-2',
    topic: 'Arithmetic',
    description: 'Evaluate the expression.',
    equation: '5^2 + 3^2 = ?',
    difficulty: 'Basic',
    accepts: ['34'],
    animationType: 'step-by-step',
    steps: [
      '5^2 + 3^2',
      '25 + 9',
      '34'
    ]
  },
  {
    id: 'basic-fractions-1',
    topic: 'Fractions',
    description: 'Simplify the expression.',
    equation: '\\frac{1}{2} + \\frac{1}{4} = ?',
    difficulty: 'Basic',
    accepts: ['3/4', '0.75'],
    animationType: 'step-by-step',
    steps: [
      '\\frac{1}{2} + \\frac{1}{4}',
      '\\frac{2}{4} + \\frac{1}{4}',
      '\\frac{3}{4}'
    ]
  },
  {
    id: 'basic-percentages-1',
    topic: 'Percentages',
    description: 'Find 20% of 150.',
    equation: '20\\% \\times 150 = ?',
    difficulty: 'Basic',
    accepts: ['30'],
    animationType: 'step-by-step',
    steps: [
      '20\\% \\times 150',
      '0.2 \\times 150',
      '30'
    ]
  },

  // INTERMEDIATE (6 questions)
  {
    id: 'sum-of-odds',
    topic: 'Number Theory',
    description: 'Find the sum of the first n odd numbers.',
    equation: '1 + 3 + \\dots + (2n - 1) = ?',
    difficulty: 'Intermediate',
    accepts: ['n^2', 'n2', 'n*n'],
    animationType: 'geometric', // Uses bespoke SVG
  },
  {
    id: 'int-algebra-1',
    topic: 'Quadratics',
    description: 'Find any root for x.',
    equation: 'x^2 - 5x + 6 = 0',
    difficulty: 'Intermediate',
    accepts: ['3', 'x=3', '2', 'x=2', '2,3', '3,2'],
    animationType: 'step-by-step',
    steps: [
      'x^2 - \\textcolor{#ec4899}{5x} + \\textcolor{#3b82f6}{6} = 0',
      '(x - \\textcolor{#ec4899}{2})(x - \\textcolor{#3b82f6}{3}) = 0',
      'x = \\textcolor{#10b981}{2} \\quad \\text{or} \\quad x = \\textcolor{#10b981}{3}'
    ]
  },
  {
    id: 'int-trig-1',
    topic: 'Trigonometry',
    description: 'Evaluate the sine function.',
    equation: '\\sin(30^\\circ) = ?',
    difficulty: 'Intermediate',
    accepts: ['0.5', '1/2'],
    animationType: 'step-by-step',
    steps: [
      '\\textcolor{#8b5cf6}{\\sin}(30^\\circ)',
      '\\text{Using the unit circle or special right triangles}',
      '\\textcolor{#fbbf24}{\\frac{1}{2}}'
    ]
  },
  {
    id: 'int-log-1',
    topic: 'Logarithms',
    description: 'Solve for x.',
    equation: '\\log_2(x) = 5',
    difficulty: 'Intermediate',
    accepts: ['32', 'x=32'],
    animationType: 'step-by-step',
    steps: [
      '\\textcolor{#3b82f6}{\\log_2}(x) = 5',
      '\\textcolor{#3b82f6}{2}^5 = x',
      'x = \\textcolor{#10b981}{32}'
    ]
  },
  {
    id: 'int-geometry-1',
    topic: 'Geometry',
    description: 'Find the hypotenuse of a right triangle with legs 6 and 8.',
    equation: 'c = \\sqrt{6^2 + 8^2}',
    difficulty: 'Intermediate',
    accepts: ['10', 'c=10'],
    animationType: 'step-by-step',
    steps: [
      'c = \\sqrt{\\textcolor{#ec4899}{6^2} + \\textcolor{#3b82f6}{8^2}}',
      'c = \\sqrt{\\textcolor{#ec4899}{36} + \\textcolor{#3b82f6}{64}}',
      'c = \\sqrt{\\textcolor{#10b981}{100}}',
      'c = \\textcolor{#fbbf24}{10}'
    ]
  },
  {
    id: 'int-series-1',
    topic: 'Series',
    description: 'Evaluate the infinite geometric series.',
    equation: '\\sum_{n=1}^{\\infty} \\left(\\frac{1}{2}\\right)^n = ?',
    difficulty: 'Intermediate',
    accepts: ['1'],
    animationType: 'step-by-step',
    steps: [
      '\\sum_{n=1}^{\\infty} \\left(\\textcolor{#3b82f6}{\\frac{1}{2}}\\right)^n',
      'S = \\frac{\\textcolor{#ec4899}{a}}{1 - \\textcolor{#3b82f6}{r}}',
      'S = \\frac{\\textcolor{#ec4899}{1/2}}{1 - \\textcolor{#3b82f6}{1/2}}',
      'S = \\textcolor{#10b981}{1}'
    ]
  },

  // HARD (6 questions)
  {
    id: 'hard-calculus-1',
    topic: 'Calculus',
    description: 'Find the derivative of f(x) = x^3 \ln(x).',
    equation: '\\frac{d}{dx} (x^3 \\ln x) = ?',
    difficulty: 'Hard',
    accepts: ['3x^2ln(x)+x^2', 'x^2(3lnx+1)', 'x^2(3ln(x)+1)'],
    animationType: 'step-by-step',
    steps: [
      '\\frac{d}{dx} (\\textcolor{#ec4899}{x^3} \\textcolor{#3b82f6}{\\ln x})',
      '\\text{Product rule: } (\\textcolor{#ec4899}{u}\\cdot \\textcolor{#3b82f6}{v})\' = \\textcolor{#ec4899}{u\'}\\textcolor{#3b82f6}{v} + \\textcolor{#ec4899}{u}\\textcolor{#3b82f6}{v\'}',
      '\\textcolor{#ec4899}{3x^2} \\textcolor{#3b82f6}{\\ln(x)} + \\textcolor{#ec4899}{x^3} \\textcolor{#3b82f6}{\\left(\\frac{1}{x}\\right)}',
      'x^2 (\\textcolor{#ec4899}{3} \\textcolor{#3b82f6}{\\ln x} + 1)'
    ]
  },
  {
    id: 'hard-calculus-2',
    topic: 'Calculus',
    description: 'Evaluate the definite integral.',
    equation: '\\int_{0}^{\\pi} \\sin(x) dx = ?',
    difficulty: 'Hard',
    accepts: ['2'],
    animationType: 'step-by-step',
    steps: [
      '\\int_{0}^{\\pi} \\textcolor{#3b82f6}{\\sin(x)} dx',
      '[\\textcolor{#ec4899}{-\\cos(x)}]_{0}^{\\pi}',
      '(\\textcolor{#ec4899}{-\\cos(\\pi)}) - (\\textcolor{#ec4899}{-\\cos(0)})',
      '(-(\\textcolor{#3b82f6}{-1})) - (\\textcolor{#3b82f6}{-1})',
      '\\textcolor{#10b981}{2}'
    ]
  },
  {
    id: 'hard-matrix-1',
    topic: 'Linear Algebra',
    description: 'Find the determinant of the 2x2 matrix.',
    equation: '\\det \\begin{pmatrix} 4 & 2 \\\\ 1 & 3 \\end{pmatrix} = ?',
    difficulty: 'Hard',
    accepts: ['10'],
    animationType: 'step-by-step',
    steps: [
      '\\det \\begin{pmatrix} \\textcolor{#ec4899}{4} & \\textcolor{#3b82f6}{2} \\\\ \\textcolor{#3b82f6}{1} & \\textcolor{#ec4899}{3} \\end{pmatrix}',
      '(\\textcolor{#ec4899}{4} \\times \\textcolor{#ec4899}{3}) - (\\textcolor{#3b82f6}{2} \\times \\textcolor{#3b82f6}{1})',
      '\\textcolor{#ec4899}{12} - \\textcolor{#3b82f6}{2}',
      '\\textcolor{#10b981}{10}'
    ]
  },
  {
    id: 'hard-diff-eq-1',
    topic: 'Differential Eq',
    description: 'Find the general solution to y\' = ky.',
    equation: '\\frac{dy}{dt} = ky',
    difficulty: 'Hard',
    accepts: ['Ce^{kt}', 'C*e^(kt)', 'y=Ce^{kt}'],
    animationType: 'step-by-step',
    steps: [
      '\\frac{dy}{dt} = k\\textcolor{#3b82f6}{y}',
      '\\textcolor{#3b82f6}{\\frac{1}{y}} dy = k dt',
      '\\int \\textcolor{#3b82f6}{\\frac{1}{y}} dy = \\int k dt',
      '\\textcolor{#ec4899}{\\ln|y|} = kt + C_1',
      'y = \\textcolor{#10b981}{C e^{kt}}'
    ]
  },
  {
    id: 'hard-combinatorics-1',
    topic: 'Combinatorics',
    description: 'How many ways can you arrange 5 unique books?',
    equation: '5! = ?',
    difficulty: 'Hard',
    accepts: ['120'],
    animationType: 'step-by-step',
    steps: [
      '5!',
      '5 \\times 4 \\times 3 \\times 2 \\times 1',
      '20 \\times 6',
      '120'
    ]
  },
  {
    id: 'hard-probability-1',
    topic: 'Probability',
    description: 'Find the probability of rolling a sum of 7 with two 6-sided dice.',
    equation: 'P(X+Y=7) = ?',
    difficulty: 'Hard',
    accepts: ['1/6', '6/36'],
    animationType: 'step-by-step',
    steps: [
      'P(X+Y=7)',
      '\\text{Favorable outcomes: } (1,6), (2,5), (3,4), (4,3), (5,2), (6,1)',
      '\\text{Total outcomes: } 36',
      '\\frac{6}{36}',
      '\\frac{1}{6}'
    ]
  },

  // ADVANCED (6 questions)
  {
    id: 'adv-complex-1',
    topic: 'Complex Analysis',
    description: 'Evaluate Euler\'s identity.',
    equation: 'e^{i\\pi} + 1 = ?',
    difficulty: 'Advanced',
    accepts: ['0', 'zero'],
    animationType: 'step-by-step',
    steps: [
      'e^{i\\pi} + 1',
      'e^{ix} = \\cos(x) + i\\sin(x)',
      '(\\cos(\\pi) + i\\sin(\\pi)) + 1',
      '(-1 + 0) + 1',
      '0'
    ]
  },
  {
    id: 'adv-modular-forms',
    topic: 'Modular Forms',
    description: 'Find the dimension of the space of cusp forms of weight 12 for SL(2,Z).',
    equation: '\\dim S_{12}(\\text{SL}_2(\\mathbb{Z})) = ?',
    difficulty: 'Advanced',
    accepts: ['1', 'one'],
    animationType: 'step-by-step',
    steps: [
      '\\dim S_{12}(\\text{SL}_2(\\mathbb{Z}))',
      '\\text{Ramanujan Delta Function } \\Delta(z) \\text{ is a cusp form of weight 12.}',
      'S_{12} \\text{ is spanned solely by } \\Delta',
      '1'
    ]
  },
  {
    id: 'adv-calculus-gaussian',
    topic: 'Advanced Calculus',
    description: 'Evaluate the Gaussian integral.',
    equation: '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = ?',
    difficulty: 'Advanced',
    accepts: ['\\sqrt{\\pi}', 'sqrt(pi)', 'root pi', '√π'],
    animationType: 'step-by-step',
    steps: [
      'I = \\int_{-\\infty}^{\\infty} e^{-x^2} dx',
      'I^2 = \\int_{-\\infty}^{\\infty} \\int_{-\\infty}^{\\infty} e^{-(x^2+y^2)} dx dy',
      '\\text{Polar coord: } I^2 = \\int_{0}^{2\\pi} \\int_{0}^{\\infty} e^{-r^2} r dr d\\theta',
      'I^2 = 2\\pi \\left[ -\\frac{1}{2} e^{-r^2} \\right]_0^\\infty',
      'I^2 = \\pi \\implies I = \\sqrt{\\pi}'
    ]
  },
  {
    id: 'adv-topology-1',
    topic: 'Topology',
    description: 'Euler characteristic of a sphere.',
    equation: '\\chi(S^2) = ?',
    difficulty: 'Advanced',
    accepts: ['2', 'two'],
    animationType: 'step-by-step',
    steps: [
      '\\chi(S^2)',
      '\\chi = V - E + F',
      '\\text{Consider a tetrahedron (homeomorphic to a sphere)}',
      '4 - 6 + 4',
      '2'
    ]
  },
  {
    id: 'adv-number-theory',
    topic: 'Analytic Number Theory',
    description: 'Value of the Riemann Zeta function at s=2.',
    equation: '\\zeta(2) = \\sum_{n=1}^{\\infty} \\frac{1}{n^2} = ?',
    difficulty: 'Advanced',
    accepts: ['\\pi^2/6', 'pi^2/6', 'pi^2 / 6'],
    animationType: 'step-by-step',
    steps: [
      '\\sum_{n=1}^{\\infty} \\frac{1}{n^2}',
      '\\text{Basel Problem, solved by Euler}',
      '\\frac{\\pi^2}{6}'
    ]
  },
  {
    id: 'adv-group-theory',
    topic: 'Group Theory',
    description: 'Order of the symmetric group S_4.',
    equation: '|S_4| = ?',
    difficulty: 'Advanced',
    accepts: ['24', '4!'],
    animationType: 'step-by-step',
    steps: [
      '|S_4|',
      '\\text{The number of permutations of 4 elements}',
      '4!',
      '4 \\times 3 \\times 2 \\times 1',
      '24'
    ]
  }
];

export const getRandomQuestion = () => {
  return questions[Math.floor(Math.random() * questions.length)];
};
