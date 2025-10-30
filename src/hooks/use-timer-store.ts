import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UseTimerState = { timer: number; running: boolean };
type UseTimerActions = {
  setTimer: (value: UseTimerState['timer']) => void;
  startTimer: (time: number) => void;
  clearTimer: () => void;
};
type UseTimerStore = UseTimerState & UseTimerActions;

export const useTimerStore = create<UseTimerStore>()(
  persist(
    (set, get) => ({
      timer: 0,
      running: false,

      setTimer: (value) => set({ timer: value }),
      startTimer: (time) => set({ timer: time, running: true }),
      clearTimer: () => set({ running: false, timer: 0 }),
    }),
    { name: 'timer-storage' }
  )
);
