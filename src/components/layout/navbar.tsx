'use client';

import { logout } from '@/actions/auth';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { usePathname, useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import Link from 'next/link';
import { useAccountStore } from '@/hooks/use-account-store';
import { LogOutIcon } from 'lucide-react';

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { avatar_url, display_name, email, clearAccount } = useAccountStore(
    (state) => state
  );

  if (pathname === '/home/quiz') {
    return;
  }

  const handleLogout = async () => {
    const error = await logout();

    if (!error) {
      clearAccount();
      router.push('/auth/login');
    }
  };

  return (
    <nav className="flex w-full items-center justify-between gap-4 py-4">
      <Link href="/home" className="flex items-center gap-2">
        <span className="font-serif text-xl font-semibold text-orange-300">
          Quizzy
        </span>
      </Link>

      {/* Avatar */}
      <DropdownMenu>
        <DropdownMenuTrigger className="hover:border-ring ring-primary/50 rounded-2xl hover:cursor-pointer hover:ring-1">
          <div>
            <Avatar>
              <AvatarImage src={avatar_url} alt="" />
              <AvatarFallback>
                {display_name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="space-y-1">
            <p>{display_name}</p>
            <p className="text-xs font-normal">{email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/home/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>History</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <button
              onClick={handleLogout}
              type="submit"
              className="text-destructive dark:text-destructive flex w-full items-center gap-2"
            >
              <LogOutIcon className="h-6 w-6 text-current dark:text-current" />
              <span className="leading-0">Logout </span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
