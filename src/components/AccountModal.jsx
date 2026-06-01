import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, User as UserIcon, Shield, Zap, Flame, X, Key, Loader2, ArrowRight } from 'lucide-react';
import useAppStore from '../store/useAppStore';
import useAuthStore from '../store/useAuthStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchProfile } from '../services/dashboardService';
import api from '../services/apiService';
import { useNavigate } from 'react-router-dom';

const AccountModal = () => {
  const { isAccountModalOpen, setAccountModalOpen } = useAppStore();
  const { user, signOut } = useAuthStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [inviteCode, setInviteCode] = useState('');
  const [upgradeLoading, setUpgradeLoading] = useState(false);
  const [upgradeError, setUpgradeError] = useState('');

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
    enabled: isAccountModalOpen, // Only fetch when open if not already cached
    staleTime: 60000,
  });

  const handleSignOut = async () => {
    setAccountModalOpen(false);
    await signOut();
    window.location.href = '/login';
  };

  const handleUpgrade = async (e) => {
    e.preventDefault();
    if (!inviteCode) return;
    
    setUpgradeLoading(true);
    setUpgradeError('');
    try {
      await api.post('/auth/promote-admin', { inviteCode });
      await queryClient.invalidateQueries({ queryKey: ['profile'] });
      setInviteCode('');
    } catch (err) {
      setUpgradeError(err.response?.data?.error || 'Invalid invite code.');
    } finally {
      setUpgradeLoading(false);
    }
  };

  const goToAdmin = () => {
    setAccountModalOpen(false);
    navigate('/admin');
  };

  if (!isAccountModalOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 font-inter"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: -20 }}
          className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-indigo-500" />
              Account Status
            </h2>
            <button
              onClick={() => setAccountModalOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            
            {/* Profile Info */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-indigo-100 dark:border-indigo-900/50 mb-4 shadow-sm">
                 <img alt="User Avatar" className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBc1KrY3hAzs_b3mzGZkIzfzajdRzqAwyBk7b4QN7QmFTzfWyf7022-UjIx-ESAbie6iLUdWeK8xqKYZ-O4rkxzX_fazXz7rDV1E-tcBOq3RWgLgroK7ttKkFLA_Dki6uESzgYqFdHmy6yCyZiwDspQlEbGiX5gUoYb3WAQqX4Ce4vgczdtoQcaRgRwtHYldy5qr6MLeKizq_v6FmJENfhI9iQozpmU5KaewI-Q_wn04vlOv--wO7-w_j5sLRS4SC1VbZGjXlwq5xYm" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {profile?.displayName || user?.email?.split('@')[0]}
              </h3>
              <p className="text-sm text-slate-500 mb-2">{user?.email}</p>
              
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                profile?.role === 'ADMIN' 
                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400' 
                  : 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400'
              }`}>
                {profile?.role === 'ADMIN' ? <Shield className="w-3.5 h-3.5" /> : <UserIcon className="w-3.5 h-3.5" />}
                {profile?.role || 'USER'}
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center">
                <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-500 flex items-center justify-center mb-2">
                  <Flame className="w-4 h-4" />
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{profile?.streak || 0}</div>
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Day Streak</div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-500 flex items-center justify-center mb-2">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{profile?.xp || 0}</div>
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Total XP</div>
              </div>
            </div>

            {/* Admin Section */}
            {profile?.role === 'ADMIN' ? (
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={goToAdmin}
                  className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-medium transition-colors mb-3"
                >
                  <Shield className="w-5 h-5" />
                  Admin Dashboard
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 py-3 rounded-xl font-medium transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                  <Key className="w-4 h-4 text-indigo-500" />
                  Admin Upgrade
                </h4>
                <form onSubmit={handleUpgrade} className="flex gap-2 mb-4">
                  <input
                    type="password"
                    placeholder="Enter invite code"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white"
                  />
                  <button
                    type="submit"
                    disabled={upgradeLoading || !inviteCode}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {upgradeLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Upgrade'}
                  </button>
                </form>
                {upgradeError && <p className="text-red-500 text-xs mt-2 mb-4">{upgradeError}</p>}
                
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 py-3 rounded-xl font-medium transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AccountModal;

