import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Monitor, User, Users, Shield, Target, FileText, Settings, X } from 'lucide-react';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const actions = [
    { id: 1, label: 'Employee Dashboard', icon: User, path: '/employee/dashboard' },
    { id: 2, label: 'Submit Goals', icon: Target, path: '/employee/goals' },
    { id: 3, label: 'Log Achievement', icon: FileText, path: '/employee/achievement' },
    { id: 4, label: 'Manager Dashboard', icon: Users, path: '/manager/dashboard' },
    { id: 5, label: 'Admin Dashboard', icon: Shield, path: '/admin/dashboard' },
    { id: 6, label: 'Manage Cycles', icon: Settings, path: '/admin/cycles' },
    { id: 7, label: 'Export Reports', icon: Monitor, path: '/admin/reports' },
    { id: 8, label: 'View Analytics Heatmap', icon: Monitor, path: '/admin/analytics' },
    { id: 9, label: 'System Audit Log', icon: Shield, path: '/admin/audit' },
  ];

  const filteredActions = actions.filter((action) =>
    action.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-gray-900/50 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-white dark:bg-[#0b1326] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-[#464554]">
          <Search className="w-5 h-5 text-gray-500 dark:text-[#c7c4d7] mr-3" />
          <input
            autoFocus
            type="text"
            className="flex-1 text-lg outline-none bg-transparent placeholder-gray-400 text-gray-900 dark:text-[#dae2fd]"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={() => setIsOpen(false)} className="text-gray-500 dark:text-[#c7c4d7] hover:text-gray-500 dark:text-[#c7c4d7]">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto p-2">
          {filteredActions.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-[#c7c4d7]">No results found.</div>
          ) : (
            filteredActions.map((action) => (
              <button
                key={action.id}
                className="w-full flex items-center px-4 py-3 hover:bg-indigo-600 dark:bg-[#c0c1ff]/10 rounded-lg text-left group transition-colors"
                onClick={() => {
                  navigate(action.path);
                  setIsOpen(false);
                }}
              >
                <action.icon className="w-5 h-5 text-gray-500 dark:text-[#c7c4d7] group-hover:text-indigo-600 dark:text-[#c0c1ff] mr-3" />
                <span className="text-gray-900 dark:text-[#dae2fd] group-hover:text-indigo-900 font-medium">
                  {action.label}
                </span>
                <span className="ml-auto text-xs text-gray-500 dark:text-[#c7c4d7] group-hover:text-indigo-400">
                  Jump to
                </span>
              </button>
            ))
          )}
        </div>
        <div className="px-4 py-3 bg-gray-50 dark:bg-[#171f33] border-t border-gray-200 dark:border-[#464554]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-[#c7c4d7] uppercase tracking-wider">Keyboard Shortcuts</span>
            <span className="font-mono text-[10px] bg-white dark:bg-[#0b1326] px-1.5 py-0.5 rounded border text-gray-500 dark:text-[#c7c4d7]">esc to close</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-[#c7c4d7]">
            <div className="flex justify-between"><span>Command Palette</span> <kbd className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">Ctrl+K</kbd></div>
            <div className="flex justify-between"><span>Focus Search</span> <kbd className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">/</kbd></div>
            <div className="flex justify-between"><span>Save Changes</span> <kbd className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">Ctrl+S</kbd></div>
            <div className="flex justify-between"><span>Cancel/Back</span> <kbd className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">Esc</kbd></div>
          </div>
        </div>
      </div>
    </div>
  );
}
