import env from '@/env/index';
import { cookies } from 'next/headers';
import { prefix } from '@/config/index';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const payload = {
    refreshToken: cookies().get(`${prefix}xxx.refresh-token` as any)?.value,
  };

  const res = await fetch(`${env.API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { message: 'Failed to refresh token' },
      { status: 500 }
    );
  }

  console.log('data', data);
  const response = NextResponse.json({
    success: true,
    status: res.status,
    token: data.token,
    refreshToken: data.refreshToken,
  });

  response.cookies.set(`${prefix}xxx.refresh-token`, data.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    path: '/',
  });

  response.cookies.set(`${prefix}xxx.access-token`, data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    path: '/',
  });

  return response;
}
