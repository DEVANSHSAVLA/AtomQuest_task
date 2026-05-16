export const StatusBadge = ({ status }) => {
  const colors = {
    DRAFT: 'bg-gray-50 dark:bg-[#171f33] text-gray-900 dark:text-[#dae2fd]',
    SUBMITTED: 'bg-blue-100 text-blue-700',
    APPROVED: 'bg-green-100 text-green-700',
    REWORK: 'bg-orange-100 text-orange-700',
    NOT_STARTED: 'bg-gray-50 dark:bg-[#171f33] text-gray-500 dark:text-[#c7c4d7]',
    ON_TRACK: 'bg-blue-100 text-blue-700',
    COMPLETED: 'bg-green-100 text-green-700',
  };

  const currentClass = colors[status] || 'bg-gray-50 dark:bg-[#171f33] text-gray-900 dark:text-[#dae2fd]';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide ${currentClass}`}>
      {status?.replace(/_/g, ' ')}
    </span>
  );
};
