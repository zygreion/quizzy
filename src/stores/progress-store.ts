import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';

type ProgressState = {
  answers: string[];

  running: boolean;
  timer: number;

  ended: boolean;
};

type ProgressActions = {
  addAnswer: (answer: string) => void;
  clearAnswers: () => void;

  setRunning: (value: ProgressState['running']) => void;
  setTimer: (value: ProgressState['timer']) => void;
  startTimer: (time: ProgressState['timer']) => void;
  resetTimer: () => void;

  setEnded: (value: ProgressState['ended']) => void;
};

export type ProgressStore = ProgressState & ProgressActions;

const defaultInitState: ProgressState = {
  answers: [],
  ended: false,

  timer: 0,
  running: false,
};

export const createProgressStore = (
  initState: ProgressState = defaultInitState
) => {
  return createStore<ProgressStore>()(
    persist(
      (set, get) => ({
        ...initState,

        setTimer: (value) => set({ timer: value }),
        setRunning: (value) => set({ running: value }),
        startTimer: (time) => set({ timer: time, running: true }),
        resetTimer: () => set({ running: false, timer: 0 }),

        addAnswer: (newAnswer) =>
          set({ answers: [...get().answers, newAnswer] }),
        clearAnswers: () => set({ answers: [] }),

        setEnded: (value) => set({ ended: value }),
      }),
      { name: 'progress' }
    )
  );
};
