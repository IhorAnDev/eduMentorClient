import { auth } from 'auth'
import env from '@/env'

async function getAuthToken(): Promise<string> {
  const session = await auth()
  if (!session?.user?.token) {
    throw new Error('Unauthorized')
  }
  return session.user.token
}

async function createAuthFetchOptions(method: string = 'GET'): Promise<RequestInit> {
  const token = await getAuthToken()
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  }
}

async function authenticatedFetch(url: string, options: RequestInit, retries = 1): Promise<Response> {
  try {
    const response = await fetch(url, options)
    if (!response.ok && retries > 0) {
      console.log(`Request failed, retrying... (${retries} retries left)`)
      await new Promise(resolve => setTimeout(resolve, 10)) 
      return authenticatedFetch(url, options, retries - 1)
    }
    return response
  } catch (error) {
    if (retries > 0) {
      console.log(`Request failed, retrying... (${retries} retries left)`)
      await new Promise(resolve => setTimeout(resolve, 10)) 
      return authenticatedFetch(url, options, retries - 1)
    }
    throw error
  }
}

export async function getCompany() {
  const options = await createAuthFetchOptions()
  return authenticatedFetch(`${env.NEXT_PUBLIC_API_BASE_URL}/api/company`, options)
}

export async function getLessonsByCourseId(courseId: number) {
  const options = await createAuthFetchOptions()
  return authenticatedFetch(`${env.NEXT_PUBLIC_API_BASE_URL}/api/course/${courseId}/lessons`, options)
}

export async function createSomething(data: any) {
  const options = await createAuthFetchOptions('POST')
  options.body = JSON.stringify(data)
  return authenticatedFetch(`${env.NEXT_PUBLIC_API_BASE_URL}/api/something`, options)
}
