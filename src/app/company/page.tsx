import { Company } from '@/types';
import env from '@/env/index';
import { getTokenFromCookies, getAccessToken } from '@/lib/api';
import CompanyPageClient from '@/components/company/Company';
import { companyMock } from '@/components/company/company-mock';

async function fetchCompany(): Promise<Company> {
  const response = await getAccessToken();

  if (!response.ok) {
    return companyMock.companyState;
    // throw new Error('Failed to fetch company data....');
  }

  return response.json();
}

export default async function Page() {
  const company = await fetchCompany();

  return <CompanyPageClient company={company} />;
}
