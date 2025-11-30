import Footer from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default async function HomeLayout({
  children,
}: Readonly<HomeLayoutProps>) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col items-center gap-6 *:px-6">
      <Navbar />
      <main className="flex w-full grow flex-col py-4">{children}</main>
      <Footer />
    </div>
  );
}
