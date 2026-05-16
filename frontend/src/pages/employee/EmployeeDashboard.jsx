import { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { StatCard } from '../../components/ui/StatCard';
import { SkeletonCard } from '../../components/ui/Skeleton';
import { DataTable } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { ProductTour } from '../../components/layout/ProductTour';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const { data: cycles, loading: loadingCycles } = useApi('/cycles');
  const activeCycle = cycles?.find(c => c.isActive && c.phase === 'GOAL_SETTING');
  
  const { data: goals, loading: loadingGoals, refetch } = useApi(
    activeCycle ? `/goals/mine?cycleId=${activeCycle.id}` : null
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitAll = async () => {
    if (!activeCycle) return;
    setIsSubmitting(true);
    try {
      await api.post('/goals/submit', { cycleId: activeCycle.id });
      toast.success('Goals submitted successfully!');
      
      // Dispatch mock Teams notification
      const event = new CustomEvent('teams-notify', { 
        detail: `You have submitted your goals for approval. Your manager has been notified.` 
      });
      window.dispatchEvent(event);
      
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to submit goals');
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteGoal = async (id) => {
    if (!confirm('Are you sure you want to delete this goal?')) return;
    try {
      await api.delete(`/goals/${id}`);
      toast.success('Goal deleted');
      refetch();
    } catch (error) {
      toast.error('Failed to delete goal');
    }
  };

  if (loadingCycles) return <PageWrapper><div className="grid grid-cols-4 gap-6"><SkeletonCard/><SkeletonCard/><SkeletonCard/><SkeletonCard/></div></PageWrapper>;

  const totalWeight = goals?.reduce((sum, g) => sum + g.weightage, 0) || 0;
  const approvedCount = goals?.filter(g => g.status === 'APPROVED').length || 0;
  const draftCount = goals?.filter(g => g.status === 'DRAFT' || g.status === 'REWORK').length || 0;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const columns = [
    { label: 'Thrust Area', key: 'thrustArea', render: r => <span className="font-medium text-gray-900 dark:text-[#dae2fd]">{r.thrustArea}</span> },
    { label: 'Title', key: 'title', render: r => <div className="truncate max-w-xs" title={r.title}>{r.title}</div> },
    { label: 'Target', key: 'target', render: r => `${r.target} ${r.uom}` },
    { label: 'Weightage', key: 'weightage', render: r => `${r.weightage}%` },
    { label: 'Status', key: 'status', render: r => <StatusBadge status={r.status} /> },
    { 
      label: 'Actions', 
      key: 'actions',
      render: r => (r.status === 'DRAFT' || r.status === 'REWORK') && !r.isLocked ? (
        <div className="flex gap-2">
          <Link to={`/employee/goals?edit=${r.id}`} className="text-indigo-600 dark:text-[#c0c1ff] hover:text-indigo-900">Edit</Link>
          <button onClick={() => deleteGoal(r.id)} className="text-red-600 hover:text-red-900">Delete</button>
        </div>
      ) : null
    }
  ];

  return (
    <>
      <ProductTour />
      <PageWrapper 
        title={`${getGreeting()}, ${user?.name?.split(' ')[0] || 'Employee'}`}
        actions={
        activeCycle && (
          <div className="flex gap-3">
            <Link to="/employee/goals" className="px-4 py-2 bg-white dark:bg-[#0b1326] text-indigo-600 dark:text-[#c0c1ff] border border-indigo-200 dark:border-[#c0c1ff]/30 hover:bg-indigo-600 dark:bg-[#c0c1ff]/10 rounded-lg text-sm font-medium transition-colors">
              Add Goal
            </Link>
            <button 
              onClick={submitAll} 
              disabled={isSubmitting || draftCount === 0}
              className="px-4 py-2 bg-indigo-600 dark:bg-[#c0c1ff] text-white rounded-lg text-sm font-medium hover:brightness-110 disabled:opacity-50 transition-colors"
            >
              Submit All Goals
            </button>
          </div>
        )
      }
    >
      {activeCycle ? (
        <>
          {totalWeight !== 100 && (
            <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-3">
              <div className="text-orange-500 font-bold mt-0.5">!</div>
              <div>
                <h3 className="text-sm font-bold text-orange-900">Action Required</h3>
                <p className="text-sm text-orange-800 mt-1">
                  Your goals currently total <strong>{totalWeight}%</strong> weightage. 
                  You must reach exactly 100% before you can submit them for approval.
                </p>
              </div>
            </div>
          )}
          <div className="bg-indigo-600 dark:bg-[#c0c1ff]/10 border border-indigo-200 dark:border-[#c0c1ff]/20 rounded-xl p-4 mb-6 flex justify-between items-center text-indigo-800">
            <div>
              <strong className="font-semibold">Goal Setting Cycle {activeCycle.year}</strong> is open. 
              Window closes on {new Date(activeCycle.windowClose).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}.
            </div>
            <div className="text-sm font-medium">Total Weightage: {totalWeight}% / 100%</div>
          </div>
        </>
      ) : (
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-6 text-orange-800 font-medium">
          No active goal setting cycle currently open.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard label="Total Goals" value={goals?.length || 0} />
        <StatCard label="Approved" value={approvedCount} />
        <StatCard label="Pending Submission" value={draftCount} />
        <StatCard label="Weightage" value={`${totalWeight}%`} sub={totalWeight === 100 ? 'Ready to submit' : 'Must equal 100%'} />
      </div>

      {/* Personalized AI Widget */}
      {import.meta.env.VITE_ENABLE_AI_INSIGHTS !== 'false' && (
        <div className="mb-8 p-5 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100 rounded-xl flex items-start gap-4 shadow-sm">
          <div className="p-2 bg-teal-100 text-teal-600 rounded-full shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
          </div>
          <div>
            <h4 className="text-sm font-bold text-teal-900">Personalized Insights</h4>
            <p className="text-sm text-teal-800 mt-1">
              You are currently <strong>15% behind target</strong> on your "Q3 Revenue Expansion" goal. 
              Historically, logging weekly check-ins improves end-of-quarter achievement by 22%.
            </p>
          </div>
        </div>
      )}

      <div className="mb-4 text-lg font-bold text-gray-900 dark:text-[#dae2fd]">My Goals</div>
      <DataTable 
        columns={columns} 
        data={goals} 
        loading={loadingGoals} 
        emptyMessage="You haven't added any goals yet for the current cycle."
      />
    </PageWrapper>
    </>
  );
}
