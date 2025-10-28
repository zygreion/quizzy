'use client';

import { arr, dummyQuizzes } from '@/lib/data';
import { decodeStr, shuffleArray } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Quiz } from '@/types';
import { Label } from '../ui/label';

interface QuizProps {
  id: number;
  quiz: Quiz;
}

export default function QuizContainer({ id, quiz }: QuizProps) {
  const router = useRouter();
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const valueChangeHandler = useCallback(() => {
    arr.push(id);
    if (id < dummyQuizzes.length - 1) {
      router.push(`/quiz/${id + 1}`);
    } else {
      router.push(`/result`);
    }
  }, []);

  return (
    <>
      <p>{decodeStr(quiz.question)}</p>

      <RadioGroup onValueChange={valueChangeHandler}>
        {quiz.shuffled_answers?.map((answer, i) => {
          return (
            <div className="flex items-center space-x-2" key={i}>
              <RadioGroupItem value={answer} id={i.toString()} />
              <Label htmlFor={i.toString()} className="text-base font-normal">
                {decodeStr(answer)}
              </Label>
            </div>
          );
        })}
      </RadioGroup>

      <p>Time Left: {seconds}</p>
    </>
  );
}
