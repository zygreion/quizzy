import Footer from '@/components/layouting/footer';

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: Readonly<HomeLayoutProps>) {
  return (
    <div className="flex min-h-dvh flex-col items-center">
      <main className="mb-16 flex w-full max-w-xl grow flex-col px-6 py-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}
