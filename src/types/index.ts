export interface QuizCategory {
  id: number;
  name: string;
}

export const quizDifficulties = ['any', 'easy', 'medium', 'hard'] as const;
type QuizDifficulty = (typeof quizDifficulties)[number];

export const quizTypes = ['any', 'boolean', 'multiple'] as const;
type QuizType = (typeof quizTypes)[number];

export interface Quiz {
  type: QuizType;
  difficulty: QuizDifficulty;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizRequest {
  amount: number;
  category?: QuizCategory['id'];
  difficulty?: QuizDifficulty;
  type?: QuizType;
}

export const ResponseCodeMessages = {
  0: 'Success',
  1: 'No Results',
  2: 'Invalid Parameter',
  3: 'Token Not Found',
  4: 'Token Empty',
  5: 'ID Not Found',
} as const;

export interface QuizResponse {
  response_code?: keyof typeof ResponseCodeMessages;
  results: Quiz[];
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  display_name: string;
  avatar_url?: string;
}