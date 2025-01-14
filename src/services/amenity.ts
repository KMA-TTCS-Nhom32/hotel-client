import { API_PATH } from '@/api/constant';
import axiosInstance from '@/api/request';
import { AmenitiesPaginationResultDto } from '@ahomevilla-hotel/node-sdk';

export async function getAmenityService() {
  return axiosInstance.get<AmenitiesPaginationResultDto>(API_PATH.AMENITY);
}
