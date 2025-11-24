import { getUserServer } from '@/actions/profile-server';
import { CopyableInput } from '@/components/copyable-input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const profile = await getUserServer();

  if (!profile) redirect('/auth/login');

  return (
    <div>
      <div className="space-y-6">
        <Avatar className="size-40">
          <AvatarImage src={profile.avatar_url} alt="PP" />
          <AvatarFallback>PP</AvatarFallback>
        </Avatar>

        <div className="space-y-2">
          <Label htmlFor="id">ID</Label>
          <Input id="id" type="text" defaultValue={profile.id} disabled />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="text" defaultValue={profile.email} disabled />
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-4">
          <div className="space-y-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              type="text"
              defaultValue={profile.first_name}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              type="text"
              defaultValue={profile.last_name}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="display_name">Display Name</Label>
          <Input
            id="display_name"
            type="text"
            defaultValue={profile.display_name}
          />
        </div>

        <Button asChild>
          <Link href="/">Home</Link>
        </Button>
      </div>

      <CopyableInput type="number" value="20" />
    </div>
  );
}
