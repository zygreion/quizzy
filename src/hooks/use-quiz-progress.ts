import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = { userAnswers: string[]; finished: boolean };
type Actions = {
  addAnswer: (newAnswer: string) => void;
  clearAnswers: () => void;
  setFinished: (value: boolean) => void;
};
type Store = State & Actions;

export const useQuizProgressStore = create<Store>()(
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
