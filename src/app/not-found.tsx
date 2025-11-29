'use client';

import { Button } from '@/components/ui/button';
import { useAccountStore } from '@/hooks/use-account-store';
import Link from 'next/link';

export default function NotFound() {
  const { id } = useAccountStore((state) => state);

  return (
    <div className="0 flex min-h-screen flex-col items-center justify-center gap-2">
      <h2 className="text-3xl">
        <span className="font-bold">404</span> | Not Found
      </h2>
      <p>Could not find requested resource</p>
      <Button variant="secondary" asChild className="mt-6" size="sm">
        <Link href={id ? '/home' : '/'}>Go Home</Link>
      </Button>
    </div>
  );
}
