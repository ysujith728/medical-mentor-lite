import React from 'react';
import { NavLink } from 'react-router-dom';
import { Bell, Settings } from 'lucide-react';

const TopNavBar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 lg:px-8 h-16 bg-white/80 backdrop-blur-xl border-b border-gray-200 font-inter">
      <div className="flex items-center gap-8">
        <NavLink to="/">
          <span className="text-lg font-semibold tracking-tight text-gray-900">✦ Medix AI</span>
        </NavLink>
        <div className="hidden md:flex gap-6 items-center">
          <NavLink to="/dashboard" className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-gray-900 border-b-2 border-gray-900 pb-0.5' : 'text-gray-500 hover:text-gray-900'}`}>Dashboard</NavLink>
          <NavLink to="/terminology" className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-gray-900 border-b-2 border-gray-900 pb-0.5' : 'text-gray-500 hover:text-gray-900'}`}>Study Library</NavLink>
          <NavLink to="/quiz" className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-gray-900 border-b-2 border-gray-900 pb-0.5' : 'text-gray-500 hover:text-gray-900'}`}>Practice Exams</NavLink>
          <NavLink to="/anatomy" className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-gray-900 border-b-2 border-gray-900 pb-0.5' : 'text-gray-500 hover:text-gray-900'}`}>Visualizer</NavLink>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all rounded-lg hidden md:flex">
          <Bell className="w-4 h-4" />
        </button>
        <button className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all rounded-lg hidden md:flex">
          <Settings className="w-4 h-4" />
        </button>
        <button className="px-5 py-2 bg-gray-900 text-white font-medium text-sm rounded-full hover:bg-gray-800 transition-colors whitespace-nowrap">
          Go Pro
        </button>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 hover:border-gray-400 transition-colors cursor-pointer shrink-0">
          <img alt="User Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBc1KrY3hAzs_b3mzGZkIzfzajdRzqAwyBk7b4QN7QmFTzfWyf7022-UjIx-ESAbie6iLUdWeK8xqKYZ-O4rkxzX_fazXz7rDV1E-tcBOq3RWgLgroK7ttKkFLA_Dki6uESzgYqFdHmy6yCyZiwDspQlEbGiX5gUoYb3WAQqX4Ce4vgczdtoQcaRgRwtHYldy5qr6MLeKizq_v6FmJENfhI9iQozpmU5KaewI-Q_wn04vlOv--wO7-w_j5sLRS4SC1VbZGjXlwq5xYm"/>
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
