'use client';

import { Button } from '@/components/ui/button';
import { userAnswers, dummyQuizzes } from '@/lib/data';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

export default function ResultPage() {
  const [quizzes] = useState(dummyQuizzes);
  const [answers] = useState(userAnswers);

  const { correctAnswers, incorrectAnswers } = useMemo(() => {
    const mappedAnswers = answers.map(
      (ans, i) => ans === quizzes[i].correct_answer
    );

    return {
      correctAnswers: mappedAnswers.filter((ans) => ans),
      incorrectAnswers: mappedAnswers.filter((ans) => !ans),
    };
  }, []);

  useEffect(() => {
    dummyQuizzes.splice(0);
    userAnswers.splice(0);
  }, []);

  return (
    <div>
      <p>
        You have answered {answers.length} out of {quizzes.length} questions!
      </p>
      <p>Correct answer = {correctAnswers.length}</p>
      <p>Incorrect answer = {incorrectAnswers.length}</p>

      <Button asChild>
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  );
}
