import Footer from '@/components/layouting/footer';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Readonly<AuthLayoutProps>) {
  return (
    <div className="flex min-h-dvh flex-col items-center">
      <main className="flex w-full max-w-xl grow flex-col items-center justify-center px-6 py-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}
