import { API_PATH } from '@/api/constant';
import axiosInstance from '@/api/request';
import { ProvincePaginationResultDto } from '@ahomevilla-hotel/node-sdk';

export async function getProvinceService() {
  return axiosInstance.get<ProvincePaginationResultDto>(API_PATH.PROVINCE);
}
