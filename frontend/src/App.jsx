import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { GlobalSearch } from './components/layout/GlobalSearch';
import RoleSwitcher from './components/RoleSwitcher';
import CommandPalette from './components/CommandPalette';
import TeamsNotificationMock from './components/TeamsNotificationMock';
import AICopilot from './components/AICopilot';
import SessionExpiryModal from './components/ui/SessionExpiryModal';

import { Suspense, lazy, useEffect } from 'react';
import ErrorBoundary from './components/ErrorBoundary';

// Pages - Lazy Loaded
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));
const EmployeeDashboard = lazy(() => import('./pages/employee/EmployeeDashboard'));
const GoalForm = lazy(() => import('./pages/employee/GoalForm'));
const AchievementEntry = lazy(() => import('./pages/employee/AchievementEntry'));
const ManagerDashboard = lazy(() => import('./pages/manager/ManagerDashboard'));
const GoalApproval = lazy(() => import('./pages/manager/GoalApproval'));
const CheckinView = lazy(() => import('./pages/manager/CheckinView'));
const ManagerEffectiveness = lazy(() => import('./pages/manager/ManagerEffectiveness'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const CycleManager = lazy(() => import('./pages/admin/CycleManager'));
const ReportView = lazy(() => import('./pages/admin/ReportView'));
const AuditLog = lazy(() => import('./pages/admin/AuditLog'));
const Analytics = lazy(() => import('./pages/admin/Analytics'));
const EscalationLog = lazy(() => import('./pages/admin/EscalationLog'));
const EscalationDashboard = lazy(() => import('./pages/admin/EscalationDashboard'));
const DepartmentComparison = lazy(() => import('./pages/admin/DepartmentComparison'));
const GoalDependencyGraph = lazy(() => import('./pages/admin/GoalDependencyGraph'));

const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) {
    if (user.role === 'EMPLOYEE') return <Navigate to="/employee/dashboard" replace />;
    if (user.role === 'MANAGER') return <Navigate to="/manager/dashboard" replace />;
    if (user.role === 'ADMIN') return <Navigate to="/admin/dashboard" replace />;
  }
  
  return children;
};

const AppLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#0B1020] overflow-hidden w-full transition-colors duration-300">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {!isOnline && (
          <div className="bg-red-600 text-white text-center py-2 text-sm font-medium z-50 animate-pulse">
            ⚠️ You are currently offline. Reconnecting... Pending changes are preserved.
          </div>
        )}
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto">
          <ErrorBoundary>
            <Suspense fallback={<div className="h-full flex items-center justify-center p-8"><div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-64 w-full rounded-xl"></div></div>}>
              {children}
            </Suspense>
          </ErrorBoundary>
        </main>
        <RoleSwitcher />
        <CommandPalette />
        <GlobalSearch />
        <AICopilot />
        <SessionExpiryModal />
      </div>
    </div>
  );
};

export default function App() {
  const [teamsMessage, setTeamsMessage] = useState(null);

  useEffect(() => {
    const handleTeamsNotify = (e) => setTeamsMessage(e.detail);
    window.addEventListener('teams-notify', handleTeamsNotify);
    return () => window.removeEventListener('teams-notify', handleTeamsNotify);
  }, []);

  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
      {teamsMessage && <TeamsNotificationMock message={teamsMessage} onClose={() => setTeamsMessage(null)} />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        
        {/* Employee Routes */}
        <Route path="/employee/*" element={
          <PrivateRoute role="EMPLOYEE">
            <AppLayout>
              <Routes>
                <Route path="dashboard" element={<EmployeeDashboard />} />
                <Route path="goals" element={<GoalForm />} />
                <Route path="achievement" element={<AchievementEntry />} />
              </Routes>
            </AppLayout>
          </PrivateRoute>
        } />

        {/* Manager Routes */}
        <Route path="/manager/*" element={
          <PrivateRoute role="MANAGER">
            <AppLayout>
              <Routes>
                <Route path="dashboard" element={<ManagerDashboard />} />
                <Route path="approve/:userId" element={<GoalApproval />} />
                <Route path="checkin/:userId" element={<CheckinView />} />
                <Route path="effectiveness" element={<ManagerEffectiveness />} />
              </Routes>
            </AppLayout>
          </PrivateRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin/*" element={
          <PrivateRoute role="ADMIN">
            <AppLayout>
              <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="cycles" element={<CycleManager />} />
                <Route path="reports" element={<ReportView />} />
                <Route path="audit" element={<AuditLog />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="escalations" element={<EscalationLog />} />
                <Route path="escalation-dashboard" element={<EscalationDashboard />} />
                <Route path="departments" element={<DepartmentComparison />} />
                <Route path="dependencies" element={<GoalDependencyGraph />} />
              </Routes>
            </AppLayout>
          </PrivateRoute>
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
