'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import {
  type ProgressStore,
  createProgressStore,
} from '@/stores/progress-store';

export type ProgressStoreApi = ReturnType<typeof createProgressStore>;

export const ProgressStoreContext = createContext<ProgressStoreApi | undefined>(
  undefined
);

export interface ProgressStoreProviderProps {
  children: ReactNode;
}

export const ProgressStoreProvider = ({
  children,
}: ProgressStoreProviderProps) => {
  const storeRef = useRef<ProgressStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createProgressStore();
  }

  return (
    // eslint-disable-next-line react-hooks/refs
    <ProgressStoreContext.Provider value={storeRef.current}>
      {children}
    </ProgressStoreContext.Provider>
  );
};

export const useProgressStore = <T,>(
  selector: (store: ProgressStore) => T
): T => {
  const progressStoreContext = useContext(ProgressStoreContext);

  if (!progressStoreContext) {
    throw new Error(
      `useProgressStore must be used within ProgressStoreProvider`
    );
  }

  return useStore(progressStoreContext, selector);
};
