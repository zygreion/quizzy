import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';
import { Account, User } from '@/types';
import { createStoreProvider } from '@/providers/create-store-provider';

type AccountState = Account;

type AccountActions = {
  setUser: (newUser: User) => void;
  setPreference: (newPreference: Account['preference']) => void;
  clearAccount: () => void;
};

type AccountStore = AccountState & AccountActions;

const defaultInitState: AccountState = {
  id: '',
  email: '',
  first_name: '',
  last_name: '',
  display_name: '',
  avatar_url: '/assets/avatar-1.png',

  preference: { amount: 0, category_id: 12, difficulty: 'easy', type: 'any' },
};

const createAccountStore = (initState: AccountState = defaultInitState) => {
  return createStore<AccountStore>()(
    persist(
      // eslint-disable-next-line unused-imports/no-unused-vars
      (set, get) => ({
        ...initState,

        setUser: (newUser) => set({ ...newUser }),
        setPreference: (newPreference) => set({ preference: newPreference }),
        clearAccount: () => set({ ...defaultInitState }),
      }),
      { name: 'account' }
    )
  );
};

// prettier-ignore
export const {  
  Provider: AccountStoreProvider,
  useStore: useAccountStore,
} = createStoreProvider<AccountStore>(createAccountStore, 'AccountStore');
