'use client';

import { logout } from '@/actions/auth';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { LogoutIcon } from '../icons';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getUserClient } from '@/actions/profile-client';
import { User } from '@/types/index';

export function Header() {
  const pathname = usePathname();
  const [headerInfo, setHeaderInfo] = useState<
    Pick<User, 'display_name' | 'avatar_url'>
  >({
    display_name: '',
    avatar_url: '',
  });

  useEffect(() => {
    const getUserClientFn = async () => {
      const user = await getUserClient();

      if (!user) return;

      setHeaderInfo({
        display_name: user.display_name,
        avatar_url: user.avatar_url,
      });
    };

    getUserClientFn();
  }, []);

  if (pathname === '/quiz') {
    return;
  }

  return (
    <div className="flex w-full items-center justify-between gap-4 py-4">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage
            src={
              headerInfo.avatar_url ??
              `https://placehold.co/50x50?text=${headerInfo.display_name.charAt(0).toUpperCase()}`
            }
            alt=""
          />
          <AvatarFallback>
            {/* {headerInfo.display_name.charAt(0).toUpperCase()} */}
          </AvatarFallback>
        </Avatar>
        <span>{headerInfo.display_name}</span>
      </div>
      <form action={logout}>
        <Button
          variant="destructive"
          size="sm"
          // onClick={handleLogout}
          className="flex items-center gap-2 hover:cursor-pointer"
          type="submit"
        >
          <span className="leading-0">Logout </span>
          <LogoutIcon />
        </Button>
      </form>
    </div>
  );
}
