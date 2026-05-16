export const ProgressBar = ({ score }) => {
  const safeScore = score ?? 0;
  const color = safeScore >= 80 ? 'bg-green-500' : safeScore >= 50 ? 'bg-orange-400' : 'bg-red-400';
  
  return (
    <div className="flex items-center space-x-3 w-full">
      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${color}`} 
          style={{ width: `${Math.min(safeScore, 100)}%` }}
        />
      </div>
      <span className="text-sm font-medium text-gray-900 dark:text-[#dae2fd] min-w-[3rem] text-right">
        {safeScore?.toFixed(1)}%
      </span>
    </div>
  );
};
