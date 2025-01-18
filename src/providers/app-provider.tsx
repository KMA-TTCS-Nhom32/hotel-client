'use client';

import { useInitialProfile } from '@/stores/profile/use-initial-profile';
import { ProfileStoreProvider } from './profile-store-provider';
import { useBookingStore } from '@/stores/booking/bookingStore';
import { useEffect } from 'react';
import { APP_ROUTES } from '@/constants/routes.constant';
import { usePathname } from 'next/navigation';
import { useTranslationStore } from '@/stores/translation/useTranslationStore';
import { useRequest } from 'ahooks';
import { getTranslationList } from '@/services/poeditor';

interface InitialClientRenderProps {
  lng: string;
}

export const InitialClientRender = ({ lng }: InitialClientRenderProps) => {
  useInitialProfile();
  const pathname = usePathname();
  const { resetBookingInfor } = useBookingStore((state) => state);
  const { setTerms } = useTranslationStore((state) => state);
  const handleBookingRoutes = [
    APP_ROUTES.Booking,
    APP_ROUTES.Payment,
    APP_ROUTES.ConfirmBooking,
    APP_ROUTES.CancelBooking,
    APP_ROUTES.SuccessPayment,
  ];
//   console.log(pathname, lng);
  useRequest(
    () =>
      getTranslationList({
        language: String(lng === 'en' ? 'en-us' : lng),
      }),
    {
      onSuccess: ({ data }) => {
        setTerms(data.result.terms);
      },
    },
  );

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
  lng?: string;
}

export const AppProvider = ({ children, lng = 'vi' }: AppProviderProps) => {
  return (
    <ProfileStoreProvider>
      <InitialClientRender lng={lng} />
      {children}
    </ProfileStoreProvider>
  );
};
