import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex grow flex-col items-center justify-center gap-2">
      <h2 className="text-3xl">
        <span className="font-bold">404</span> | Not Found
      </h2>
      <p>Could not find requested resource</p>
      <Button asChild className="mt-6" size="sm">
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  );
}
