import { prefix } from '@/config';
import env from '@/env';
import { getToken } from 'next-auth/jwt';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function getTokenFromCookies() {
  const cookieStore = cookies();
  const accessTokenCookie = cookieStore.get(`${prefix}xxx.access-token`);
  if (!accessTokenCookie) {
    return null;
  }
  return accessTokenCookie.value;
}

export async function getAccessToken() {
  return await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/api/company`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${await getTokenFromCookies()}`,
    },
  });
}

export async function getTokenFromRequest(req: NextRequest) {
  const secret = env.NEXTAUTH_SECRET || env.AUTH_SECRET;
  if (!secret) {
    throw new Error('NEXTAUTH_SECRET or AUTH_SECRET is not defined');
  }

  const token = await getToken({
    req,
    secret,
    salt: process.env.SALT || 'default_salt',
  });
  console.log('in getTokenFromRequest...', token);
  return token;
}
