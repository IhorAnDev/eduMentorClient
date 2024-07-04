import { auth } from 'auth';
import env from '@/env';

async function getCompanyWithRetry(retries = 1): Promise<Response> {
  const session = await auth();
  if (!session?.user?.token) {
    throw new Error('Unauthorized');
  }

  const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/api/company`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.user.token}`,
    },
  });

  if (!response.ok && retries > 0) {
    console.log(`Request failed, retrying... (${retries} retries left)`);
    await new Promise(resolve => setTimeout(resolve, 100));
    return getCompanyWithRetry(retries - 1);
  }

  return response;
}

export async function getCompany() {
  return getCompanyWithRetry();
}

export async function getLessonsByCourseId(courseId: number) {
  const session = await auth();
  if (!session?.user?.token) {
    throw new Error('Unauthorized');
  }

  return await fetch(
    `${env.NEXT_PUBLIC_API_BASE_URL}/api/course/${courseId}/lessons`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.user.token}`,
      },
    }
  );
}

// Remove the getHeaders function if it's no longer needed
