'use client';
import { useTranslation } from '@/i18n/client';
import Image from 'next/image';

interface NoBookingsProps {
  lng: string;
}

const NoBookings = ({ lng }: NoBookingsProps) => {
  const { t } = useTranslation(lng, 'myreservation');
  return (
    <div className='flex justify-center items-center '>
      <div className='w-full max-w-md text-center'>
        <div className='flex justify-center py-[24px]'>
          <Image alt='empty' src='/images/Myreservation/emtyroom.png' width={150} height={150} />
        </div>
        <div className='ant-empty-description'>
          <div className='flex flex-col items-center gap-[16px]'>
            <p className='title1-semi-bold text-secondary pb-10'>{t('There are no rooms booked recently')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoBookings;
