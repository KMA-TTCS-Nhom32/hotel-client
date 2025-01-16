import { API_PATH } from '@/api/constant';
import axiosInstancePublic from '@/api/public-request';
// import axiosInstance from '@/api/request';
import {
  QueryRoomDetailDto,
  RoomDetailInfinitePaginationResultDto,
  RoomDetailPaginationResultDto,
} from '@ahomevilla-hotel/node-sdk';

export async function getRoomDetailService(params: QueryRoomDetailDto) {
  return axiosInstancePublic.get<RoomDetailPaginationResultDto>(API_PATH.ROOM_DETAIL, { params });
}

export async function getRoomDetailInfiniteService(params: QueryRoomDetailDto) {
  return axiosInstancePublic.get<RoomDetailInfinitePaginationResultDto>(
    `${API_PATH.ROOM_DETAIL}/infinite`,
    { params },
  );
}
