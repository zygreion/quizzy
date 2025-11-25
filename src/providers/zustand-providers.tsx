'use client';

import { PreferenceStoreProvider } from '@/hooks/use-preference-store';
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
    PreferenceStoreProvider,
  ].reduceRight((acc, Provider) => <Provider>{acc}</Provider>, children);
};
