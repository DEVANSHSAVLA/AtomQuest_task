import { useEffect } from 'react';

export const Modal = ({ isOpen, onClose, title, children, hideCloseButton }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm"
      onClick={hideCloseButton ? undefined : onClose}
    >
      <div 
        className="bg-white dark:bg-[#0b1326] rounded-2xl shadow-xl w-full max-w-md mx-auto overflow-hidden animate-in fade-in zoom-in duration-200" 
        onClick={e => e.stopPropagation()}
      >
        {title && (
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-[#464554]">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-[#dae2fd]">{title}</h3>
            {!hideCloseButton && (
              <button 
                onClick={onClose}
                className="text-gray-500 dark:text-[#c7c4d7] hover:text-gray-500 dark:text-[#c7c4d7] transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            )}
          </div>
        )}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};
