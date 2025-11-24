import QuizForm from '@/components/quiz/quiz-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function HomePage() {
  return (
    <div className="w-full">
      <QuizForm />
      <Button asChild><Link href='/profile'>Profile</Link></Button>
    </div>
  );
}
