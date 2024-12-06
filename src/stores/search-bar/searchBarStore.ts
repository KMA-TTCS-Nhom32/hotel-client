import { create } from "zustand";

type BookingType = 'HOURLY' | 'NIGHTLY' | 'DAILY';

type BookingTime = {
    type: BookingType;
    checkIn: Date;
    checkOut: Date;
}

type CustomerAmount = {
    adult: number;
    child: number;
    infant: number;
}

type SearchBarState = {
    province: string | null;
    bookingTime: BookingTime;
    customerAmount: CustomerAmount;
}

type SearchBarActions = {
    setProvince: (province: string) => void;
    setBookingTime: (bookingTime: BookingTime) => void;
    setCustomerAmount: (customerAmount: CustomerAmount) => void;
}

export type SearchBarStore = SearchBarState & SearchBarActions;

const initialState: SearchBarState = {
    province: null,
    bookingTime: {
        type: 'HOURLY',
        checkIn: new Date(),
        checkOut: new Date(),
    },
    customerAmount: {
        adult: 2,
        child: 0,
        infant: 0,
    },
}

export const useSearchBarStore = create<SearchBarStore>((set) => ({
    ...initialState,
    setProvince: (province) => set(() => ({ province })),
    setBookingTime: (bookingTime) => set(() => ({ bookingTime })),
    setCustomerAmount: (customerAmount) => set(() => ({ customerAmount })),
}));