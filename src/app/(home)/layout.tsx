import { getProfile } from '@/actions/profile';
import Footer from '@/components/layouting/footer';
import { Header } from '@/components/layouting/header';
import { redirect } from 'next/navigation';

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default async function HomeLayout({
  children,
}: Readonly<HomeLayoutProps>) {
  const profile = await getProfile();

  if (!profile) {
    redirect('/auth/login');
  }

  const displayName = profile.display_name;

  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col items-center">
      <Header displayName={displayName} />
      <main className="mb-16 flex w-full grow flex-col px-6 py-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}
