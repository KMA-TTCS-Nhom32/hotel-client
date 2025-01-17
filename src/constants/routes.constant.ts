export const APP_ROUTES = {
  Home: '/',
  About: '/about',
  Contact: '/contact',
  SearchRoom: '/tim-kiem',
  Account: '/account',
  AccountInfor: '/account/infor',
  AccountMyReservation: '/account/my-reservation',
  Branch: '/chi-nhanh',
  Booking: '/dat-phong',
  Payment: '/thanh-toan',
  ConfirmBooking: '/xac-nhan-dat-phong',
  CancelBooking: '/huy-dat-phong',
  SuccessPayment: '/thanh-toan-thanh-cong',
};

export const NeedAuthRoutes = [
  APP_ROUTES.Account,
  APP_ROUTES.AccountInfor,
  APP_ROUTES.AccountMyReservation,
  APP_ROUTES.Booking,
  APP_ROUTES.Payment,
  APP_ROUTES.SearchRoom,
  APP_ROUTES.ConfirmBooking,
];
