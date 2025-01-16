import { API_PATH } from '@/api/constant';
import axiosInstance from '@/api/request';
import { ProvincePaginationResultDto, QueryProvincesDto } from '@ahomevilla-hotel/node-sdk';

export async function getProvinceService(params: QueryProvincesDto) {
  return axiosInstance.get<ProvincePaginationResultDto>(API_PATH.PROVINCE, { params });
}
