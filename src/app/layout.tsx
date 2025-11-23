import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import React from 'react';

import { QuizzesStoreProvider } from '@/providers/quizzes-provider';
import { ProgressStoreProvider } from '@/providers/progress-provider';
import { PreferenceStoreProvider } from '@/providers/preference-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Quizzy',
  description: 'Train your knowledge about things',
  authors: [{ name: "Mu'izzy", url: 'https://github.com/zygreion' }],
  creator: "Mu'izzy",
  keywords: ['quiz', 'quizzy', 'quiz game', 'quiz app', 'quiz app game'],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QuizzesStoreProvider>
            <ProgressStoreProvider>
              <PreferenceStoreProvider>{children}</PreferenceStoreProvider>
            </ProgressStoreProvider>
          </QuizzesStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
