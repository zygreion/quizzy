import { useEffect } from 'react';
import { useProgressStore } from '@/providers/progress-provider';

export function useTimerEffect() {
  const { timer, running, setTimer, resetTimer } = useProgressStore(
    (state) => state
  );

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTimer(Math.max(timer - 1, 0));
    }, 1000);

    if (timer <= 0) resetTimer();

    return () => clearInterval(interval);
  }, [timer, running, setTimer, resetTimer]);
}
