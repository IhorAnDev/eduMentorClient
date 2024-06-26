import { NextResponse, NextRequest } from 'next/server';
import env from '@/env/index';

export async function GET(request: NextRequest) {
  const companyId = 1;
  const apiUrl = `${env.API_BASE_URL}/company/${companyId}`;
  const token = request.headers.get('Authorization');
  
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch company data from API');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
