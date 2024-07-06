import PageWrapper from '@/components/PageWrapper';
import LessonComponent from '@/components/lessons/LessonComponent';
import LessonsComponent from '@/components/lessons/LessonsComponent';
import { getLessonsByCourseId } from '@/lib/api';
import { Lesson } from '@/types';

export default async function Page({ params }: { params: { id: string } }) {
  const courseId = parseInt(params.id, 10);

  let lessons = [];
  try {
    const response = await getLessonsByCourseId(courseId);
    if (response.ok) {
      lessons = await response.json();
    } else {
      console.error('Failed to fetch lessons:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching lessons:', error);
  }

  return (
    <main className="flex justify-center">
      <div className="max-w-screen-lg w-full">
        <h1 className="text-2xl font-bold text-center mb-8">
          Lessons for Course {courseId}
        </h1>
        <LessonsComponent lessons={lessons} />
      </div>
    </main>
  );
}
