import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';
import { QuizRequest } from '@/types';
import { createStoreProvider } from '@/providers/create-store-provider';

type PreferenceState = QuizRequest;

type PreferenceActions = {
  setPreference: (newPreference: PreferenceState) => void;
};

type PreferenceStore = PreferenceState & PreferenceActions;

const defaultInitState: PreferenceState = {
  amount: 20,
  category: 12,
  difficulty: 'hard',
  type: 'any',
};

const createPreferenceStore = (
  initState: PreferenceState = defaultInitState
) => {
  return createStore<PreferenceStore>()(
    persist(
      // eslint-disable-next-line unused-imports/no-unused-vars
      (set, get) => ({
        ...initState,

        setPreference: (newPreference) => set({ ...newPreference }),
      }),
      { name: 'preference' }
    )
  );
};

// prettier-ignore
export const {  
  Provider: PreferenceStoreProvider,
  useStore: usePreferenceStore,
} = createStoreProvider<PreferenceStore>(createPreferenceStore, 'PreferenceStore');
