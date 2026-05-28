import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { ShieldCheck, Users, Activity, Search, LayoutDashboard, Settings, BrainCircuit } from 'lucide-react';
import useAppStore from '../store/useAppStore';

const AdminLayout = () => {
  const { darkMode } = useAppStore();

  const navItems = [
    { name: 'Overview', path: '/admin/overview', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'User Management', path: '/admin/users', icon: <Users className="w-5 h-5" /> },
    { name: 'AI Analytics', path: '/admin/ai-analytics', icon: <BrainCircuit className="w-5 h-5" /> },
    { name: 'Search Logs', path: '/admin/search-analytics', icon: <Search className="w-5 h-5" /> },
    { name: 'System Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className={`min-h-screen flex ${darkMode ? 'dark bg-gray-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
          <ShieldCheck className="w-6 h-6 text-indigo-600 mr-2" />
          <span className="font-bold text-lg tracking-tight">Admin Portal</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <NavLink to="/dashboard" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            &larr; Back to App
          </NavLink>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 shrink-0">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
              <Activity className="w-3 h-3" /> Live
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>

    </div>
  );
};

export default AdminLayout;
