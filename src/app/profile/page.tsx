import { getUserServer } from '@/actions/profile-server';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

export default async function ProfilePage() {
  const profile = await getUserServer();

  if (!profile) {
    return <div>Profile not found</div>;
  }

  return (
    <div>
      <div className="space-y-4">
        <Avatar className="size-40">
          <AvatarImage src={profile.avatar_url} alt="PP" />
          <AvatarFallback>PP</AvatarFallback>
        </Avatar>

        <Input type="text" defaultValue={profile.id} disabled />
        <Input type="text" defaultValue={profile.email} disabled />

        <div className="grid sm:grid-cols-2 sm:gap-4">
          <Input type="text" defaultValue={profile.first_name} />
          <Input type="text" defaultValue={profile.last_name} />
        </div>
        <Input type="text" defaultValue={profile.display_name} />
      </div>
    </div>
  );
}
