import { AnimatedCounter } from './AnimatedCounter';

export const StatCard = ({ label, value, sub }) => (
  <div className="bg-white dark:bg-[#0b1326] rounded-xl shadow-sm border border-gray-200 dark:border-[#464554] p-6 flex flex-col hover:shadow-md transition-shadow">
    <span className="text-sm font-medium text-gray-500 dark:text-[#c7c4d7] mb-2">{label}</span>
    <span className="text-3xl font-bold text-gray-900 dark:text-[#dae2fd]">
      {value === '—' || value === undefined ? '—' : <AnimatedCounter value={value} />}
    </span>
    {sub && <span className="text-xs text-gray-400 dark:text-[#c7c4d7] mt-2">{sub}</span>}
  </div>
);

