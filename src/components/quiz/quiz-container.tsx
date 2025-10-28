'use client';

import { arr, dummyQuizzes } from '@/lib/data';
import { decodeStr, getTimer, setTimer } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Quiz } from '@/types';
import { Label } from '../ui/label';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';

interface QuizProps {
  id: number;
  quiz: Quiz;
}

export default function QuizContainer({ id, quiz }: QuizProps) {
  const router = useRouter();
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    if (seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        setTimer(prev - 1);

        return prev - 1;
      });
    }, 1000);

    return () => {
      console.log(getTimer());
      clearInterval(interval);
    };
  }, [seconds]);

  const valueChangeHandler = useCallback(() => {
    arr.push(id);
    if (id < dummyQuizzes.length - 1) {
      router.push(`/quiz/${id + 1}`);
    } else {
      router.push(`/quiz/result`);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between">
        <p>
          Question {id} out of {dummyQuizzes.length}
        </p>
        <p>Time Left: {seconds}s</p>
      </div>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-center text-xl">{decodeStr(quiz.question)}</h2>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-2">
        {quiz.shuffled_answers?.map((answer, i) => {
          return <Button key={i}>{decodeStr(answer)}</Button>;
        })}
      </div>

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
    </div>
  );
}
