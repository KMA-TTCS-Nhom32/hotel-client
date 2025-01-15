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
  ChangePasswordDto,
  InitiateForgotPasswordEmailDto,
  VerifyCodeResponseDto,
  VerifyEmailOTP,
  ResetPasswordWithOTPEmailDto,
} from '@ahomevilla-hotel/node-sdk';

export async function registerUserService(data: RegisterDto) {
  return axiosInstance.post<RegisterResponseDto>(API_PATH.REGISTER, data);
}

export async function verifyUserEmailService(data: VerifyEmailDto) {
  return axiosInstance.post(API_PATH.VERIFY_EMAIL, data);
}

export async function loginUserService(data: LoginDto) {
  return axiosInstance.post<LoginResponseDto>(API_PATH.LOGIN, data);
}

export async function getProfileService() {
  return axiosInstance.get<User>(API_PATH.PROFILE);
}

export async function updateProfileService(data: UpdateProfileDto) {
  return axiosInstance.patch<User>(API_PATH.PROFILE, data);
}
export async function changePassWordService(data: ChangePasswordDto) {
  return axiosInstance.post(API_PATH.CHANGE_PASSWORD, data);
}
export async function verifyEmailService(data: InitiateForgotPasswordEmailDto) {
  return axiosInstance.post(API_PATH.INITIATE_EMAIL, data);
}

export async function verifyOTP(data: VerifyEmailOTP) {
  return axiosInstance.post(API_PATH.VERIFY_CODE, data);
}
export async function reserPasswordService(data: ResetPasswordWithOTPEmailDto) {
  return axiosInstance.post(API_PATH.RESET_PASSWORD, data);
}
export async function getUserRestore() {
  return axiosInstance.get<User>(API_PATH.USERS_RESTORE);
}


