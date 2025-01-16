import { API_PATH } from '@/api/constant';
import axiosInstance from '@/api/request';
import {
  QueryRoomDetailDto,
  RoomDetailInfinitePaginationResultDto,
  RoomDetailPaginationResultDto,
} from '@ahomevilla-hotel/node-sdk';

export function getRoomDetailService(params: QueryRoomDetailDto) {
  return axiosInstance.get<RoomDetailPaginationResultDto>(API_PATH.ROOM_DETAIL, { params });
}

export function getRoomDetailInfiniteService(params: QueryRoomDetailDto) {
  return axiosInstance.get<RoomDetailInfinitePaginationResultDto>(
    `${API_PATH.ROOM_DETAIL}/infinite`,
    { params },
  );
}
