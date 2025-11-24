'use client';

import { useCallback, useEffect } from 'react';
import QuizContainer from '@/components/quiz/quiz-container';
import { notFound, useRouter } from 'next/navigation';
import { useTimerEffect } from '@/hooks/use-timer-effect';
import {
  useProgressStore,
  useQuizzesStore,
} from '@/providers/zustand-providers';
import { cn } from '@/lib/utils';

export default function QuizPage() {
  const { quizzes, getQuizNo } = useQuizzesStore((state) => state);
  const {
    // Answers
    answers,
    addAnswer,

    // Time and state
    timer,
    running,
    ended,
    startTimer,
    setRunning,
  } = useProgressStore((state) => state);

  useTimerEffect();

  const router = useRouter();
  const currentNo = answers.length;

  useEffect(() => {
    if (!ended && !running) {
      startTimer(quizzes.length * 4);
    } else {
      startTimer(timer);
    }
  }, [quizzes.length, running, startTimer, timer, ended]);

  const onAnswer = useCallback(
    (answer: string) => {
      if (currentNo < quizzes.length) {
        addAnswer(answer);
      }
    },
    [addAnswer, currentNo, quizzes.length]
  );

  useEffect(() => {
    if ((!ended && running && timer <= 0) || currentNo >= quizzes.length) {
      router.push('/quiz/result');
    }
  }, [timer, currentNo, quizzes, router, running, setRunning, ended]);

  if (quizzes.length < 1) return notFound();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between">
        <p>
          Question {Math.min(currentNo + 1, quizzes.length)} out of{' '}
          {quizzes.length}
        </p>
        <div className={cn(timer > 15 ? 'text-amber-100' : 'text-destructive')}>
          <span>Time Left: </span>
          <span>{timer}s</span>
        </div>
      </div>

      <QuizContainer
        quiz={getQuizNo(Math.min(currentNo, quizzes.length - 1))}
        onAnswer={onAnswer}
      />
    </div>
  );
}
