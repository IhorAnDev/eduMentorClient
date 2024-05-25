import { Company } from '@/types';
import env from '@/env/index';
import { getTokenFromCookies } from '@/lib/api';
import CompanyPageClient from '@/components/company/Company';

async function fetchCompany(): Promise<Company> {
  const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/api/company`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${await getTokenFromCookies()}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch company data....');
  }

  return response.json();
}

export default async function Page() {
  const company = await fetchCompany();

  return <CompanyPageClient company={company} />;
}
