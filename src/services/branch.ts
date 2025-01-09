import { API_PATH } from '@/api/constant';
import axiosInstance from '@/api/request';
import { Branch } from '@ahomevilla-hotel/node-sdk';

export async function getLatestBranchService() {
  return axiosInstance.get<[Branch]>(API_PATH.GET_LATEST_BRANCHES);
}
