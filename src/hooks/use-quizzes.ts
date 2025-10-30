import { Quiz } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UseQuizzesState = { quizzes: Quiz[] };
type UseQuizzesActions = {
  getQuizNo: (no: number) => Quiz;
  setQuizzes: (newQuizzes: UseQuizzesState['quizzes']) => void;
  clearQuizzes: () => void;
  getCorrectAnswers: () => string[];
};
type UseQuizzesStore = UseQuizzesState & UseQuizzesActions;

export const useQuizzesStore = create<UseQuizzesStore>()(
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
