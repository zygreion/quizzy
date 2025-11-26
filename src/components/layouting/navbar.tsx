'use client';

import { logout } from '@/actions/auth';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { LogoutIcon } from '../icons';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getUserClient } from '@/actions/profile-client';
import { User } from '@/types/index';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import Link from 'next/link';

export function Navbar() {
  const pathname = usePathname();
  const [headerInfo, setHeaderInfo] = useState<
    Pick<User, 'display_name' | 'email' | 'avatar_url'>
  >({
    display_name: '',
    email: '',
    avatar_url: '',
  });

  useEffect(() => {
    const getUserClientFn = async () => {
      const user = await getUserClient();

      if (!user) return;

      setHeaderInfo({
        display_name: user.display_name,
        email: user.email,
        avatar_url: user.avatar_url,
      });
    };

    getUserClientFn();
  }, []);

  if (pathname === '/quiz') {
    return;
  }

  return (
    <nav className="flex w-full items-center justify-between gap-4 py-4">
      <Link href="/" className="flex items-center gap-2">
        <span className="font-serif text-xl font-semibold text-orange-300">
          Quizzy
        </span>
      </Link>

      {/* Avatar */}
      <DropdownMenu>
        <DropdownMenuTrigger className="hover:border-ring ring-primary/50 rounded-2xl hover:cursor-pointer hover:ring-1">
          <div>
            <Avatar>
              <AvatarImage src={headerInfo.avatar_url} alt="" />
              <AvatarFallback>
                {headerInfo.display_name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="space-y-1">
            <p>{headerInfo.display_name}</p>
            <p className="text-xs font-normal">{headerInfo.email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>History</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <form action={logout}>
              <button
                type="submit"
                className="text-destructive dark:text-destructive flex w-full items-center gap-2"
              >
                <LogoutIcon />
                <span className="leading-0">Logout </span>
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
