import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';
import { Quiz } from '@/types';
import { createStoreProvider } from '@/providers/create-store-provider';

type QuizzesState = { quizzes: Quiz[] };

type QuizzesActions = {
  getQuizNo: (no: number) => Quiz;
  setQuizzes: (newQuizzes: QuizzesState['quizzes']) => void;
  clearQuizzes: () => void;
  getCorrectAnswers: () => string[];
};

type QuizzesStore = QuizzesState & QuizzesActions;

const defaultInitState: QuizzesState = {
  quizzes: [],
};

const createQuizzesStore = (initState: QuizzesState = defaultInitState) => {
  return createStore<QuizzesStore>()(
    persist(
      (set, get) => ({
        ...initState,

        getQuizNo: (no) => get().quizzes[no],
        setQuizzes: (newQuizzes) => set({ quizzes: newQuizzes }),
        clearQuizzes: () => set({ quizzes: [] }),
        getCorrectAnswers: () => get().quizzes.map((q) => q.correct_answer),
      }),
      { name: 'quizzes' }
    )
  );
};

// prettier-ignore
export const {
  Provider: QuizzesStoreProvider,
  useStore: useQuizzesStore,
} = createStoreProvider<QuizzesStore>(createQuizzesStore, 'QuizzesStore');
