'use client';

import { useInitialProfile } from '@/stores/profile/use-initial-profile';
import { ProfileStoreProvider } from './profile-store-provider';
import { useBookingStore } from '@/stores/booking/bookingStore';
import { useEffect } from 'react';
import { APP_ROUTES } from '@/constants/routes.constant';
import { usePathname } from 'next/navigation';

export const InitialClientRender = () => {
  useInitialProfile();
  const pathname = usePathname();
  const { resetBookingInfor, bookingInfor } = useBookingStore((state) => state);

  useEffect(() => {
    if (pathname.includes(APP_ROUTES.Booking) || pathname.includes(APP_ROUTES.Payment)) {
      return;
    }
    resetBookingInfor();
  }, [pathname]);

  return null;
};

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ProfileStoreProvider>
      <InitialClientRender />
      {children}
    </ProfileStoreProvider>
  );
};
