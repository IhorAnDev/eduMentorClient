import PageWrapper from '@/components/PageWrapper';
import LessonComponent from '@/components/lessons/LessonComponent';
import LessonsComponent from '@/components/lessons/LessonsComponent';
import { CardSkeleton } from '@/components/skeletons';
import { getLessonsByCourseId } from '@/lib/api';
import { Lesson } from '@/types';
import { Suspense } from 'react';

export default async function Page({ params }: { params: { id: string } }) {
  const courseId = parseInt(params.id, 10);

  return <LessonsComponent courseId={courseId} />;
}
