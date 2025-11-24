'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore as originalUseStore, StoreApi } from 'zustand';

interface StoreProviderProps {
  children: ReactNode;
}

export function createStoreProvider<S, C extends StoreApi<S> = StoreApi<S>>(
  createStore: () => C,
  displayName: string
) {
  const Context = createContext<C | undefined>(undefined);

  const Provider = ({ children }: StoreProviderProps) => {
    const storeRef = useRef<C | null>(null);
    if (storeRef.current === null) {
      storeRef.current = createStore();
    }

    return (
      // eslint-disable-next-line react-hooks/refs
      <Context.Provider value={storeRef.current}>{children}</Context.Provider>
    );
  };

  const useStore = <U,>(selector: (store: S) => U): U => {
    const storeContext = useContext(Context);

    if (!storeContext) {
      throw new Error(`useStore must be used within ${displayName}Provider`);
    }

    return originalUseStore(storeContext, selector);
  };

  return { Provider, useStore };
}
