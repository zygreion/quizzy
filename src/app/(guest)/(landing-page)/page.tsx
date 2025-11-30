import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex grow flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-serif text-7xl font-semibold text-amber-500">
          Quizzy
        </h1>
        <p className="italic">Train your knowledge about things</p>
      </div>
      <Button variant="outline" asChild>
        <Link href="/auth/login">Get Started</Link>
      </Button>
    </div>
  );
}
