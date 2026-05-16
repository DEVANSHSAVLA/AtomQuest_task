import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  const links = {
    EMPLOYEE: [
      { to: '/employee/dashboard', label: 'Dashboard' },
      { to: '/employee/goals', label: 'My Goals' },
      { to: '/employee/achievement', label: 'Achievement Entry' },
    ],
    MANAGER: [
      { to: '/manager/dashboard', label: 'Team Dashboard' },
      { to: '/manager/effectiveness', label: 'Effectiveness' },
    ],
    ADMIN: [
      { to: '/admin/dashboard', label: 'Admin Dashboard' },
      { to: '/admin/cycles', label: 'Cycle Manager' },
      { to: '/admin/reports', label: 'Reports' },
      { to: '/admin/audit', label: 'Audit Log' },
      { to: '/admin/analytics', label: 'Analytics' },
      { to: '/admin/escalations', label: 'Escalation Log' },
      { to: '/admin/escalation-dashboard', label: 'Escalation Dashboard' },
      { to: '/admin/departments', label: 'Dept. Comparison' },
      { to: '/admin/dependencies', label: 'Goal Dependencies' },
    ]
  };

  const roleLinks = links[user?.role] || [];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-30 md:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40
        w-64 bg-white dark:bg-[#0b1326] border-r border-gray-200 dark:border-[#464554] flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-[#464554] md:hidden">
          <h1 className="text-xl font-bold text-indigo-600 dark:text-[#c0c1ff]">AtomQuest</h1>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          <div className="text-xs font-semibold text-gray-500 dark:text-[#c7c4d7] uppercase tracking-wider mb-4 px-2">
            Menu
          </div>
          {roleLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => { if(window.innerWidth < 768) onClose(); }}
              className={({ isActive }) => `
                flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${isActive 
                  ? 'bg-indigo-50 dark:bg-[#c0c1ff]/10 text-indigo-600 dark:text-[#c0c1ff] font-semibold' 
                  : 'text-gray-600 dark:text-[#c7c4d7] hover:bg-gray-50 dark:hover:bg-[#171f33] hover:text-gray-900 dark:hover:text-[#dae2fd]'
                }
              `}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-[#464554]">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="h-8 w-8 rounded-full bg-indigo-600 dark:bg-[#c0c1ff]/20 flex items-center justify-center text-indigo-600 dark:text-[#c0c1ff] font-bold">
              {user?.name?.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900 dark:text-[#dae2fd] truncate">{user?.name}</span>
              <span className="text-xs text-gray-500 dark:text-[#c7c4d7] truncate">{user?.email}</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
