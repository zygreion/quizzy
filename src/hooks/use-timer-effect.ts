import { useEffect } from 'react';
import { useTimerStore } from './use-timer-store';

export function useTimerEffect() {
  const { timer, running, setTimer, clearTimer: resetTimer } = useTimerStore();

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTimer(Math.max(timer - 1, 0));
    }, 1000);

    if (timer <= 0) resetTimer();

    return () => clearInterval(interval);
  }, [timer, running, setTimer, resetTimer]);
}
