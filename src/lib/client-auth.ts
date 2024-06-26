import env from '@/env';
import { useCookies } from 'next-client-cookies';

export async function refreshAuthTokens(token: string) {
  const cookies = useCookies();
  console.log(token);

  const res = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/api/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  console.log('data', data);
  if (!res.ok) {
    throw new Error(data.message);
  }

  console.log('data', data);
  return data;
}
