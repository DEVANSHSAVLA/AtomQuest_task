import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, Shield, User, Loader2 } from 'lucide-react';

export default function RoleSwitcher() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(null);

  const switchRole = async (email, role) => {
    try {
      setLoading(role);
      await login(email, 'password123');
      // Navigation is handled by AuthContext upon successful login
    } catch (err) {
      console.error('Failed to switch role', err);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2 items-center">
      <div className="bg-white dark:bg-[#0b1326] dark:bg-white dark:bg-[#0b1326] px-3 py-2 rounded-l-full shadow-lg border border-gray-200 dark:border-[#464554] dark:border-gray-200 dark:border-[#464554] flex items-center gap-2 font-mono text-xs text-gray-500 dark:text-[#c7c4d7] dark:text-gray-500 dark:text-[#c7c4d7] mr-2">
        Demo Mode
      </div>
      <button
        onClick={() => switchRole('john.doe@atomquest.com', 'EMPLOYEE')}
        disabled={loading !== null}
        className="bg-indigo-600 dark:bg-[#c0c1ff] hover:brightness-110 text-white rounded-full p-3 shadow-lg transition-transform hover:scale-110 flex items-center justify-center group relative disabled:opacity-50"
        title="Switch to Employee (John)"
      >
        {loading === 'EMPLOYEE' ? <Loader2 className="w-5 h-5 animate-spin" /> : <User className="w-5 h-5" />}
        <span className="absolute -top-8 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">
          Employee
        </span>
      </button>

      <button
        onClick={() => switchRole('sarah.manager@atomquest.com', 'MANAGER')}
        disabled={loading !== null}
        className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-3 shadow-lg transition-transform hover:scale-110 flex items-center justify-center group relative disabled:opacity-50"
        title="Switch to Manager (Sarah)"
      >
        {loading === 'MANAGER' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Users className="w-5 h-5" />}
        <span className="absolute -top-8 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">
          Manager
        </span>
      </button>

      <button
        onClick={() => switchRole('admin@atomquest.com', 'ADMIN')}
        disabled={loading !== null}
        className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3 shadow-lg transition-transform hover:scale-110 flex items-center justify-center group relative disabled:opacity-50"
        title="Switch to Admin"
      >
        {loading === 'ADMIN' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Shield className="w-5 h-5" />}
        <span className="absolute -top-8 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">
          Admin
        </span>
      </button>
    </div>
  );
}
