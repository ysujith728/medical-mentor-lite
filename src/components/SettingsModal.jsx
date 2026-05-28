import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings2, Type, Moon, Sun, Bell } from 'lucide-react';
import useAppStore from '../store/useAppStore';

const SettingsModal = () => {
  const { isSettingsModalOpen, setSettingsModalOpen, fontScale, setFontScale, darkMode, toggleDarkMode } = useAppStore();

  if (!isSettingsModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
          onClick={() => setSettingsModalOpen(false)}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 shadow-2xl rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-800"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 dark:bg-slate-800 rounded-lg">
                <Settings2 className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Preferences</h2>
            </div>
            <button 
              onClick={() => setSettingsModalOpen(false)}
              className="p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-8">
            
            {/* Display Settings */}
            <section>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Type className="w-4 h-4 text-indigo-500" /> Interface Scale
              </h3>
              
              <div className="grid grid-cols-3 gap-3">
                {['small', 'medium', 'large'].map((scale) => (
                  <button
                    key={scale}
                    onClick={() => setFontScale(scale)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                      fontScale === scale 
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300'
                        : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <span className={`font-medium capitalize ${scale === 'small' ? 'text-xs' : scale === 'medium' ? 'text-sm' : 'text-base'}`}>
                      {scale}
                    </span>
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Adjust the base text size. This affects the entire application layout.
              </p>
            </section>

            {/* Theme Settings */}
            <section>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Moon className="w-4 h-4 text-indigo-500" /> Appearance
              </h3>
              <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-slate-700">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white mb-0.5">Dark Mode</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Toggle dark theme across the application.</div>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
                    darkMode ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </section>
            
            {/* Notifications */}
            <section>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Bell className="w-4 h-4 text-indigo-500" /> Notifications
              </h3>
              <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-slate-700 opacity-60">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white mb-0.5">Push Notifications</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Receive alerts for new terms and quizzes.</div>
                </div>
                <span className="text-xs font-semibold bg-gray-100 dark:bg-slate-800 text-gray-500 px-2 py-1 rounded">Coming Soon</span>
              </div>
            </section>

          </div>
          
          <div className="bg-gray-50 dark:bg-slate-800/50 px-6 py-4 flex justify-end border-t border-gray-100 dark:border-slate-800">
            <button 
              onClick={() => setSettingsModalOpen(false)}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SettingsModal;
