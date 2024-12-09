import { addDays, getTodayViLocale } from '@/lib/funcs/date';
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

const currentDate = getTodayViLocale();

const initialState: SearchBarState = {
  province: null,
  bookingTime: {
    type: 'HOURLY',
    checkIn: currentDate,
    checkOut: addDays(currentDate, 1),
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
