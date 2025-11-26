'use client';

import { CopyableInput } from '@/components/copyable-input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAccountStore } from '@/hooks/use-account-store';

export default function ProfilePage() {
  const { id, email, avatar_url, first_name, last_name, display_name } =
    useAccountStore((state) => state);

  return (
    <div>
      <div className="space-y-6">
        <Avatar className="size-40">
          <AvatarImage src={avatar_url} alt="PP" />
          <AvatarFallback className="text-3xl">
            {display_name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-2">
          <Label htmlFor="id">ID</Label>
          <Input id="id" type="text" defaultValue={id} disabled />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="text" defaultValue={email} disabled />
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-4">
          <div className="space-y-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input id="first_name" type="text" defaultValue={first_name} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input id="last_name" type="text" defaultValue={last_name} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="display_name">Display Name</Label>
          <Input id="display_name" type="text" defaultValue={display_name} />
        </div>
      </div>

      <CopyableInput type="number" value="20" />
    </div>
  );
}
