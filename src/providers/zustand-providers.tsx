'use client';

import { ReactNode } from 'react';
import { createStoreProvider } from './create-store-provider';

import { createQuizzesStore, QuizzesStore } from '@/stores/quizzes-store';
import { createProgressStore, ProgressStore } from '@/stores/progress-store';
import {
  createPreferenceStore,
  PreferenceStore,
} from '@/stores/preference-store';

export const {
  //
  Provider: QuizzesStoreProvider,
  useStore: useQuizzesStore,
} = createStoreProvider<QuizzesStore>(createQuizzesStore, 'QuizzesStore');

export const {
  //
  Provider: ProgressStoreProvider,
  useStore: useProgressStore,
} = createStoreProvider<ProgressStore>(createProgressStore, 'ProgressStore');

export const {
  Provider: PreferenceStoreProvider,
  useStore: usePreferenceStore,
} = createStoreProvider<PreferenceStore>(
  createPreferenceStore,
  'PreferenceStore'
);

interface ZustandProvidersProps {
  children: ReactNode;
}

export const ZustandProviders = ({ children }: ZustandProvidersProps) =>
  [
    QuizzesStoreProvider,
    ProgressStoreProvider,
    PreferenceStoreProvider,
  ].reduceRight((acc, Provider) => <Provider>{acc}</Provider>, children);
