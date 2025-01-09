import { API_PATH } from '@/api/constant';
import axiosInstance from '@/api/request';
import { Branch, BranchDetail } from '@ahomevilla-hotel/node-sdk';

export async function getLatestBranchesService() {
  return axiosInstance.get<[Branch]>(API_PATH.GET_LATEST_BRANCHES);
}

export async function getDetailBranchService(slug: string) {
  return axiosInstance.get<BranchDetail>(`${API_PATH.BRANCHES}/${slug}`);
}