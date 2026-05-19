import React from 'react';

const GlassCard = ({ children, className = '', hoverEffect = true }) => {
  return (
    <div className={`
      bg-white border border-gray-200 rounded-2xl p-6 shadow-sm
      ${hoverEffect ? 'hover:shadow-md hover:border-gray-300 transition-all duration-300' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

export default GlassCard;
