import { AuthCookieService } from '@/services/auth-cookie';

export interface IAuth {
  loading?: boolean;
  token: string;
  refreshToken: string;
  expiredTime: number;
}

export const useAuth = () => {
  const onLogout = () => {
    AuthCookieService.deleteAuthCookies();
    window.location.reload();
  };

  const onLogin = (data: IAuth) => {
    try {
      AuthCookieService.setAuthCookies(data.token, data.refreshToken, data.expiredTime.toString());

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    isLogin: !!AuthCookieService.getAccessToken(),
    onLogin,
    onLogout,
  };
};
