'use client';

import { useInitialProfile } from '@/stores/profile/use-initial-profile';
import { ProfileStoreProvider } from './profile-store-provider';
import { useBookingStore } from '@/stores/booking/bookingStore';
import { useEffect } from 'react';
import { APP_ROUTES } from '@/constants/routes.constant';
import { usePathname } from 'next/navigation';

interface InitialProviderProps {
  children: React.ReactNode;
}

export const InitialProvider = ({ children }: InitialProviderProps) => {
  useInitialProfile();
  const pathname = usePathname();
  const { resetBookingInfor } = useBookingStore((state) => state);

  useEffect(() => {
    if (!pathname.includes(APP_ROUTES.Booking || APP_ROUTES.Payment)) {
      resetBookingInfor();
    }
  }, [pathname]);

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
