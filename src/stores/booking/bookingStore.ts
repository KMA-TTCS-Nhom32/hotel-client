import { create } from 'zustand';

export type UserInfor = {
  name: string;
  email: string;
  phone: string;
  special_requests?: string;
};

export type BookingInfor = {
  detailId: string;
  detailName: string;
  branchSlug: string;
  branchName: string;
  branchAddress: string;
  totalAmount: number;
  thumbnail: string;
};

type BookingStore = {
  userInfor: UserInfor | null;
  bookingInfor: BookingInfor | null;
  setUserInfor: (userInfor: UserInfor) => void;
  setBookingInfor: (bookingInfo: BookingInfor) => void;
  resetBookingInfor: () => void;
};

export const useBookingStore = create<BookingStore>((set) => ({
  userInfor: null,
  bookingInfor: null,
  setUserInfor: (userInfor) => set(() => ({ userInfor })),
  setBookingInfor: (bookingInfor) => set(() => ({ bookingInfor })),
  resetBookingInfor: () => set(() => ({ userInfor: null, bookingInfor: null })),
}));
