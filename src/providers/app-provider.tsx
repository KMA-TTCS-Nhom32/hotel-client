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
  const { resetBookingInfor } = useBookingStore((state) => state);
  const handleBookingRoutes = [APP_ROUTES.Booking, APP_ROUTES.Payment, APP_ROUTES.ConfirmBooking, APP_ROUTES.CancelBooking, APP_ROUTES.SuccessPayment];

  useEffect(() => {
    if (handleBookingRoutes.some((route) => pathname.includes(route))) {
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
