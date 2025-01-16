import { API_PATH } from '@/api/constant';
import axiosInstance from '@/api/request';
import {
    QueryRoomDetailDto,
    RoomDetailInfinitePaginationResultDto
} from '@ahomevilla-hotel/node-sdk';

export async function getRoomDetailService(params: QueryRoomDetailDto) {
  return axiosInstance.get<RoomDetailInfinitePaginationResultDto>(API_PATH.ROOM_DETAIL, { params });
}
