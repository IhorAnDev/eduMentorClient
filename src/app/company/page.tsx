import { Company } from '@/types';
import env from '@/env/index';
import { getTokenFromCookies } from '@/lib/api';

async function fetchCompany(): Promise<Company> {

  const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/api/company`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${await getTokenFromCookies()}`,
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch company data....');
  }

  return response.json();
}

export default async function Page() {
  try {
    const company = await fetchCompany();
    return (
      <div className="text-3xl text-red-500">
        Company: {company.companyName}
      </div>
    );
  } catch (error: any) {
    return (
      <div className="text-3xl text-red-500">
        Failed to load company data: {error.message}
      </div>
    );
  }
}
