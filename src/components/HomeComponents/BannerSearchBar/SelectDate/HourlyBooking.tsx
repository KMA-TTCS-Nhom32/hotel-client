'use client';

import { useEffect, useMemo, useState } from 'react';

import { useUpdateEffect } from 'ahooks';

import type { AppTranslationFunction } from '@/lib/types/i18n';
import { addDays, formatDateDayjs, getTodayViLocale, parseTime } from '@/lib/funcs/date';

import {
  AVAILABLE_CHECKIN_HOURS,
  DEFAULT_FURTHEST_BOOKING_DATE,
  DEFAULT_MAX_HOURS_DURATION,
  DEFAULT_MIN_HOURS_DURATION,
  DEFAULT_WORKING_HOURS,
} from '@/constants/select-date.constant';
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

import { useScreen } from '@/hooks/useScreen';

interface DurationOption {
  duration: number;
  isDisabled: boolean;
}

interface HourlyBookingProps {
  t: AppTranslationFunction;
  workingHours?: WorkingHour;
  minDuration?: number;
  maxDuration?: number;
  maxAdvanceBooking?: number;
  selectedDate: Date;
  changeDateBookingHourly: (checkIn: Date, checkOut: Date) => void;
}

export const HourlyBooking = ({
  t,
  workingHours = DEFAULT_WORKING_HOURS,
  minDuration = DEFAULT_MIN_HOURS_DURATION,
  maxDuration = DEFAULT_MAX_HOURS_DURATION,
  maxAdvanceBooking = DEFAULT_FURTHEST_BOOKING_DATE,
  selectedDate,
  changeDateBookingHourly,
}: HourlyBookingProps) => {
  // Parse working hours once
  const [startHour, startMinute] = useMemo(
    () => parseTime(workingHours.start),
    [workingHours.start],
  );
  const [endHour, endMinute] = useMemo(() => parseTime(workingHours.end), [workingHours.end]);

  const [selectedDateInMonth, setSelectedDateInMonth] = useState<Date>(selectedDate);
  const [selectedCheckInTime, setSelectedCheckInTime] = useState<string | undefined>(undefined);
  const [selectedDuration, setSelectedDuration] = useState<number | undefined>(undefined);

  const currentDate = useMemo(() => getTodayViLocale(), []);

  // Memoized time validation functions
  const timeValidation = useMemo(
    () => ({
      isTimeOutsideWorkingHours: (hour: number, minute: number) =>
        hour > endHour || (hour === endHour && minute > endMinute),

      isMinDurationExceedsWorkingHours: (hour: number, minute: number) =>
        hour + minDuration > endHour || (hour + minDuration === endHour && minute > endMinute),

      isDisabledDate: (date: Date) =>
        date < currentDate || date > addDays(currentDate, maxAdvanceBooking),
    }),
    [currentDate, endHour, endMinute, minDuration, maxAdvanceBooking],
  );

  const isCurrentDate = useMemo(
    () => formatDateDayjs(selectedDateInMonth) === formatDateDayjs(currentDate),
    [selectedDateInMonth],
  );

  // Handle initial date selection
  useEffect(() => {
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    if (
      isCurrentDate &&
      (timeValidation.isTimeOutsideWorkingHours(currentHour, currentMinute) ||
        timeValidation.isMinDurationExceedsWorkingHours(currentHour, currentMinute))
    ) {
      setSelectedDateInMonth(addDays(selectedDate, 1));
    }
  }, []);

  // Memoized check-in options
  const checkInTimeOptions = useMemo<TimeOption[]>(() => {
    const currentHour = currentDate.getHours();

    const options = AVAILABLE_CHECKIN_HOURS.map((time) => {
      const [hour, minute] = parseTime(time);
      const isDisabled =
        hour < startHour ||
        (hour === startHour && minute < startMinute) ||
        hour > endHour ||
        (hour === endHour && minute > endMinute);

      return { time, isDisabled };
    });

    if (isCurrentDate) {
      const currentHourIndex = options.findIndex(
        ({ time }) =>
          parseTime(time)[0] >= currentHour && !timeValidation.isDisabledDate(currentDate),
      );

      if (currentHourIndex > -1) {
        for (let i = 0; i < currentHourIndex; i++) {
          options[i].isDisabled = true;
        }
      }
    }

    return options;
  }, [isCurrentDate]);

  // update default check-in time options when selected date changes
  useEffect(() => {
    const firstValidTime = checkInTimeOptions.find((opt) => !opt.isDisabled);
    if (firstValidTime) {
      setSelectedCheckInTime(firstValidTime.time);
    }
  }, [selectedDateInMonth]);

  const durationOptions = useMemo<DurationOption[]>(
    () =>
      Array.from(
        { length: DEFAULT_MAX_HOURS_DURATION - DEFAULT_MIN_HOURS_DURATION + 1 },
        (_, index) => {
          let duration = index + DEFAULT_MIN_HOURS_DURATION;
          let isDisabled = false;

          if (duration < minDuration || duration > maxDuration) {
            isDisabled = true;
          }

          return {
            duration,
            isDisabled,
          };
        },
      ),
    [minDuration, maxDuration],
  );

  const durationTimeOptions = useMemo<DurationOption[]>(() => {
    if (!selectedCheckInTime) return durationOptions;

    const [hour, minute] = parseTime(selectedCheckInTime);
    let foundDisabled = false;
    const checkDuration = (duration: number) => {
      const disable =
        hour + duration > endHour ||
        (hour + duration === endHour && minute > endMinute) ||
        duration < minDuration ||
        duration > maxDuration;
      console.log(duration, hour, disable);
      if (disable) foundDisabled = true;
      return disable;
    };

    return durationOptions.map((option) => ({
      ...option,
      isDisabled: foundDisabled || checkDuration(option.duration),
    }));
  }, [selectedCheckInTime, durationOptions]);

  // Update duration when check-in time changes
  useUpdateEffect(() => {
    if (!selectedCheckInTime) return;

    const firstValidDuration = durationTimeOptions.find((opt) => !opt.isDisabled);
    if (firstValidDuration) {
      setSelectedDuration(firstValidDuration.duration);
    }
  }, [selectedCheckInTime]);

  useUpdateEffect(() => {
    if (!selectedCheckInTime || !selectedDuration) return;

    const checkInTime = new Date(selectedDateInMonth);
    const [hour, minute] = parseTime(selectedCheckInTime);
    checkInTime.setHours(hour, minute);

    const checkOutTime = new Date(checkInTime);
    checkOutTime.setHours(checkOutTime.getHours() + selectedDuration);

    changeDateBookingHourly(checkInTime, checkOutTime);
  }, [selectedDateInMonth, selectedCheckInTime, selectedDuration]);

  return (
    <div className='space-y-4'>
      <Calendar
        mode='single'
        selected={selectedDateInMonth}
        defaultMonth={selectedDate}
        onSelect={(date) => date && setSelectedDateInMonth(date)}
        disabled={timeValidation.isDisabledDate}
        className='rounded-md border items-center flex flex-col'
      />
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
        <div className='w-full'>
          <Label htmlFor='check-in-time'>{t('select_date.check_in_time')}</Label>
          <Select onValueChange={setSelectedCheckInTime} value={selectedCheckInTime}>
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
        <div className='w-full'>
          <Label htmlFor='duration'>{t('select_date.duration')}</Label>
          <Select
            onValueChange={(value) => setSelectedDuration(Number(value))}
            value={selectedDuration?.toString()}
          >
            <SelectTrigger id='duration'>
              <SelectValue placeholder={t('select_date.duration_placeholder')} />
            </SelectTrigger>
            <SelectContent>
              {durationTimeOptions.map(({ duration, isDisabled }) => (
                <SelectItem key={duration} value={duration.toString()} disabled={isDisabled}>
                  {t('select_date.duration_hours', { count: duration })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
