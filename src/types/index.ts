/**
 * Resolve mapped types and show the derived keys and their types when hovering in
 * VS Code, instead of just showing the names those mapped types are defined with.
 *
 * References:
 * - supabase-js codebase
 * - https://twitter.com/mattpocockuk/status/1622730173446557697
 */
export type Prettify<T> = T extends Function ? T : { [K in keyof T]: T[K] };

export interface QuizCategory {
  id: number;
  name: string;
}

export const quizDifficulties = ['any', 'easy', 'medium', 'hard'] as const;
type QuizDifficulty = (typeof quizDifficulties)[number];

export const quizTypes = ['any', 'boolean', 'multiple'] as const;
type QuizType = (typeof quizTypes)[number];

export interface Quiz {
  id: string;
  type: QuizType;
  difficulty: QuizDifficulty;
  category: QuizCategory['name'];
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizRequest {
  amount: number;
  category_id?: QuizCategory['id'];
  difficulty?: QuizDifficulty;
  type?: QuizType;
}

export interface Preference extends QuizRequest {}

export const ResponseCodeMessages = {
  0: 'Success',
  1: 'No Results',
  2: 'Invalid Parameter',
  3: 'Token Not Found',
  4: 'Token Empty',
  5: 'ID Not Found',
} as const;

export interface QuizResponses {
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

export type Account = Prettify<
  User & {
    preference: Preference;
  }
>;
