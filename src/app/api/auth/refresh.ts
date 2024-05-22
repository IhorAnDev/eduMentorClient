import { cookies } from 'next/headers';
import env from '@/env/index';

export async function POST(request: Request) {

  const prefix = process.env.NODE_ENV === 'development' ? '__Dev-' : '';

  const payload = {
    refreshToken: cookies().get(`${prefix}xxx.refresh-token` as any)?.value,
  };

  console.log('payload', payload);

  // change it with your own endpoint
  const res = await fetch(`${env.API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  return Response.json({
    success: res.ok,
    status: res.status,
    data,
  });
}
