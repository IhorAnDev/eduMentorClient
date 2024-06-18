// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} w-full relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-40 w-80 rounded-md bg-gray-200" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-80 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <>
      {Array.from({ length: 8 }, (_, i) => (
        <CardSkeleton key={i} />
      ))}
    </>
  );
}
