'use client';

import { usePathname, useRouter } from 'next/navigation';

import { APP_ROUTES } from '@/constants/routes.constant';
import { useTranslation } from '@/i18n/client';
import { cn } from '@/lib/utils';

import Container from '@/components/Common/Container';
import { Button } from '@/components/ui/button';

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

interface BookingStepsProps {
  lng: string;
}

const BookingSteps = ({ lng }: BookingStepsProps) => {
  const { t } = useTranslation(lng, 'booking');
  const pathname = usePathname();
  const { push } = useRouter();

  const isCurrentPath = (path: string) => pathname.includes(path);

  const isNavigationDisabled = (path: string) => {
    if (isCurrentPath(path)) return true;

    const currentIndex = steps.findIndex((step) => isCurrentPath(step.path));

    if (currentIndex === -1) return false;

    const targetIndex = steps.findIndex((step) => step.path === path);

    return currentIndex < targetIndex;
  };

  const onNavigate = (path: string) => {
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

export default BookingSteps;
