import { API_PATH } from '@/api/constant';
import axiosInstance from '@/api/request';
import {
  LoginDto,
  LoginResponseDto,
  RegisterDto,
  RegisterResponseDto,
  UpdateProfileDto,
  User,
  VerifyEmailDto,
} from '@ahomevilla-hotel/node-sdk';

export function registerUserService(data: RegisterDto) {
  return axiosInstance.post<RegisterResponseDto>(API_PATH.REGISTER, data);
}

export function verifyUserEmailService(data: VerifyEmailDto) {
  return axiosInstance.post(API_PATH.VERIFY_EMAIL, data);
}

export function loginUserService(data: LoginDto) {
  return axiosInstance.post<LoginResponseDto>(API_PATH.LOGIN, data);
}

export function logoutUserService() {
  return axiosInstance.post(API_PATH.LOGOUT);
}

export function getProfileService() {
  return axiosInstance.get<User>(API_PATH.PROFILE);
}

export function updateProfileService(data: UpdateProfileDto) {
  return axiosInstance.patch<User>(API_PATH.PROFILE, data);
}
