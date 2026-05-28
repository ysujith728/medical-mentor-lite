import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/apiService';
import { Loader2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const AdminAiAnalytics = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['admin-ai-analytics'],
    queryFn: async () => {
      const res = await api.get('/admin/ai-analytics');
      return res.data;
    }
  });

  if (isLoading) {
    return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>;
  }

  if (error) {
    return <div className="p-4 text-red-500 bg-red-50 rounded-lg">Error loading AI analytics.</div>;
  }

  // Format data for charts
  const usageData = data.usageByDate?.map(d => ({
    date: new Date(d.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    tokens: Number(d.tokens)
  })).reverse() || [];

  const promptData = data.promptStats?.map(p => ({
    name: p.promptType,
    count: p._count.promptType
  })) || [];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">AI Token Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Token Burn Rate Chart */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 h-[400px]">
          <h3 className="text-lg font-semibold mb-6">Token Burn Rate (30 Days)</h3>
          {usageData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={usageData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="tokens" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorTokens)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
             <div className="h-full flex items-center justify-center text-slate-500">No usage data yet</div>
          )}
        </div>

        {/* Prompt Types Chart */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 h-[400px]">
          <h3 className="text-lg font-semibold mb-6">Prompt Types Distribution</h3>
          {promptData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={promptData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-500">No prompt data yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAiAnalytics;
