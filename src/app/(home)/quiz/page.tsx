'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import QuizContainer from '@/components/quiz/quiz-container';
import { notFound, useRouter } from 'next/navigation';
import { useTimerStore } from '@/hooks/use-timer-store';
import { useTimerEffect } from '@/hooks/use-timer-effect';
import { useQuizzesStore } from '@/hooks/use-quizzes';
import { useQuizProgressStore } from '@/hooks/use-quiz-progress';
import clsx from 'clsx';

export default function QuizPage() {
  const { quizzes, getQuizNo } = useQuizzesStore();
  const { finished, userAnswers, addAnswer } = useQuizProgressStore();

  if (quizzes.length < 1) return notFound();

  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const currentNo = useMemo(() => userAnswers.length, [userAnswers]);

  const { running, timer, startTimer } = useTimerStore();
  useTimerEffect();

  useEffect(() => {
    setMounted(true);

    if (!running) {
      startTimer(quizzes.length * 5);
    } else {
      startTimer(timer);
    }
  }, []);

  const answerHandler = useCallback(
    (answer: string) => {
      if (currentNo < quizzes.length) {
        addAnswer(answer);
      }
    },
    [currentNo, quizzes]
  );

  useEffect(() => {
    if (!mounted) return;

    if (timer <= 0 || currentNo >= quizzes.length) {
      router.push('/quiz/result');
    }
  }, [mounted, timer, currentNo, quizzes]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between">
        <p>
          Question {Math.min(currentNo + 1, quizzes.length)} out of{' '}
          {quizzes.length}
        </p>
        <div
          className={clsx(timer > 15 ? 'text-amber-100' : 'text-destructive')}
        >
          <span>Time Left: </span>
          <span>{timer}s</span>
        </div>
      </div>

      <QuizContainer
        quiz={getQuizNo(Math.min(currentNo, quizzes.length - 1))}
        onSelect={answerHandler}
      />
    </div>
  );
}
