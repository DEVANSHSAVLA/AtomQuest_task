import { useState, useEffect } from 'react';
import { Bell, X, CheckCircle, AlertTriangle, MessageSquare } from 'lucide-react';
import io from 'socket.io-client';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    
    // Connect to Socket.io backend
    const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000', {
      auth: { token: localStorage.getItem('token') },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      autoConnect: true,
    });

    socket.on('connect', () => {
      console.log('Connected to real-time notification layer');
    });

    socket.on('notification', (data) => {
      setNotifications(prev => [data, ...prev].slice(0, 50)); // Keep last 50
      setUnreadCount(prev => prev + 1);
      
      // Also show a toast for high wow-factor
      toast.custom((t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white dark:bg-[#0b1326] shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-gray-200 dark:ring-[#464554]`}>
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                {data.type === 'APPROVAL' && <CheckCircle className="h-10 w-10 text-green-500" />}
                {data.type === 'ESCALATION' && <AlertTriangle className="h-10 w-10 text-red-500" />}
                {data.type === 'COMMENT' && <MessageSquare className="h-10 w-10 text-blue-500" />}
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-[#dae2fd]">{data.title}</p>
                <p className="mt-1 text-sm text-gray-500 dark:text-[#c7c4d7]">{data.message}</p>
              </div>
            </div>
          </div>
        </div>
      ));
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  const markAllRead = () => setUnreadCount(0);

  return (
    <div className="relative">
      <button 
        onClick={() => { setIsOpen(!isOpen); markAllRead(); }}
        className="relative p-2 text-gray-500 dark:text-[#c7c4d7] hover:text-gray-500 dark:text-[#c7c4d7] focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-[#c0c1ff] rounded-full"
      >
        <span className="sr-only">View notifications</span>
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)}></div>
          <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-xl shadow-lg bg-white dark:bg-[#0b1326] ring-1 ring-gray-200 dark:ring-[#464554] z-40 overflow-hidden flex flex-col max-h-96">
            <div className="px-4 py-3 border-b border-gray-200 dark:border-[#464554] flex justify-between items-center bg-gray-50 dark:bg-[#171f33]">
              <h3 className="text-sm font-bold text-gray-900 dark:text-[#dae2fd]">Enterprise Notifications</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 dark:text-[#c7c4d7] hover:text-gray-500 dark:text-[#c7c4d7]">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-sm text-gray-500 dark:text-[#c7c4d7]">
                  You're all caught up.
                </div>
              ) : (
                <div className="divide-y divide-gray-100 dark:divide-[#464554]">
                  {notifications.map((n, i) => (
                    <div key={i} className="p-4 hover:bg-gray-50 dark:bg-[#171f33] transition-colors cursor-pointer">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                           {n.type === 'APPROVAL' && <CheckCircle className="h-5 w-5 text-green-500" />}
                           {n.type === 'ESCALATION' && <AlertTriangle className="h-5 w-5 text-red-500" />}
                           {n.type === 'COMMENT' && <MessageSquare className="h-5 w-5 text-blue-500" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-[#dae2fd]">{n.title}</p>
                          <p className="text-xs text-gray-500 dark:text-[#c7c4d7] mt-0.5 line-clamp-2">{n.message}</p>
                          <p className="text-[10px] text-gray-500 dark:text-[#c7c4d7] mt-1">{new Date(n.timestamp || Date.now()).toLocaleTimeString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
