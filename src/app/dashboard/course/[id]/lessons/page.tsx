import LessonsComponent from '@/components/lessons/LessonsComponent';

export default async function Page({ params }: { params: { id: string } }) {
  const courseId = parseInt(params.id, 10);

  return <LessonsComponent courseId={courseId} />;
}
