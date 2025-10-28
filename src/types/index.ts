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
  shuffled_answers?: string[];
}

export interface QuizRequest {
  amount: number;
  category?: QuizCategory['id'];
  difficulty?: QuizDifficulty;
  type?: QuizType;
}

export interface QuizResponse {
  response_code: 0 | 1 | 2 | 3 | 4 | 5;
  results: Quiz[];
}
