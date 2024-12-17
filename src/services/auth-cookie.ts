import { getCookie as getClientCookie, setCookie as setClientCookie, deleteCookie as deleteClientCookie } from 'cookies-next/client';
import { getCookie as getServerCookie, setCookie as setServerCookie } from 'cookies-next/server';
import { NextRequest, NextResponse } from 'next/server';
import { STORE_TOKEN_KEY } from '@/constants/auth.constant';

interface AuthCookieOptions {
  maxAge?: number;
  secure?: boolean;
  path?: string;
}

interface ServerContext {
  req: NextRequest;
  res: NextResponse;
}

const defaultOptions: AuthCookieOptions = {
  maxAge: 30 * 24 * 60 * 60, // 30 days
  secure: process.env.NODE_ENV === 'production',
  path: '/',
};

export const AuthCookieService = {
  // Client-side methods
  getAccessToken(): string | undefined {
    return getClientCookie(STORE_TOKEN_KEY.AHOMEVILLA_CLIENT_TOKEN);
  },

  getRefreshToken(): string | undefined {
    return getClientCookie(STORE_TOKEN_KEY.AHOMEVILLA_CLIENT_REFRESH_TOKEN);
  },

  getExpireTime(): string | undefined {
    return getClientCookie(STORE_TOKEN_KEY.AHOMEVILLA_CLIENT_EXPIRE_TIME);
  },

  setAuthCookies(
    accessToken: string,
    refreshToken: string,
    expireTime: string,
    options?: AuthCookieOptions
  ): void {
    const cookieOptions = { ...defaultOptions, ...options };

    setClientCookie(STORE_TOKEN_KEY.AHOMEVILLA_CLIENT_TOKEN, accessToken, cookieOptions);
    setClientCookie(STORE_TOKEN_KEY.AHOMEVILLA_CLIENT_REFRESH_TOKEN, refreshToken, cookieOptions);
    setClientCookie(STORE_TOKEN_KEY.AHOMEVILLA_CLIENT_EXPIRE_TIME, expireTime, cookieOptions);
  },

  deleteAuthCookies(): void {
    deleteClientCookie(STORE_TOKEN_KEY.AHOMEVILLA_CLIENT_TOKEN);
    deleteClientCookie(STORE_TOKEN_KEY.AHOMEVILLA_CLIENT_REFRESH_TOKEN);
    deleteClientCookie(STORE_TOKEN_KEY.AHOMEVILLA_CLIENT_EXPIRE_TIME);
  },

  // Server-side methods
  async getServerAccessToken(context: ServerContext): Promise<string | undefined> {
    return getServerCookie(STORE_TOKEN_KEY.AHOMEVILLA_CLIENT_TOKEN, context);
  },

  async getServerRefreshToken(context: ServerContext): Promise<string | undefined> {
    return getServerCookie(STORE_TOKEN_KEY.AHOMEVILLA_CLIENT_REFRESH_TOKEN, context);
  },

  async getServerExpireTime(context: ServerContext): Promise<string | undefined> {
    return getServerCookie(STORE_TOKEN_KEY.AHOMEVILLA_CLIENT_EXPIRE_TIME, context);
  },

  async setServerAuthCookies(
    context: ServerContext,
    accessToken: string,
    refreshToken: string,
    expireTime: number | string,
    options?: AuthCookieOptions
  ): Promise<void> {
    const cookieOptions = { ...defaultOptions, ...options };
    const expireTimeString = expireTime.toString();

    await setServerCookie(STORE_TOKEN_KEY.AHOMEVILLA_CLIENT_TOKEN, accessToken, { ...context, ...cookieOptions });
    await setServerCookie(STORE_TOKEN_KEY.AHOMEVILLA_CLIENT_REFRESH_TOKEN, refreshToken, { ...context, ...cookieOptions });
    await setServerCookie(STORE_TOKEN_KEY.AHOMEVILLA_CLIENT_EXPIRE_TIME, expireTimeString, { ...context, ...cookieOptions });
  },

  isAuthenticated(accessToken?: string): boolean {
    return !!accessToken || !!this.getAccessToken();
  }
};
