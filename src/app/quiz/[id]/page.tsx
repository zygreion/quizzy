'use client';

import QuizContainer from '@/components/quiz/quiz-container';
import { dummyQuizzes } from '@/lib/data';
import { useParams } from 'next/navigation';

interface QuizPageProps {
  params: Promise<{ id: string }>;
}

export default function QuizPage({ params }: QuizPageProps) {
  const { id } = useParams();
  const intId = Number(id);

  if (intId < 0 || intId >= dummyQuizzes.length) {
    return <p>Soal tidak ditemukan!</p>;
  }

  const quiz = dummyQuizzes[intId];

  return (
    <>
      <QuizContainer id={intId} quiz={quiz} />
    </>
  );
}
