'use client';

import { useCallback, useEffect, useState } from 'react';
import { userAnswers, dummyQuizzes } from '@/lib/data';
import QuizContainer from '@/components/quiz/quiz-container';
import useTimer from '@/hooks/use-timer';
import { useRouter } from 'next/navigation';

export default function QuizPage() {
  const quizzes = dummyQuizzes;

  if (quizzes.length < 1) {
    return <p>Soal tidak ditemukan!</p>;
  }

  const router = useRouter();
  const [no, setNo] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const { seconds } = useTimer(60);

  const answerHandler = useCallback(
    (answer: string) => {
      const ansLen = answers.length;
      const quizLen = quizzes.length;

      if (ansLen < quizLen) {
        if (ansLen < quizLen - 1) {
          setNo((prev) => prev + 1);
        }

        setAnswers((prev) => [...prev, answer]);
      }
    },
    [answers]
  );

  useEffect(() => {
    console.log(
      no,
      answers.map((answer, i) => answer === quizzes[i].correct_answer)
    );

    if (answers.length >= quizzes.length) {
      userAnswers.push(...answers);
      router.push('/quiz/result');
    }
  }, [answers]);

  useEffect(() => {
    if (seconds <= 0) {
      router.push('/quiz/result');
    }
  }, [seconds]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between">
        <p>
          Question {no + 1} out of {dummyQuizzes.length}
        </p>
        <p>Time Left: {seconds}s</p>
      </div>

      <QuizContainer quiz={quizzes[no]} onSelect={answerHandler} />
    </div>
  );
}
