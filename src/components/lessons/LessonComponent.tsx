import { Lesson } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import env from '@/env';
import { TakeLesson } from '../course/Buttons';

export default function LessonComponent({
  lessonId,
  title,
  description,
  imageUrl,
}: Lesson) {
  const serverUrl = env.API_BASE_URL || 'http://localhost:8085';
  const fullImageUrl = imageUrl
    ? `${serverUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`
    : '/images/learning.jpg';

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex">
      <div className="w-1/4 relative">
        <Image
          src={fullImageUrl}
          alt={title}
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 75vw, (max-width: 1024px) 50vw, 33vw"
          style={{ objectFit: 'fill' }}
          className="rounded-t-lg"
        />
      </div>
      <div className="w-3/4 p-5 flex flex-col justify-between">
        <Link href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate">
            {title}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex-grow overflow-hidden">
          {description}
        </p>
        <TakeLesson id={lessonId} />
      </div>
    </div>
  );
}
