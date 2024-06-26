import { prefix } from '@/config';
import env from '@/env';
import { getCookies } from 'next-client-cookies/server';

export async function getAccessTokenFromCookies() {
  const accessTokenCookie = getCookies().get(`${prefix}xxx.access-token`);
  return await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/api/company`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${accessTokenCookie}`,
    },
  });
}
