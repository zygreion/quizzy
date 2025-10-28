import { setTimer } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function useTimer(initialState: number) {
  const [seconds, setSeconds] = useState(initialState);

  useEffect(() => {
    if (seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        setTimer(prev - 1);

        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  return { seconds, setSeconds };
}
