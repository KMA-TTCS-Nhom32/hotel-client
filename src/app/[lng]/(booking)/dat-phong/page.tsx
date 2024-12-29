import React from 'react';

import BookingForm from '@/components/BookingPage/BookingForm';

interface BookingPageProps {
  params: { lng: string };
}

const BookingPage = ({ params: { lng } }: BookingPageProps) => {
  return <BookingForm lng={lng} />;
};

export default BookingPage;
