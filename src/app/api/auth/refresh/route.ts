import { NextRequest, NextResponse } from 'next/server';
import { AuthCookieService } from '@/services/auth-cookie';
import { API_PATH } from '@/api/constant';
import { config } from '@/config';
import { RefreshTokenResponseDto } from '@ahomevilla-hotel/node-sdk';

export async function POST(req: NextRequest) {
  try {
    const refreshToken = await AuthCookieService.getServerRefreshToken({ req, res: NextResponse.next() });
    
    if (!refreshToken) {
      return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
    }

    const response = await fetch(`${config.apiUrl}${API_PATH.REFRESH}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Refresh failed');
    }

    const data = await response.json() as RefreshTokenResponseDto;
    const res = NextResponse.json({ success: true });

    // Set new tokens in cookies
    await AuthCookieService.setServerAuthCookies(
      { req, res },
      data.accessToken,
      data.refreshToken,
      data.accessTokenExpires
    );

    return res;
  } catch (error) {
    return NextResponse.json({ error: 'Token refresh failed' }, { status: 401 });
  }
}