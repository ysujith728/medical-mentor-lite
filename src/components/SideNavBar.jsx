import React from 'react';
import { NavLink } from 'react-router-dom';
import useAppStore from '../store/useAppStore';

const SideNavBar = () => {
  const { moduleActive } = useAppStore();

  return (
    <aside className="fixed h-screen w-60 left-0 top-0 pt-20 bg-white border-r border-gray-200 flex flex-col gap-1 p-4 z-40 hidden lg:flex font-inter">
      <div className="mb-6 px-3">
        <h3 className="text-[10px] uppercase tracking-widest font-semibold text-indigo-600">Medical Hub</h3>
        <p className="text-gray-400 text-xs mt-0.5">Active: {moduleActive}</p>
      </div>
      
      <div className="space-y-0.5">
        <NavLink to="/dashboard" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer text-sm ${isActive ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}>
          <span className="material-symbols-outlined text-xl">psychology</span>
          <span>Neural Map</span>
        </NavLink>
        <NavLink to="/anatomy" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer text-sm ${isActive ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}>
           <span className="material-symbols-outlined text-xl">body_system</span>
           <span>Anatomy</span>
        </NavLink>
        <NavLink to="/terminology" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer text-sm ${isActive ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}>
          <span className="material-symbols-outlined text-xl">pill</span>
          <span>Pharmacology</span>
        </NavLink>
        <NavLink to="/quiz" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer text-sm ${isActive ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}>
          <span className="material-symbols-outlined text-xl">biotech</span>
          <span>Diagnostics</span>
        </NavLink>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-all duration-200 cursor-pointer text-sm">
          <span className="material-symbols-outlined text-xl">history</span>
          <span>History</span>
        </div>
      </div>

      <div className="mt-auto border-t border-gray-200 pt-4 space-y-1">
        <button className="w-full bg-gray-900 text-white py-2.5 rounded-full font-medium text-sm mb-3 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
          <span className="material-symbols-outlined text-sm">add</span>
          New Simulation
        </button>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 cursor-pointer text-sm">
          <span className="material-symbols-outlined text-xl">help_outline</span>
          <span>Help Center</span>
        </div>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-rose-400 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer text-sm">
          <span className="material-symbols-outlined text-xl">logout</span>
          <span>Sign Out</span>
        </div>
      </div>
    </aside>
  );
};

export default SideNavBar;
