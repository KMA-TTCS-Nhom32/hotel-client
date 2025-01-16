import { API_PATH } from '@/api/constant';
import axiosInstance from '@/api/request';
import { Booking, CreateBookingOnlineDto } from '@ahomevilla-hotel/node-sdk';

export function createBookingService(data: CreateBookingOnlineDto) {
  return axiosInstance.post<Booking>(API_PATH.BOOKING, data);
}
