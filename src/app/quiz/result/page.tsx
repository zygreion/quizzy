import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function ResultPage() {
  return (
    <div>
      <p>Time's up!</p>
      <p>Your score is 8/10</p>
      <Button asChild>
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  );
}
