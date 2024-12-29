import acceptLanguage from 'accept-language';
import { NextResponse, NextRequest } from 'next/server';

import { fallbackLng, languages, cookieName } from '@/i18n/settings';
import { APP_ROUTES, NeedAuthRoutes } from './constants/routes.constant';
import { AuthCookieService } from './services/auth-cookie';

acceptLanguage.languages(languages);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|logos|favicon.ico|sw.js|site.webmanifest).*)',
  ],
};

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (pathname.indexOf('icon') > -1 || pathname.indexOf('chrome') > -1) {
    return NextResponse.next();
  }

  let lng: string | undefined | null;

  if (req.cookies.has(cookieName)) {
    lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  }

  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'));
  if (!lng) lng = fallbackLng;
  console.log('lng: ', lng);

  // Redirect if language in path is not supported
  if (!languages.some((loc) => pathname.startsWith(`/${loc}`)) && !pathname.startsWith('/_next')) {
    return NextResponse.redirect(new URL(`/${lng}${pathname}${search}`, req.url));
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer') || '');
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  const res = NextResponse.next();
  const accessToken = await AuthCookieService.getServerAccessToken({ req, res });
  const refreshToken = await AuthCookieService.getServerRefreshToken({ req, res });
  const expireTime = await AuthCookieService.getServerExpireTime({ req, res });

  const haveAccessToken = AuthCookieService.isAuthenticated(accessToken);
  const isNeedAuthRoute = NeedAuthRoutes.some((route) => pathname.startsWith(`/${lng}${route}`));
  const isTokenExpired = expireTime && new Date(expireTime) < new Date();

  if (isNeedAuthRoute) {
    if (!haveAccessToken) {
      return NextResponse.redirect(new URL(`/${lng}/${APP_ROUTES.Home}`, req.url));
    }

    if (isTokenExpired && refreshToken) {
      try {
        // Use our internal refresh API route
        const response = await fetch(`${req.nextUrl.origin}/api/auth/refresh`, {
          method: 'POST',
          headers: {
            Cookie: req.headers.get('cookie') || '',
          },
        });

        if (!response.ok) {
          throw new Error('Token refresh failed');
        }

        return res;
      } catch {
        return NextResponse.redirect(new URL(`/${lng}/${APP_ROUTES.Home}`, req.url));
      }
    }
  }

  return res;
}
