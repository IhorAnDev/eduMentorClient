import env from '@/env/index';
import { cookies } from 'next/headers';
import { prefix } from '@/config/index';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const refreshToken = await request.json();
  try {
    const res = await fetch(`${env.API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(refreshToken),
    });

    const data = await res.json();

    const token = data.token;

    const decodedAccessToken = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString()
    );

    if (decodedAccessToken) {
      data.tokenExp = decodedAccessToken.exp * 1000;
    }

    if (!res.ok) {
      return NextResponse.json(
        { message: 'Failed to refresh token' },
        { status: 500 }
      );
    }

    const response = NextResponse.json({
      success: true,
      status: res.status,
      token,
      tokenExp: data.tokenExp,
      refreshToken: data.refreshToken,
    });

    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
    });
  }
}
