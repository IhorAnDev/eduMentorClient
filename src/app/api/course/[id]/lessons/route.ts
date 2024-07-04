import { NextResponse, NextRequest } from 'next/server';
import env from '@/env/index';
import { getLessonsByCourseId } from '@/lib/api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const courseId = parseInt(params.id, 10);
  const apiUrl = `${env.API_BASE_URL}/lesson/courses/${courseId}`;
  const token = request.headers.get('Authorization');

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch lessons data from API');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
