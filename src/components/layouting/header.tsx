'use client';

import { logout } from '@/actions/auth';
import { Button } from '../ui/button';
import { useCallback } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { LogoutIcon } from '../icons';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  displayName: string;
}

export function Header({ displayName }: HeaderProps) {
  const pathname = usePathname();

  const handleLogout = useCallback(async () => {
    await logout();
  }, []);

  if (pathname === '/quiz') {
    return;
  }

  return (
    <div className="flex w-full items-center justify-between gap-4 py-4">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="/shadcn-avatar.jpg" alt="@shadcn" />
          <AvatarFallback>PP</AvatarFallback>
        </Avatar>
        <span>{displayName}</span>
      </div>
      <Button
        variant="destructive"
        size="sm"
        onClick={handleLogout}
        className="flex items-center gap-2 hover:cursor-pointer"
      >
        <span className="leading-0">Logout </span>
        <LogoutIcon />
      </Button>
    </div>
  );
}
