'use client';

import { AccountStoreProvider } from '@/hooks/use-account-store';
import { ProgressStoreProvider } from '@/hooks/use-progress-store';
import { QuizzesStoreProvider } from '@/hooks/use-quizzes-store';
import { ReactNode } from 'react';

interface ZustandProvidersProps {
  children: ReactNode;
}

export const ZustandProviders = ({ children }: ZustandProvidersProps) => {
  return [
    QuizzesStoreProvider,
    ProgressStoreProvider,
    AccountStoreProvider,
  ].reduceRight((acc, Provider) => <Provider>{acc}</Provider>, children);
};
