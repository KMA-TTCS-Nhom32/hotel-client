import { API_PATH } from '@/api/constant';
import axiosInstancePublic from '@/api/public-request';
import { GetTranslationsRequestDto, ListTranslationResponseDto } from '@ahomevilla-hotel/node-sdk';

export function getTranslationList(data: GetTranslationsRequestDto) {
  return axiosInstancePublic.post<ListTranslationResponseDto>(API_PATH.TRANSLATION_LIST, data);
}
