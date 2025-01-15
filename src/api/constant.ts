export const API_PATH = {
  // Auth
  LOGIN: '/auth/login',
  REFRESH: '/auth/refresh',
  LOGOUT: '/auth/logout',
  PROFILE: '/auth/profile',
  REGISTER: '/auth/register',
  VERIFY_EMAIL: '/auth/verify-email',
  CHANGE_PASSWORD: '/auth/change-password',
  INITIATE_EMAIL: '/auth/forgot-password/email/initiate',
  VERIFY_CODE: '/verification/verify-email-otp',
  RESET_PASSWORD: '/auth/forgot-password/email/reset',
  //User
  USERS_RESTORE:'/users/{id}/restore',
  //Province
  PROVINCE:'/provinces',

  // Branch
  BRANCHES: '/branches',
  GET_LATEST_BRANCHES: '/branches/latest',

  //Amemnity
  AMENITY: '/amenities',
};
