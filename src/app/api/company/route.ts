import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const companyId = 1; 
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/company/${companyId}`;

  // Извлечение токена сессии из куки
  const cookieStore = cookies();
  const sessionTokenCookie = cookieStore.get('next-auth.session-token');
  const sessionToken = sessionTokenCookie?.value;

  if (!sessionToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch company data');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
