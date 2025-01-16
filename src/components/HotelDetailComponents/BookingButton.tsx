'use client';

import { useRouter } from 'next/navigation';
import { BookingInfor, useBookingStore } from '@/stores/booking/bookingStore';
import { APP_ROUTES } from '@/constants/routes.constant';

import styles from './index.module.scss';
import { AppTranslationFunction } from '@/lib/types/i18n';

interface BookingButtonProps {
  t: AppTranslationFunction;
  bookingInfor: BookingInfor;
  isRoomDetailCard?: boolean;
}

export const BookingButton = ({
  t,
  bookingInfor,
  isRoomDetailCard = false,
}: Readonly<BookingButtonProps>) => {
  const { push } = useRouter();
  const { setBookingInfor } = useBookingStore((state) => state);

  const onClickBooking = () => {
    setBookingInfor(bookingInfor);

    push(APP_ROUTES.Booking);
  };

  if (isRoomDetailCard) {
    return (
      <button className={styles.bookButton} onClick={onClickBooking}>
        {t('room.book')}
      </button>
    );
  }

  return (
    <div className={styles.button}>
      <div className={styles.dialogRoomButton}>
        <button onClick={onClickBooking}>
          {t('room.book')}
        </button>
      </div>
    </div>
  );
};
