import React, { useState, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';

export default function TeamsNotificationMock({ message, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for transition
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-20 right-4 z-[60] w-80 bg-[#ffffff] border border-[#e1dfdd] shadow-xl rounded overflow-hidden transition-all duration-300 ease-in-out transform ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
      style={{ fontFamily: '"Segoe UI", system-ui, sans-serif' }}
    >
      <div className="bg-[#464eb8] h-1 w-full" />
      <div className="p-3 flex items-start gap-3">
        <div className="bg-[#e2e2f6] text-[#464eb8] rounded p-2 mt-1">
          <MessageSquare className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-semibold text-[#242424]">Microsoft Teams</h4>
            <span className="text-[10px] text-[#605e5c]">Just now</span>
          </div>
          <p className="text-sm font-semibold text-[#242424] mt-1">Goal Portal Bot</p>
          <p className="text-xs text-[#605e5c] leading-snug mt-0.5">{message}</p>
        </div>
        <button onClick={() => setIsVisible(false)} className="text-[#605e5c] hover:bg-[#f3f2f1] p-1 rounded">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
