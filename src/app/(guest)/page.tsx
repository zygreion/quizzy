import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div>
      <p>Ini adalah landing page</p>
      <Button asChild>
        <Link href="/auth/login">Get Started</Link>
      </Button>
    </div>
  );
}
