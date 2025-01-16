import { create } from 'zustand';

type UserInfor = {
  email: string;
  phone: string;
  special_requests?: string;
};

type BookingInfor = {
  detailId: string | null;
};

type BookingStore = {
  userInfor: UserInfor;
  bookingInfor: BookingInfor;
  setUserInfor: (userInfor: UserInfor) => void;
  setBookingInfor: (bookingInfo: BookingInfor) => void;
  resetBookingInfor: () => void;
};

const initialUserInfor: UserInfor = {
  email: '',
  phone: '',
};

const initialBookingInfor: BookingInfor = {
  detailId: null,
};

export const useBookingStore = create<BookingStore>((set) => ({
  userInfor: initialUserInfor,
  bookingInfor: initialBookingInfor,
  setUserInfor: (userInfor) => set(() => ({ userInfor })),
  setBookingInfor: (bookingInfor) => set(() => ({ bookingInfor })),
  resetBookingInfor: () =>
    set(() => ({ userInfor: initialUserInfor, bookingInfor: initialBookingInfor })),
}));
