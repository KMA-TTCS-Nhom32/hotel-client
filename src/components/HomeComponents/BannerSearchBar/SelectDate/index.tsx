'use client';

import { useState } from 'react';

import { formatDate } from '@/lib/funcs/date';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';

import { BookingTime, BookingType } from '@/stores/search-bar/searchBarStore';

import { HourlyBooking } from './HourlyBooking';
import { NightlyBooking } from './NightlyBooking';

import type { AppTranslationFunction } from '@/lib/types/i18n';
import { DailyBooking } from './DailyBooking';

interface SelectDateProps {
  t: AppTranslationFunction;
  booking: BookingTime;
  setBooking: (bookingData: BookingTime) => void;
}

export const SelectDate = ({ t, booking, setBooking }: Readonly<SelectDateProps>) => {
  const [bookingType, setBookingType] = useState<BookingType>('HOURLY');

  const handleSelectDate = (checkIn: Date, checkOut: Date) => {
    setBooking({
      type: bookingType,
      checkIn,
      checkOut,
    });
  };

  return (
    <Tabs defaultValue='HOURLY' onValueChange={(value) => setBookingType(value as BookingType)}>
      <TabsList className='grid w-full grid-cols-3'>
        <TabsTrigger value='HOURLY'>{t(`select_date.hourly`)}</TabsTrigger>
        <TabsTrigger value='NIGHTLY'>{t(`select_date.nightly`)}</TabsTrigger>
        <TabsTrigger value='DAILY'>{t(`select_date.daily`)}</TabsTrigger>
      </TabsList>
      <TabsContent value='HOURLY'>
        <HourlyBooking
          t={t}
          selectedDate={booking.checkIn}
          changeDateBookingHourly={handleSelectDate}
        />
      </TabsContent>
      <TabsContent value='NIGHTLY'>
        <NightlyBooking
          t={t}
          selectedDate={booking.checkIn}
          changeDateBookingNightly={handleSelectDate}
        />
      </TabsContent>
      <TabsContent value='DAILY'>
        <DailyBooking
          t={t}
          bookingData={{
            from: booking.checkIn,
            to:
              booking.checkOut.getDate() === booking.checkIn.getDate()
                ? undefined
                : booking.checkOut,
          }}
          changeDateBookingDaily={handleSelectDate}
        />
      </TabsContent>
    </Tabs>
  );
};

interface SelectedDateDisplayProps {
  lng: string;
  checkIn: Date;
  checkOut: Date;
}

export const SelectedDateDisplay = ({ lng, checkIn, checkOut }: SelectedDateDisplayProps) => {
  return (
    <Text element='p' type='caption2' className='text-zinc-600'>
      {formatDate(lng, checkIn, true, true, true)} - {formatDate(lng, checkOut, true, true, true)}
    </Text>
  );
};
