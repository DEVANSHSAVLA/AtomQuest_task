import { useAuth } from '../../context/AuthContext';
import { useApi } from '../../hooks/useApi';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { StatCard } from '../../components/ui/StatCard';
import { SkeletonCard } from '../../components/ui/Skeleton';
import { DataTable } from '../../components/ui/DataTable';
import { Link } from 'react-router-dom';
import { ActivityTimeline } from '../../components/ui/ActivityTimeline';

export default function ManagerDashboard() {
  const { user } = useAuth();
  const { data: team, loading } = useApi('/manager/team');
  
  if (loading) return <PageWrapper><div className="grid grid-cols-4 gap-6"><SkeletonCard/><SkeletonCard/></div></PageWrapper>;

  const teamSize = team?.length || 0;
  // This logic is simplified; a real app would fetch exact pending counts from backend
  const pendingApprovals = team?.reduce((sum, member) => sum + (member._count?.goals > 0 ? 1 : 0), 0) || 0;

  const mockActivities = [
    { id: 1, type: 'APPROVAL', content: 'You approved goals for', target: 'John Doe', date: 'Just now', datetime: '2023-01-01' },
    { id: 2, type: 'COMMENT', content: 'You left a comment on', target: 'Sarah Smith', date: '2 hours ago', datetime: '2023-01-01' },
    { id: 3, type: 'EDIT', content: 'Inline edit performed on', target: 'Project Alpha', date: '1 day ago', datetime: '2023-01-01' },
  ];

  const columns = [
    { label: 'Name', key: 'name', render: r => <span className="font-medium text-gray-900 dark:text-[#dae2fd]">{r.name}</span> },
    { label: 'Department', key: 'department', render: r => r.department || 'N/A' },
    { label: 'Total Goals', key: 'goals', render: r => r._count?.goals || 0 },
    { 
      label: 'Actions', 
      key: 'actions',
      render: r => (
        <div className="flex gap-3">
          <Link to={`/manager/approve/${r.id}`} className="text-sm text-indigo-600 dark:text-[#c0c1ff] hover:brightness-125 font-medium">Review Goals</Link>
          <Link to={`/manager/checkin/${r.id}`} className="text-sm text-blue-400 hover:text-blue-300 font-medium">Check-in</Link>
        </div>
      )
    }
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <PageWrapper title={`${getGreeting()}, ${user?.name?.split(' ')[0] || 'Manager'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard label="Team Size" value={teamSize} />
        <StatCard label="Pending Approvals" value={pendingApprovals} sub="Estimated" />
        <StatCard label="Check-ins Completed" value="—" />
        <StatCard label="Overall Team Progress" value="—" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-4 text-lg font-bold text-gray-900 dark:text-[#dae2fd]">My Team</div>
          <DataTable 
            columns={columns} 
            data={team} 
            loading={loading} 
            emptyMessage="You don't have any direct reports."
          />
        </div>
        <div className="lg:col-span-1">
          <div className="mb-4 text-lg font-bold text-gray-900 dark:text-[#dae2fd]">My Recent Activity</div>
          <div className="bg-white dark:bg-[#0b1326] rounded-xl border border-gray-200 dark:border-[#464554] shadow-sm p-6">
            <ActivityTimeline activities={mockActivities} />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
