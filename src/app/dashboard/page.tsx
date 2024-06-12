import { Company } from '@/types';
import { getAccessToken } from '@/lib/api';
import { companyMock } from '@/components/company/company-mock';
import CourseCard from '@/components/course/CourseCard';

async function fetchCompany(): Promise<Company> {
  // TODO remove the delay
  console.log('Fetching company data...');
  await new Promise((resolve) => setTimeout(resolve, 5000)); 
  const response = await getAccessToken();
  if (!response.ok) {
    return companyMock.companyState;
  }

  return response.json();
}

export default async function Page() {
  const company = await fetchCompany();

  return company.companyCourses.map(course => (
    <CourseCard key={course.courseId} course={course} />
  ));
}
