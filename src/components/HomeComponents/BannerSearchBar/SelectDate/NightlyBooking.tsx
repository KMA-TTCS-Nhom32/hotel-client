'use client';

import { useEffect, useMemo, useState } from 'react';

import { useUpdateEffect } from 'ahooks';
import type { AppTranslationFunction } from '@/lib/types/i18n';

import {
  DEFAULT_FURTHEST_BOOKING_DATE,
  DEFAULT_NIGHTLY_CHECKIN_HOURS,
  DEFAULT_NIGHTLY_HOURS,
} from '@/constants/select-date.constant';
import {
  addDays,
  countWorkingUnit,
  formatDateDayjs,
  getTodayViLocale,
  parseTime,
} from '@/lib/funcs/date';
import { TimeOption, WorkingHour } from '@/lib/types/select-date';

import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface NightlyBookingProps {
  t: AppTranslationFunction;
  maxAdvanceBooking?: number;
  nightCheckInWorkingHours?: WorkingHour;
  nightTimeCheckOut?: string;
  selectedDate: Date;
  changeDateBookingNightly: (checkIn: Date, checkOut: Date) => void;
}

export const NightlyBooking = ({
  t,
  maxAdvanceBooking = DEFAULT_FURTHEST_BOOKING_DATE,
  nightCheckInWorkingHours = DEFAULT_NIGHTLY_CHECKIN_HOURS,
  nightTimeCheckOut = DEFAULT_NIGHTLY_HOURS.end,
  selectedDate,
  changeDateBookingNightly,
}: NightlyBookingProps) => {
  const [startHour, startMinute] = useMemo(
    () => parseTime(nightCheckInWorkingHours.start),
    [nightCheckInWorkingHours.start],
  );
  const [endHour, endMinute] = useMemo(
    () => parseTime(nightCheckInWorkingHours.end),
    [nightCheckInWorkingHours.end],
  );
  const [checkOutHour, checkOutMinute] = useMemo(
    () => parseTime(nightTimeCheckOut),
    [nightTimeCheckOut],
  );

  const [selectedDateInMonth, setSelectedDateInMonth] = useState<Date>(selectedDate);
  const [selectedNightCheckIn, setSelectedNightCheckIn] = useState<string | undefined>(undefined);

  const currentDate = useMemo(() => getTodayViLocale(), []);

  useEffect(() => {
    const [currentHour, currentMinute] = [currentDate.getHours(), currentDate.getMinutes()];

    if (currentHour >= endHour || (currentHour === endHour && currentMinute >= endMinute)) {
      setSelectedDateInMonth(addDays(currentDate, 1));
    }
  }, []);

  const isDisabledDate = (date: Date) => {
    return date < currentDate || date > addDays(currentDate, maxAdvanceBooking);
  };

  const isCurrentDate = useMemo(
    () => formatDateDayjs(selectedDateInMonth) === formatDateDayjs(currentDate),
    [selectedDateInMonth],
  );

  const checkInTimeOptions = useMemo<TimeOption[]>(() => {
    const minute = startMinute === 0 ? '30' : '00';
    const options = Array.from(
      { length: countWorkingUnit(nightCheckInWorkingHours) },
      (_, index) => {
        const hour = startHour + Math.floor(index / 2);
        const time = `${String(hour).padStart(2, '0')}:${
          index % 2 === 0 ? `${startMinute}0` : minute
        }`;

        let isDisabled = false;

        if (
          isCurrentDate &&
          (hour < currentDate.getHours() ||
            (hour === currentDate.getHours() && Number(minute) < currentDate.getMinutes()))
        ) {
          isDisabled = true;
        }

        return {
          time,
          isDisabled,
        };
      },
    );

    return options;
  }, [isCurrentDate]);

  useEffect(() => {
    const firstValidTime = checkInTimeOptions.find((opt) => !opt.isDisabled);
    if (firstValidTime) {
      setSelectedNightCheckIn(firstValidTime.time);
    }
  }, [selectedDateInMonth]);

  useUpdateEffect(() => {
    if (!selectedNightCheckIn) return;

    const [hour, minute] = parseTime(selectedNightCheckIn);
    const checkIn = new Date(selectedDateInMonth);
    checkIn.setHours(hour, minute);

    const checkOut = addDays(checkIn, 1);
    checkOut.setHours(checkOutHour, checkOutMinute);

    changeDateBookingNightly(checkIn, checkOut);
  }, [selectedDateInMonth, selectedNightCheckIn]);

  return (
    <div className='flex flex-col gap-4'>
      <Calendar
        mode='range'
        fromDate={currentDate}
        selected={{ from: selectedDateInMonth, to: addDays(selectedDateInMonth, 1) }}
        onSelect={(_, date) => setSelectedDateInMonth(date)}
        numberOfMonths={2}
        disabled={isDisabledDate}
        className='rounded-md border [&>div]:gap-3 sm:[&>div]:gap-4'
      />
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-3'>
        <Label htmlFor='check-in-time'>{t('select_date.check_in_time')}</Label>
        <Select onValueChange={setSelectedNightCheckIn} value={selectedNightCheckIn}>
          <SelectTrigger id='check-in-time'>
            <SelectValue placeholder={t('select_date.check_in_placeholder')} />
          </SelectTrigger>
          <SelectContent>
            {checkInTimeOptions.map(({ time, isDisabled }) => (
              <SelectItem key={time} value={time} disabled={isDisabled}>
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
