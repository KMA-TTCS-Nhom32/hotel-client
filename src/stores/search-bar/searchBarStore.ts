import { addDays, getTodayViLocale, parseTime } from '@/lib/funcs/date';
import {
  AVAILABLE_CHECKIN_HOURS,
  DEFAULT_MIN_HOURS_DURATION,
  DEFAULT_WORKING_HOURS,
} from '@/constants/select-date.constant';
import { create } from 'zustand';

export type BookingType = 'HOURLY' | 'NIGHTLY' | 'DAILY';

export type BookingTime = {
  type: BookingType;
  checkIn: Date;
  checkOut: Date;
};

export type CustomerAmount = {
  adult: number;
  child: number;
  infant: number;
};

type SearchBarState = {
  province: string | null;
  bookingTime: BookingTime;
  customerAmount: CustomerAmount;
};

type SearchBarActions = {
  setProvince: (province: string) => void;
  setBookingTime: (bookingTime: BookingTime) => void;
  setCustomerAmount: (customerAmount: CustomerAmount) => void;
};

export type SearchBarStore = SearchBarState & SearchBarActions;

const findInitialValidTime = () => {
  const now = getTodayViLocale();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // Find next available 30-min slot
  const nextTimeSlot = AVAILABLE_CHECKIN_HOURS.find((time) => {
    const [hour, minute] = parseTime(time);
    return hour > currentHour || (hour === currentHour && minute > currentMinute);
  });

  const [startHour, startMinute] = parseTime(DEFAULT_WORKING_HOURS.start);
  const [endHour, endMinute] = parseTime(DEFAULT_WORKING_HOURS.end);

  const isTimeOutsideWorkingHours = (hour: number, minute: number) =>
    hour > endHour || (hour === endHour && minute > endMinute);

  // If found and within working hours, use it
  if (nextTimeSlot) {
    const [hour, minute] = parseTime(nextTimeSlot);
    if (!isTimeOutsideWorkingHours(hour, minute)) {
      now.setHours(hour, minute);
      const checkOut = new Date(now);
      checkOut.setHours(hour + DEFAULT_MIN_HOURS_DURATION, minute);
      return { checkIn: now, checkOut };
    }
  }

  // If no valid time found or outside working hours, use next day's start
  const tomorrow = addDays(now, 1);
  tomorrow.setHours(startHour, startMinute);
  const checkOut = new Date(tomorrow);
  checkOut.setHours(startHour + DEFAULT_MIN_HOURS_DURATION, startMinute);
  return { checkIn: tomorrow, checkOut };
};

const { checkIn, checkOut } = findInitialValidTime();

const initialState: SearchBarState = {
  province: null,
  bookingTime: {
    type: 'HOURLY',
    checkIn,
    checkOut,
  },
  customerAmount: {
    adult: 2,
    child: 0,
    infant: 0,
  },
};

export const useSearchBarStore = create<SearchBarStore>((set) => ({
  ...initialState,
  setProvince: (province) => set(() => ({ province })),
  setBookingTime: (bookingTime) => set(() => ({ bookingTime })),
  setCustomerAmount: (customerAmount) => set(() => ({ customerAmount })),
}));
