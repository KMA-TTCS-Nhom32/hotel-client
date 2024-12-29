import { create } from 'zustand';

type BookingInfor = {
  email: string;
  phone: string;
  special_requests?: string;
};

type BookingStore = {
  bookingInfo: BookingInfor;
  setBookingInfo: (bookingInfo: BookingInfor) => void;
  resetBookingInfo: () => void;
};

const initialBookingInfo: BookingInfor = {
  email: '',
  phone: '',
};

export const useBookingStore = create<BookingStore>((set) => ({
  bookingInfo: initialBookingInfo,
  setBookingInfo: (bookingInfo) => set(() => ({ bookingInfo })),
  resetBookingInfo: () => set(() => ({ bookingInfo: initialBookingInfo })),
}));
