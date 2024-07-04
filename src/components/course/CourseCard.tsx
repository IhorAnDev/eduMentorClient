import { Course } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import env from '@/env/index';
import { ApplyCourse } from './Buttons';

const CourseCard = ({ course }: { course: Course }) => {
  const { courseId, courseName, courseDescription, imageUrl } = course;
  const serverUrl = env.API_BASE_URL || 'http://localhost:8085';
  const fullImageUrl = imageUrl
    ? `${serverUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`
    : '/images/learning.jpg';

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
      <Link href="#">
        <div className="relative w-full h-52">
          <Image
            src={fullImageUrl}
            alt={courseName}
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 75vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: 'fill' }}
            className="rounded-t-lg"
          />
        </div>
      </Link>
      <div className="p-5 flex flex-col flex-grow">
        <Link href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate">
            {courseName}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex-grow overflow-hidden">
          {courseDescription}
        </p>
        <ApplyCourse id={courseId} />
      </div>
    </div>
  );
};

export default CourseCard;
