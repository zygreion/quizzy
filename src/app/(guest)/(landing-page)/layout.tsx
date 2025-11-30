interface HomeLayoutProps {
  children: React.ReactNode;
}

export default async function HomeLayout({
  children,
}: Readonly<HomeLayoutProps>) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col items-center *:px-6">
      <main className="flex w-full grow flex-col pt-4 pb-20">{children}</main>
    </div>
  );
}
