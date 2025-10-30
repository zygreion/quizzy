import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UseQuizProgressState = { userAnswers: string[]; finished: boolean };
type UseQuizProgressActions = {
  addAnswer: (newAnswer: string) => void;
  clearAnswers: () => void;
  setFinished: (value: boolean) => void;
};
type UseQuizProgressStore = UseQuizProgressState & UseQuizProgressActions;

export const useQuizProgressStore = create<UseQuizProgressStore>()(
  persist(
    (set, get) => ({
      userAnswers: [],
      finished: false,

      addAnswer: (newAnswer) =>
        set({ userAnswers: [...get().userAnswers, newAnswer] }),
      clearAnswers: () => set({ userAnswers: [] }),
      setFinished: (value) => set({ finished: value }),
    }),
    { name: 'quiz-progress-storage' }
  )
);
