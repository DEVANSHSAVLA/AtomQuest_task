import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { NotificationCenter } from './NotificationCenter';
import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  return (
    <header className="bg-white dark:bg-[#0b1326] dark:bg-white dark:bg-[#0b1326] border-b border-gray-200 dark:border-[#464554] dark:border-gray-200 dark:border-[#464554] h-16 flex items-center justify-between px-6 sticky top-0 z-20 transition-colors">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-lg text-gray-500 dark:text-[#c7c4d7] hover:bg-gray-50 dark:bg-[#171f33] dark:hover:bg-gray-700"
          aria-label="Toggle Sidebar"
        >
          ☰
        </button>
        <h1 className="text-xl font-bold text-indigo-600 dark:text-[#c0c1ff] dark:text-indigo-400 hidden md:block">AtomQuest</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-full text-gray-500 dark:text-[#c7c4d7] hover:bg-gray-50 dark:bg-[#171f33] dark:text-gray-500 dark:text-[#c7c4d7] dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <NotificationCenter />
        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 dark:bg-gray-50 dark:bg-[#171f33] mx-2"></div>
        <div className="flex flex-col items-end">
          <span className="text-sm font-semibold text-gray-900 dark:text-[#dae2fd]">{user?.name}</span>
          <span className="text-xs text-gray-500 dark:text-[#c7c4d7]">{user?.role}</span>
        </div>
        <div className="h-8 w-8 rounded-full bg-indigo-600 dark:bg-[#c0c1ff]/20 text-indigo-600 dark:text-[#c0c1ff] flex items-center justify-center font-bold">
          {user?.name?.charAt(0)}
        </div>
        <button 
          onClick={logout}
          className="ml-2 text-sm font-medium text-gray-500 dark:text-[#c7c4d7] hover:text-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
};
