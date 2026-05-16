import { forwardRef } from 'react';

export const FormField = forwardRef(({ label, error, className = '', ...props }, ref) => {
  const id = props.id || props.name;
  
  return (
    <div className={`flex flex-col space-y-1.5 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium text-gray-900 dark:text-[#dae2fd]">
        {label}
      </label>
      {props.type === 'textarea' ? (
        <textarea
          ref={ref}
          id={id}
          {...props}
          className={`px-3 py-2 border rounded-lg shadow-sm outline-none transition-colors focus:ring-2 focus:ring-indigo-500 dark:focus:ring-[#c0c1ff] focus:border-indigo-500 dark:focus:border-[#c0c1ff] ${
            error ? 'border-red-300 bg-red-50' : 'border-gray-200 dark:border-[#464554] hover:border-gray-200 dark:border-[#464554]'
          }`}
        />
      ) : props.type === 'select' ? (
        <select
          ref={ref}
          id={id}
          {...props}
          className={`px-3 py-2 border rounded-lg shadow-sm outline-none transition-colors focus:ring-2 focus:ring-indigo-500 dark:focus:ring-[#c0c1ff] focus:border-indigo-500 dark:focus:border-[#c0c1ff] ${
            error ? 'border-red-300 bg-red-50' : 'border-gray-200 dark:border-[#464554] hover:border-gray-200 dark:border-[#464554]'
          }`}
        >
          {props.children}
        </select>
      ) : (
        <input
          ref={ref}
          id={id}
          {...props}
          className={`px-3 py-2 border rounded-lg shadow-sm outline-none transition-colors focus:ring-2 focus:ring-indigo-500 dark:focus:ring-[#c0c1ff] focus:border-indigo-500 dark:focus:border-[#c0c1ff] ${
            error ? 'border-red-300 bg-red-50' : 'border-gray-200 dark:border-[#464554] hover:border-gray-200 dark:border-[#464554]'
          }`}
        />
      )}
      {error && (
        <span className="text-xs text-red-500" aria-describedby={id}>
          {error.message}
        </span>
      )}
    </div>
  );
});

FormField.displayName = 'FormField';
