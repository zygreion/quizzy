import { getUser } from '@/actions/profile';

export default async function ProfilePage() {
  const profile = await getUser();

  if (!profile) {
    return <div>Profile not found</div>;
  }

  return (
    <div>
      <p>{profile.id}</p>
      <p>{profile.email}</p>
      <p>{profile.first_name}</p>
      <p>{profile.last_name}</p>
      <p>{profile.display_name}</p>
    </div>
  );
}
