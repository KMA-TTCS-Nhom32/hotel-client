import React from 'react';
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';
import BookingForm from '@/components/BookingPage/BookingForm';


interface BookingPageProps {
  params: { lng: string; booking: string };
}

const BookingPage = ({ params: { lng, booking } }: BookingPageProps) => {
  console.log(lng, booking);
  return (
    <div>
      <BookingForm />
    </div>
  );
};

export default BookingPage;