'use client';

import { useState } from 'react';

import { Resources, TFunction } from 'i18next';
import { CalendarDays } from 'lucide-react';

import { cn, formatDate } from '@/lib/utils';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';

import { BookingTime, BookingType } from '@/stores/search-bar/searchBarStore';

import styles from '../index.module.scss';
import { HourlyBooking } from './HourlyBooking';

interface SelectDateProps {
  t: TFunction<keyof Resources>;
  booking: BookingTime;
  setBooking: (bookingData: BookingTime) => void;
}

const SelectDate = ({ t, booking, setBooking }: Readonly<SelectDateProps>) => {
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
      <TabsContent value='NIGHTLY'>NIGHTLY</TabsContent>
      <TabsContent value='DAILY'>DAILY</TabsContent>
    </Tabs>
  );
};

type SelectDateType = keyof Omit<BookingTime, 'type'>;

interface SelectDateSectionProps {
  t: TFunction<keyof Resources>;
  lng: string;
  bookingData: BookingTime;
  onChangeBooking: (bookingData: BookingTime) => void;
}

const SelectDateSection = ({
  t,
  lng,
  bookingData,
  onChangeBooking,
}: Readonly<SelectDateSectionProps>) => {
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

  const renderDateSelectedDisplay = (type: SelectDateType, isPopoverDisplay = false) => {
    return (
      <div
        id='select-date-trigger'
        className={cn(
          isPopoverDisplay ? styles.select_date_popover_display : styles.select_date_trigger,
          selectedDateLabel && type === selectedDateLabel && styles.selected,
        )}
        onClick={() => !isPopoverDisplay && setSelectedDateLabel(type)}
      >
        <Text element='h5' type='title2-semi-bold'>
          {t(`bookingform.${type}`)}
        </Text>
        <div className={styles.display_date_trigger}>
          <CalendarDays />
          <Text element='p' type='body1'>
            {formatDate(lng, bookingData[type])}
          </Text>
        </div>
      </div>
    );
  };

  return (
    <Popover open={selectedDateLabel !== null}>
      <PopoverTrigger id='select-date-trigger' className={styles.filter_date_container}>
        <div className={styles.select_date_trigger_wrapper}>
          {renderDateSelectedDisplay('checkIn')}
          {renderDateSelectedDisplay('checkOut')}
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
            {renderDateSelectedDisplay('checkIn', true)}
            {renderDateSelectedDisplay('checkOut', true)}
          </div>

          <SelectDate t={t} booking={bookingData} setBooking={onChangeBooking} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SelectDateSection;
