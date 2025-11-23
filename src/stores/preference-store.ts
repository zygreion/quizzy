import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';
import { QuizRequest } from '@/types';

type PreferenceState = QuizRequest;

type PreferenceActions = {
  setPreference: (newPreference: PreferenceState) => void;
};

export type PreferenceStore = PreferenceState & PreferenceActions;

const defaultInitState: PreferenceState = {
  amount: 20,
  category: 12,
  difficulty: 'hard',
  type: 'any',
};

export const createPreferenceStore = (
  initState: PreferenceState = defaultInitState
) => {
  return createStore<PreferenceStore>()(
    persist(
      (set, get) => ({
        ...initState,

        setPreference: (newPreference) => set({ ...newPreference }),
      }),
      { name: 'preference' }
    )
  );
};
