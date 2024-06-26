import { Company } from '@/types';
import { getAccessTokenFromCookies } from '@/lib/api';
import { companyMock } from '@/components/company/company-mock';
import CourseCard from '@/components/course/CourseCard';
import { getCookies } from 'next-client-cookies/server';
import { prefix } from '@/config';

async function fetchCompany(): Promise<Company> {
  const response = await getAccessTokenFromCookies();
  if (!response.ok) {
    return companyMock.companyState;
  }

  return response.json();
}

export default async function Page() {
  const cookies = await getCookies();
  const company = await fetchCompany();
  return company.companyCourses.map(course => (
    <CourseCard key={course.courseId} course={course} />
  ));
}
