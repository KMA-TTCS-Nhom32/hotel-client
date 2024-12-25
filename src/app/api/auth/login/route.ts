import { NextRequest, NextResponse } from 'next/server';
import { AuthCookieService } from '@/services/auth-cookie';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Example API call to your backend
    const response = await fetch('your-auth-endpoint', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Authentication failed');
    }

    // Set cookies with the JWT tokens
    AuthCookieService.setAuthCookies(data.accessToken, data.refreshToken, data.expireTime);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
  }
}
