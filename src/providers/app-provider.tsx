'use client';

import { useInitialProfile } from '@/stores/profile/use-initial-profile';
import { ProfileStoreProvider } from './profile-store-provider';

interface InitialProviderProps {
  children: React.ReactNode;
}

export const InitialProvider = ({ children }: InitialProviderProps) => {
  useInitialProfile();

  return <>{children}</>;
};

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ProfileStoreProvider>
      <InitialProvider>{children}</InitialProvider>
    </ProfileStoreProvider>
  );
};
