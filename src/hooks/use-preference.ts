import { QuizRequest } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UsePreferenceState = QuizRequest;
type UsePreferenceActions = {
  getPreference: () => UsePreferenceState;
  setPreference: (newPreference: UsePreferenceState) => void;
};
type UsePreferenceStore = UsePreferenceState & UsePreferenceActions;

export const usePreferenceStore = create<UsePreferenceStore>()(
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
