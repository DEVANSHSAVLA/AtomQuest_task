import { SkeletonRow } from './Skeleton';
import { EmptyState, ErrorState } from './FeedbackStates';

export const DataTable = ({ columns, data, loading, error, onRetry, emptyMessage }) => {
  if (loading) {
    return (
      <div className="bg-white dark:bg-[#0b1326] rounded-xl shadow-sm border border-gray-200 dark:border-[#464554] overflow-hidden">
        {Array(5).fill(0).map((_, i) => <SkeletonRow key={i} cols={columns.length} />)}
      </div>
    );
  }

  if (error) return <ErrorState message={error} onRetry={onRetry} />;
  
  if (!data?.length) return <EmptyState message={emptyMessage || 'No records found'} />;

  return (
    <div className="bg-white dark:bg-[#0b1326] rounded-xl shadow-sm border border-gray-200 dark:border-[#464554] overflow-hidden overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-600 dark:text-[#c7c4d7] whitespace-nowrap">
        <thead className="bg-gray-50 dark:bg-[#171f33] text-xs uppercase tracking-wider text-gray-900 dark:text-[#dae2fd] border-b border-gray-200 dark:border-[#464554]">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-6 py-4 font-semibold">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-[#464554]">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50 dark:hover:bg-[#171f33] transition-colors">
              {columns.map((col, idx) => (
                <td key={idx} className="px-6 py-4">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

