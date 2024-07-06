import { Lesson } from '@/types';
import LessonComponent from './LessonComponent';

interface LessonsComponentProps {
  lessons: Lesson[];
}

const LessonsComponent: React.FC<LessonsComponentProps> = ({ lessons }) => {
  return (
    <ul className="flex flex-wrap gap-4">
      {lessons.map(lesson => (
        <li
          key={lesson.lessonId}
          className="w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.667rem)] lg:w-[calc(25%-0.75rem)]"
        >
          <LessonComponent {...lesson} />
        </li>
      ))}
    </ul>
  );
};

export default LessonsComponent;
