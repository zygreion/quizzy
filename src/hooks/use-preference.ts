import { QuizRequest } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = QuizRequest;
type Actions = {
  getPreference: () => State;
  setPreference: (newPreference: State) => void;
};
type Store = State & Actions;

export const usePreferenceStore = create<Store>()(
  persist(
    (set, get) => ({
      amount: 20,
      category: 12,
      difficulty: 'hard',
      type: 'any',

      getPreference: () => ({
        amount: get().amount,
        category: get().category,
        difficulty: get().difficulty,
        type: get().type,
      }),
      setPreference: (newPreference) => set({ ...newPreference }),
    }),
    { name: 'preference-storage' }
  )
);
