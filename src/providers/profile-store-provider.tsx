'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import { type ProfileStore, createProfileStore } from '@/stores/profile/profile-store';

export type ProfileStoreApi = ReturnType<typeof createProfileStore>;

export const ProfileStoreContext = createContext<ProfileStoreApi | undefined>(undefined);

export interface ProfileStoreProviderProps {
  children: ReactNode;
}

export const ProfileStoreProvider = ({ children }: ProfileStoreProviderProps) => {
  const storeRef = useRef<ProfileStoreApi>();

  if (!storeRef.current) {
    storeRef.current = createProfileStore();
  }

  return (
    <ProfileStoreContext.Provider value={storeRef.current}>{children}</ProfileStoreContext.Provider>
  );
};

export const useProfileStore = <T,>(selector: (store: ProfileStore) => T): T => {
  const context = useContext(ProfileStoreContext);

  if (!context) {
    throw new Error(`useProfileStore must be used within ProfileStoreProvider`);
  }

  return useStore(context, selector);
};
