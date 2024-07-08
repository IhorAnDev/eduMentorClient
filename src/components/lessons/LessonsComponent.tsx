import { Lesson } from '@/types';
import LessonComponent from './LessonComponent';
import env from '@/env';
import { getLessonsByCourseId } from '@/lib/api';

async function fetchLessons(courseId: number) {
  const response = await getLessonsByCourseId(courseId);
  if (!response.ok) throw new Error('Failed to fetch lessons');
  return response.json();
}

export default async function LessonsComponent({
  courseId,
}: {
  courseId: number;
}) {
  const lessons = await fetchLessons(courseId);

  return (
    <ul className="flex flex-col space-y-4 w-full">
      {lessons.map((lesson: Lesson) => (
        <li key={lesson.lessonId} className="w-full">
          <LessonComponent {...lesson} />
        </li>
      ))}
    </ul>
  );
}
