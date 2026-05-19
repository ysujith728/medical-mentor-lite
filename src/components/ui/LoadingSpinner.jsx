import React from 'react';

/**
 * A reusable loading spinner using the Nexora light theme.
 */
const LoadingSpinner = ({ size = 'md', color = 'indigo', message = 'Processing...' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 border-2',
    md: 'w-16 h-16 border-4',
    lg: 'w-24 h-24 border-[6px]'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className={`${sizeClasses[size]} border-indigo-500 border-t-transparent rounded-full animate-spin`}></div>
      {message && <h2 className="font-inter text-lg font-medium text-gray-700 animate-pulse">{message}</h2>}
    </div>
  );
};

export default LoadingSpinner;
