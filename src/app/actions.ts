'use server';

import { questions, Question, ClientQuestion } from '@/lib/questions';
import { lessons, ClientLesson } from '@/lib/lessons';

export async function getRandomClientLesson(): Promise<ClientLesson> {
  const l = lessons[Math.floor(Math.random() * lessons.length)];
  
  return {
    id: l.id,
    topic: l.topic,
    title: l.title,
    conceptText: l.conceptText,
    exampleQuestion: l.exampleQuestion,
    challengeQuestion: {
      id: l.challengeQuestion.id,
      topic: l.challengeQuestion.topic,
      description: l.challengeQuestion.description,
      equation: l.challengeQuestion.equation,
      difficulty: l.challengeQuestion.difficulty,
      animationType: l.challengeQuestion.animationType,
    }
  };
}

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

export async function validateAnswer(id: string, answer: string): Promise<{ correct: boolean, feedback?: string, fullQuestion: Question | null }> {
  const question = questions.find(q => q.id === id);
  
  if (!question) {
    return { correct: false, fullQuestion: null };
  }

  const sanitizedAnswer = answer.toLowerCase().replace(/\s+/g, '');
  
  const isCorrect = question.accepts.some(accepted => 
    accepted.toLowerCase().replace(/\s+/g, '') === sanitizedAnswer
  );

  if (isCorrect) {
    return { correct: true, fullQuestion: question };
  }

  // Check for common errors
  if (question.commonErrors) {
    for (const error of question.commonErrors) {
      const isCommonError = error.matches.some(match => 
        match.toLowerCase().replace(/\s+/g, '') === sanitizedAnswer
      );
      if (isCommonError) {
        return { correct: false, feedback: error.feedback, fullQuestion: question };
      }
    }
  }

  return { correct: false, fullQuestion: question };
}
