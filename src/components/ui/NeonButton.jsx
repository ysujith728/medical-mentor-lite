import React from 'react';

const NeonButton = ({ children, onClick, className = '' }) => {
  return (
    <button 
      onClick={onClick}
      className={`relative group overflow-hidden px-8 py-3 rounded-full font-semibold text-sm border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 ${className}`}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default NeonButton;
