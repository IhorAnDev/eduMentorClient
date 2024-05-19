import { cookies } from 'next/headers';
import { decode } from 'next-auth/jwt';
import type { Company } from '@/types';
import env from '@/env/index';

async function fetchCompany(token: string): Promise<Company> {
  const response = await fetch(`${env.API_BASE_URL}/company/1`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch company data');
  }

  return response.json();
}

export default async function Page() {
  const prefix = env.NODE_ENV === 'development' ? '__Dev-' : '';
  const cookieStore = cookies();
  const accessTokenCookie = cookieStore.get(`${prefix}xxx.access-token` as any);

  if (!accessTokenCookie) {
    return (
      <div className="text-3xl text-red-500">
        Authentication token not found.
      </div>
    );
  }

  const company = await fetchCompany(accessTokenCookie.value as string);

  return <div className="text-3xl text-red-500">Company: {company.name}</div>;
}
