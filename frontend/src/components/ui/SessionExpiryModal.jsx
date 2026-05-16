import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { Modal } from './Modal';

export default function SessionExpiryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleExpiry = () => setIsOpen(true);
    window.addEventListener('session-expired', handleExpiry);
    return () => window.removeEventListener('session-expired', handleExpiry);
  }, []);

  const handleLogin = () => {
    setIsOpen(false);
    navigate('/login');
    window.location.reload();
  };

  return (
    <Modal isOpen={isOpen} onClose={() => {}} title="" hideCloseButton>
      <div className="text-center py-4">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
          <AlertTriangle className="h-8 w-8 text-red-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-[#dae2fd] mb-2">Session Expired</h3>
        <p className="text-gray-500 dark:text-[#c7c4d7] mb-8">
          Your secure session has expired due to inactivity or invalid credentials. Please log in again to continue.
        </p>
        <button
          onClick={handleLogin}
          className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-3 bg-indigo-600 dark:bg-[#c0c1ff] text-base font-medium text-white hover:brightness-110 sm:text-sm transition-colors"
        >
          Log In Again
        </button>
      </div>
    </Modal>
  );
}
