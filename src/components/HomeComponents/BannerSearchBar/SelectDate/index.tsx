'use client';

import { useState } from 'react';

import { CalendarDays } from 'lucide-react';

import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/funcs/date';
import { SelectDateType } from '@/lib/types/select-date';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';

import { BookingTime, BookingType, useSearchBarStore } from '@/stores/search-bar/searchBarStore';

import styles from '../index.module.scss';

import { HourlyBooking } from './HourlyBooking';
import { NightlyBooking } from './NightlyBooking';

import type { AppTranslationFunction } from '@/lib/types/i18n';
import { DailyBooking } from './DailyBooking';
import { DateSelectedDisplay } from './DateSelectedDisplay';

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

interface SelectDateSectionProps {
  t: AppTranslationFunction;
  lng: string;
}

export const SelectDatePopover = ({ t, lng }: Readonly<SelectDateSectionProps>) => {
  const { bookingTime, setBookingTime } = useSearchBarStore();
  
  const [selectedDateLabel, setSelectedDateLabel] = useState<SelectDateType | null>(null);

  const handleCloseSelectDate = () => {
    setSelectedDateLabel(null);
  };

  const handleClickOutsideSelectDate = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    // Check if the click is on the trigger element
    const target = e.target as HTMLElement;
    console.log(target);
    const triggerElement = document.getElementById('select-date-trigger');

    // If clicking on trigger or its children, do nothing
    if (
      target.id === 'select-date-trigger' ||
      target.closest('#select-date-trigger') ||
      target.offsetParent?.id === 'select-date-trigger' ||
      target.contains(triggerElement) ||
      triggerElement?.contains(target)
    ) {
      return;
    }

    // Otherwise close the popover
    handleCloseSelectDate();
  };

  return (
    <Popover open={selectedDateLabel !== null}>
      <PopoverTrigger id='select-date-trigger' asChild>
        <div className={styles.select_date_trigger_wrapper}>
          <DateSelectedDisplay
            t={t}
            lng={lng}
            type='checkIn'
            bookingData={bookingTime}
            selectedDateLabel={selectedDateLabel}
            onSelect={setSelectedDateLabel}
          />
          <DateSelectedDisplay
            t={t}
            lng={lng}
            type='checkOut'
            bookingData={bookingTime}
            selectedDateLabel={selectedDateLabel}
            onSelect={setSelectedDateLabel}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className={styles.popover_wrap_3}
        align='start'
        side='bottom'
        onInteractOutside={handleClickOutsideSelectDate}
      >
        <div className={styles.select_date_popover_content}>
          <div className={styles.select_date_popover_header}>
            <DateSelectedDisplay
              t={t}
              lng={lng}
              type='checkIn'
              bookingData={bookingTime}
              selectedDateLabel={selectedDateLabel}
              isPopoverDisplay={true}
            />
            <DateSelectedDisplay
              t={t}
              lng={lng}
              type='checkOut'
              bookingData={bookingTime}
              selectedDateLabel={selectedDateLabel}
              isPopoverDisplay={true}
            />
          </div>

          <SelectDate t={t} booking={bookingTime} setBooking={setBookingTime} />
        </div>
      </PopoverContent>
    </Popover>
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
