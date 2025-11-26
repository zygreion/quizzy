import Footer from '@/components/layouting/footer';
import { Navbar } from '@/components/layouting/navbar';

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default async function HomeLayout({
  children,
}: Readonly<HomeLayoutProps>) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col items-center">
      <Navbar />
      <main className="mb-16 flex w-full grow flex-col px-6 py-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}
