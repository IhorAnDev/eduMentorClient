import { Company } from '@/types';
import { getAccessToken } from '@/lib/api';
import { companyMock } from '@/components/company/company-mock';
import CourseCard from '@/components/course/CourseCard';

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

  return company.companyCourses.map(course => (
    <CourseCard key={course.courseId} course={course} />
  ));
}
