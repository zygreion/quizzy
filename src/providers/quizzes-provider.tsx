'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import { type QuizzesStore, createQuizzesStore } from '@/stores/quizzes-store';

export type QuizzesStoreApi = ReturnType<typeof createQuizzesStore>;

export const QuizzesStoreContext = createContext<QuizzesStoreApi | undefined>(
  undefined
);

export interface QuizzesStoreProviderProps {
  children: ReactNode;
}

export const QuizzesStoreProvider = ({
  children,
}: QuizzesStoreProviderProps) => {
  const storeRef = useRef<QuizzesStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createQuizzesStore();
  }

  return (
    // eslint-disable-next-line react-hooks/refs
    <QuizzesStoreContext.Provider value={storeRef.current}>
      {children}
    </QuizzesStoreContext.Provider>
  );
};

export const useQuizzesStore = <T,>(
  selector: (store: QuizzesStore) => T
): T => {
  const quizzesStoreContext = useContext(QuizzesStoreContext);

  if (!quizzesStoreContext) {
    throw new Error(`useQuizzesStore must be used within QuizzesStoreProvider`);
  }

  return useStore(quizzesStoreContext, selector);
};
