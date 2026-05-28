import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/apiService';
import { Loader2, TrendingUp } from 'lucide-react';

const AdminSearchAnalytics = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['admin-search-analytics'],
    queryFn: async () => {
      const res = await api.get('/admin/search-analytics');
      return res.data;
    }
  });

  if (isLoading) {
    return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>;
  }

  if (error) {
    return <div className="p-4 text-red-500 bg-red-50 rounded-lg">Error loading search analytics.</div>;
  }

  const trending = data?.trending || [];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Search Analytics</h2>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-indigo-500" />
          <h3 className="text-lg font-semibold">Top Trending Medical Terms</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trending.map((item, index) => (
            <div 
              key={item.searchTerm} 
              className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-700/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <span className="font-medium text-slate-900 dark:text-white truncate max-w-[150px]" title={item.searchTerm}>
                  {item.searchTerm}
                </span>
              </div>
              <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                {item._count.searchTerm}
              </div>
            </div>
          ))}
          {trending.length === 0 && (
            <div className="col-span-full py-8 text-center text-slate-500">
              No search data recorded yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSearchAnalytics;
