import { getLessonsByCourseId } from '@/lib/api';

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
    <main>
      <h1>Lessons for Course {courseId}</h1>
      <ul>
        {lessons.map((lesson: any) => (
          <li key={lesson.id}>{lesson.title}</li>
        ))}
      </ul>
    </main>
  );
}
