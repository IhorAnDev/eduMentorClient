import { Course } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import env from '@/env/index';

const CompanyCard = ({ course }: { course: Course }) => {
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
            src={fullImageUrl }
            alt={courseName}
            fill
            style={{ objectFit: 'contain' }}
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
        <Link
          href="#"
          className="mt-auto inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Apply now
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default CompanyCard;
