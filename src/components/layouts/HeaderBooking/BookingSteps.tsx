'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { APP_ROUTES } from '@/constants/routes.constant';
import { useTranslation } from '@/i18n/client';
import { cn } from '@/lib/utils';

import Container from '@/components/Common/Container';
import { Button } from '@/components/ui/button';
import { useBookingStore } from '@/stores/booking/bookingStore';
import { toast } from 'sonner';
import LoadingSection from '@/components/Common/LoadingSection';

type Step = {
  number: number;
  title: string;
  path: string;
};

const steps: Step[] = [
  {
    number: 1,
    title: 'customer_information',
    path: APP_ROUTES.Booking,
  },
  {
    number: 2,
    title: 'payment_information',
    path: APP_ROUTES.Payment,
  },
  {
    number: 3,
    title: 'confirm_booking',
    path: APP_ROUTES.ConfirmBooking,
  },
];

const handlePaymentRoutes = [
  APP_ROUTES.ConfirmBooking,
  APP_ROUTES.CancelBooking,
  APP_ROUTES.SuccessPayment,
];

interface BookingStepsProps {
  lng: string;
}

const BookingStepsClient = ({ lng }: BookingStepsProps) => {
  const { t } = useTranslation(lng, 'booking');
  const pathname = usePathname();
  const params = useSearchParams();
  const { bookingInfor, userInfor } = useBookingStore((state) => state);
  const { push } = useRouter();

  const isHandlePaymentRoute = handlePaymentRoutes.some((route) => pathname.includes(route));

  useEffect(() => {
    if (pathname.includes(APP_ROUTES.Booking)) {
      if (!bookingInfor) push(APP_ROUTES.Home);
    }

    if (pathname.includes(APP_ROUTES.Payment)) {
      if (!userInfor) push(APP_ROUTES.Home);
    }
  }, [bookingInfor, userInfor, pathname]);

  useEffect(() => {
    if (isHandlePaymentRoute && params.toString() === '') {
      if (pathname.includes(APP_ROUTES.ConfirmBooking) && !params.get('qrCode')) {
        toast.error('Có lỗi xảy ra khi tải QR code');
      }

      if (
        (pathname.includes(APP_ROUTES.CancelBooking) ||
          pathname.includes(APP_ROUTES.SuccessPayment)) &&
        !params.get('orderCode')
      ) {
        toast.error('Có lỗi xảy ra khi tải thông tin đặt phòng');
      }
    }
  }, [pathname]);

  const isCurrentPath = (path: string) => pathname.includes(path) || isHandlePaymentRoute;

  const isNavigationDisabled = (path: string) => {
    if (isCurrentPath(path)) return true;

    const currentIndex = steps.findIndex((step) => isCurrentPath(step.path));

    if (currentIndex === -1) return false;

    const targetIndex = steps.findIndex((step) => step.path === path);

    return currentIndex < targetIndex;
  };

  const onNavigate = (path: string) => {
    if (isHandlePaymentRoute) return;

    if (isNavigationDisabled(path)) return;

    push(path);
  };

  return (
    <div className='sticky w-full bg-white top-0 mt-0 z-20 border-b border-solid border-b-gray-200 shadow-md'>
      <Container className='flex items-center py-6'>
        {steps.map((step, index) => (
          <div key={step.number} className='flex items-center'>
            <div className='flex items-center gap-2'>
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                  isCurrentPath(step.path) ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600',
                )}
              >
                {step.number}
              </div>
              <Button
                variant='link'
                onClick={() => onNavigate(step.path)}
                className={cn(
                  'p-0 title1-semi-bold !no-underline mr-1',
                  isNavigationDisabled(step.path) && 'cursor-text',
                )}
              >
                {t(step.title as any)}
              </Button>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'h-[2px] w-[120px]',
                  isCurrentPath(step.path) ? 'bg-primary' : 'bg-gray-200',
                )}
              />
            )}
          </div>
        ))}
      </Container>
    </div>
  );
};

const BookingSteps = ({ lng }: BookingStepsProps) => {
  return (
    <Suspense fallback={<LoadingSection />}>
      <BookingStepsClient lng={lng} />
    </Suspense>
  );
};

export default BookingSteps;
