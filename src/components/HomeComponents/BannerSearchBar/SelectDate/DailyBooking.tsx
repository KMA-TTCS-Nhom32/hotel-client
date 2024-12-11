'use client';

import { useEffect, useMemo, useState } from 'react';

import { useUpdateEffect } from 'ahooks';
import { DateRange } from 'react-day-picker';

import type { AppTranslationFunction } from '@/lib/types/i18n';

import { getTodayViLocale, isInPeriod, isBefore, isAfter, addYears } from '@/lib/funcs/date';
import { DEFAULT_MAX_STAY_DURATION, DEFAULT_UNWORK_DAYS } from '@/constants/select-date.constant';

import { Calendar } from '@/components/ui/calendar';

interface DailyBookingProps {
  t: AppTranslationFunction;
  maxStayDuration?: number;
  bookingData: DateRange;
  changeDateBookingDaily: (checkIn: Date, checkOut: Date) => void;
}

export const DailyBooking = ({
  t,
  maxStayDuration = DEFAULT_MAX_STAY_DURATION,
  bookingData,
  changeDateBookingDaily,
}: DailyBookingProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(bookingData);
  const currentDate = useMemo(() => getTodayViLocale(), []);
  const maxDate = useMemo(() => addYears(currentDate, 1), [currentDate]);

  useEffect(() => {
    if (
      (dateRange?.from && isInPeriod(dateRange.from, DEFAULT_UNWORK_DAYS)) ||
      (dateRange?.to && isInPeriod(dateRange.to, DEFAULT_UNWORK_DAYS))
    ) {
      setDateRange(undefined);
    }
  }, []);

  const isDisabledDate = (date: Date) => {
    return (
      isBefore(date, currentDate, 'day') ||
      isAfter(date, maxDate, 'day') ||
      isInPeriod(date, DEFAULT_UNWORK_DAYS)
    );
  };

  useUpdateEffect(() => {
    if (dateRange && dateRange.from && dateRange.to) {
      changeDateBookingDaily(dateRange.from, dateRange.to);
    }
  }, [dateRange]);

  return (
    <div className='space-y-4'>
      <Calendar
        mode='range'
        selected={dateRange}
        onSelect={setDateRange}
        min={2}
        max={maxStayDuration}
        numberOfMonths={2}
        disabled={isDisabledDate}
        className='rounded-md border'
        classNames={{
          head_row: 'grid grid-cols-7 mb-2',
          head_cell: 'w-full font-normal text-md',
          row: 'grid grid-cols-7',
          day_selected:
            'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-md',
        }}
      />
    </div>
  );
};
