'use server';

import { questions, Question, ClientQuestion } from '@/lib/questions';

export async function getRandomClientQuestion(): Promise<ClientQuestion> {
  const q = questions[Math.floor(Math.random() * questions.length)];
  
  // Return the stripped down version to the client
  return {
    id: q.id,
    topic: q.topic,
    description: q.description,
    equation: q.equation,
    difficulty: q.difficulty,
    animationType: q.animationType,
  };
}

export async function validateAnswer(id: string, answer: string): Promise<{ correct: boolean, fullQuestion: Question | null }> {
  const question = questions.find(q => q.id === id);
  
  if (!question) {
    return { correct: false, fullQuestion: null };
  }

  // Check if answer matches any accepted answers
  // We sanitize spaces and convert to lowercase for leniency
  const sanitizedAnswer = answer.toLowerCase().replace(/\s+/g, '');
  
  const isCorrect = question.accepts.some(accepted => 
    accepted.toLowerCase().replace(/\s+/g, '') === sanitizedAnswer
  );

  return {
    correct: isCorrect,
    fullQuestion: question
  };
}
