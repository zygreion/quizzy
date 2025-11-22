import { Quiz } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = { quizzes: Quiz[] };
type Actions = {
  getQuizNo: (no: number) => Quiz;
  setQuizzes: (newQuizzes: State['quizzes']) => void;
  clearQuizzes: () => void;
  getCorrectAnswers: () => string[];
};
type Store = State & Actions;

export const useQuizzesStore = create<Store>()(
  persist(
    (set, get) => ({
      quizzes: [],

      getQuizNo: (no) => get().quizzes[no],
      setQuizzes: (newQuizzes) => set({ quizzes: newQuizzes }),
      clearQuizzes: () => set({ quizzes: [] }),
      getCorrectAnswers: () => get().quizzes.map((q) => q.correct_answer),
    }),
    { name: 'quizzes-storage' }
  )
);
