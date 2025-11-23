'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import {
  type PreferenceStore,
  createPreferenceStore,
} from '@/stores/preference-store';

export type PreferenceStoreApi = ReturnType<typeof createPreferenceStore>;

export const PreferenceStoreContext = createContext<
  PreferenceStoreApi | undefined
>(undefined);

export interface PreferenceStoreProviderProps {
  children: ReactNode;
}

export const PreferenceStoreProvider = ({
  children,
}: PreferenceStoreProviderProps) => {
  const storeRef = useRef<PreferenceStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createPreferenceStore();
  }

  return (
    // eslint-disable-next-line react-hooks/refs
    <PreferenceStoreContext.Provider value={storeRef.current}>
      {children}
    </PreferenceStoreContext.Provider>
  );
};

export const usePreferenceStore = <T,>(
  selector: (store: PreferenceStore) => T
): T => {
  const preferenceStoreContext = useContext(PreferenceStoreContext);

  if (!preferenceStoreContext) {
    throw new Error(
      `usePreferenceStore must be used within PreferenceStoreProvider`
    );
  }

  return useStore(preferenceStoreContext, selector);
};
