import { useAuth } from '../../context/AuthContext';
import { useApi } from '../../hooks/useApi';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { StatCard } from '../../components/ui/StatCard';
import { SkeletonCard } from '../../components/ui/Skeleton';
import { Link } from 'react-router-dom';
import { ActivityTimeline } from '../../components/ui/ActivityTimeline';

export default function AdminDashboard() {
  const { user } = useAuth();
  const { data: users, loading: loadingUsers } = useApi('/admin/users');
  const { data: cycles, loading: loadingCycles } = useApi('/cycles');

  if (loadingUsers || loadingCycles) {
    return (
      <PageWrapper title="Admin Dashboard">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard />
        </div>
      </PageWrapper>
    );
  }

  const employees = users?.filter(u => u.role === 'EMPLOYEE') || [];
  const managers = users?.filter(u => u.role === 'MANAGER') || [];
  const activeCycles = cycles?.filter(c => c.isActive) || [];

  const mockActivities = [
    { id: 1, type: 'APPROVAL', content: 'Manager approved goals for', target: 'John Doe', date: '10 mins ago', datetime: '2023-01-01' },
    { id: 2, type: 'COMMENT', content: 'New check-in comment left by', target: 'Sarah Smith', date: '1 hour ago', datetime: '2023-01-01' },
    { id: 3, type: 'ESCALATION', content: 'System escalated pending goals for', target: 'Mike Johnson', date: '3 hours ago', datetime: '2023-01-01' },
    { id: 4, type: 'EDIT', content: 'Inline edit performed by', target: 'Jane Doe', date: '1 day ago', datetime: '2023-01-01' },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <PageWrapper title={`${getGreeting()}, ${user?.name?.split(' ')[0] || 'Admin'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard label="Total Employees" value={employees.length} />
        <StatCard label="Total Managers" value={managers.length} />
        <StatCard label="Active Cycles" value={activeCycles.length} />
        <StatCard label="Total Users" value={users?.length || 0} />
      </div>

      <div className="mb-4 text-lg font-bold">Quick Navigation</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <QuickNavCard to="/admin/cycles" title="Cycle Manager" description="Create and manage goal cycles" icon="📅" />
        <QuickNavCard to="/admin/reports" title="Reports" description="View achievement reports and export" icon="📊" />
        <QuickNavCard to="/admin/audit" title="Audit Log" description="Track all goal changes" icon="📋" />
        <QuickNavCard to="/admin/analytics" title="Analytics" description="QoQ trends and heatmaps" icon="📈" />
        <QuickNavCard to="/admin/escalations" title="Escalation Logs" description="View proactive alerts and system warnings" icon="🚨" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {activeCycles.length > 0 && (
            <>
              <div className="mb-4 text-lg font-bold">Active Cycles</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeCycles.map(cycle => (
                  <div key={cycle.id} className="bg-white dark:bg-[#0b1326] rounded-xl border border-gray-200 dark:border-[#464554] shadow-sm p-5 glass-panel">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold">{cycle.year} — {cycle.phase}</span>
                      <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">Active</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-[#c7c4d7]">
                      {new Date(cycle.windowOpen).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })} → {new Date(cycle.windowClose).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="lg:col-span-1">
          <div className="mb-4 text-lg font-bold">Live Activity Feed</div>
          <div className="bg-white dark:bg-[#0b1326] rounded-xl border border-gray-200 dark:border-[#464554] shadow-sm p-6 glass-panel">
            <ActivityTimeline activities={mockActivities} />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

function QuickNavCard({ to, title, description, icon }) {
  return (
    <Link to={to} className="bg-white dark:bg-[#0b1326] rounded-xl border border-gray-200 dark:border-[#464554] shadow-sm p-5 hover:shadow-md hover:border-indigo-500 dark:hover:border-[#c0c1ff] transition-all group glass-panel relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-500 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-300"></div>
      <div className="text-2xl mb-3 relative z-10">{icon}</div>
      <h3 className="text-sm font-bold group-hover:text-indigo-600 dark:text-[#c0c1ff] transition-colors relative z-10">{title}</h3>
      <p className="text-xs text-gray-500 dark:text-[#c7c4d7] mt-1 relative z-10">{description}</p>
    </Link>
  );
}
