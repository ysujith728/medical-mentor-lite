import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/apiService';
import { Users, Activity, BrainCircuit, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminOverview = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['admin-overview'],
    queryFn: async () => {
      const res = await api.get('/admin/overview');
      return res.data;
    },
    refetchInterval: 10000 // Poll every 10s
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        Failed to load admin metrics. Ensure you have admin privileges.
      </div>
    );
  }

  const kpis = [
    { label: 'Total Users', value: data.totalUsers, icon: <Users className="w-5 h-5" />, color: 'bg-blue-500' },
    { label: 'Active (7d)', value: data.activeUsers, icon: <Activity className="w-5 h-5" />, color: 'bg-green-500' },
    { label: 'AI Tokens Used', value: (data.totalTokens / 1000).toFixed(1) + 'k', icon: <BrainCircuit className="w-5 h-5" />, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Platform Overview</h2>
      
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((kpi, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={kpi.label} 
            className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4"
          >
            <div className={`w-12 h-12 ${kpi.color} bg-opacity-10 rounded-xl flex items-center justify-center text-${kpi.color.replace('bg-', '')}`}>
              {kpi.icon}
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{kpi.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{kpi.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Details Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <h3 className="text-lg font-semibold mb-4">Top Searched Terms</h3>
          <div className="space-y-3">
            {data.topSearches?.map((search, i) => (
              <div key={i} className="flex justify-between items-center p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
                <span className="font-medium text-indigo-600 dark:text-indigo-400">{search.searchTerm}</span>
                <span className="text-sm text-slate-500 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded-md">{search._count.searchTerm} searches</span>
              </div>
            ))}
            {(!data.topSearches || data.topSearches.length === 0) && (
              <div className="text-center text-slate-500 py-4">No search data yet</div>
            )}
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <h3 className="text-lg font-semibold mb-4">System Health</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500">Average AI Latency</span>
                <span className="font-medium">{Math.round(data.avgLatency)} ms</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${Math.min(100, (data.avgLatency / 2000) * 100)}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
