export const EmptyState = ({ message = 'No data found', action }) => (
  <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-[#0b1326] rounded-xl border border-dashed border-gray-200 dark:border-[#464554]">
    <div className="text-4xl mb-4">📭</div>
    <h3 className="text-lg font-medium text-gray-900 dark:text-[#dae2fd] mb-2">{message}</h3>
    {action && (
      <button 
        onClick={action.onClick}
        className="mt-4 px-4 py-2 bg-indigo-600 dark:bg-[#c0c1ff]/10 text-indigo-600 dark:text-[#c0c1ff] hover:bg-indigo-600 dark:bg-[#c0c1ff]/20 rounded-lg text-sm font-medium transition-colors"
      >
        {action.label}
      </button>
    )}
  </div>
);

export const ErrorState = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center p-8 text-center bg-red-50 rounded-xl border border-red-100">
    <div className="text-3xl mb-3">⚠️</div>
    <h3 className="text-sm font-medium text-red-800 mb-4">{message}</h3>
    {onRetry && (
      <button 
        onClick={onRetry}
        className="px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg text-sm font-medium transition-colors"
      >
        Try Again
      </button>
    )}
  </div>
);
