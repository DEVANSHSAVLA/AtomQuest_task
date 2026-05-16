export const SkeletonRow = ({ cols = 5 }) => (
  <div className="animate-pulse flex items-center space-x-4 py-4 px-6 border-b border-gray-200 dark:border-[#464554]">
    {Array(cols).fill(0).map((_, i) => (
      <div key={i} className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
    ))}
  </div>
);

export const SkeletonCard = () => (
  <div className="bg-white dark:bg-[#0b1326] rounded-xl shadow-sm border border-gray-200 dark:border-[#464554] p-6 animate-pulse">
    <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
    <div className="h-10 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
    <div className="h-3 w-1/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
  </div>
);
