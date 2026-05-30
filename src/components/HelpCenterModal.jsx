import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, HelpCircle, Mail } from 'lucide-react';
import useAppStore from '../store/useAppStore';

const HelpCenterModal = () => {
  const { isHelpModalOpen, setHelpModalOpen } = useAppStore();

  if (!isHelpModalOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 font-inter"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Help Center</h2>
            </div>
            <button
              onClick={() => setHelpModalOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Features Guide</h3>
              
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-1">Neural Map (Dashboard)</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Your central hub for tracking XP, daily streaks, recent search history, and live activity logs.</p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-1">Study Library (Terminology)</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">An AI-powered medical dictionary that breaks down complex terms, generates knowledge graphs, and links relevant video content.</p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-1">Practice Exams (Diagnostics)</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Generate real-time, AI-synthesized quizzes tailored to any medical specialty or difficulty level to test your knowledge.</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Still need help?</h3>
              <p className="text-sm text-slate-500 mb-4">If you encounter any issues or have feature requests, please reach out directly to our administration team.</p>
              
              <a
                href="mailto:kjayeshrao@gmail.com"
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-medium transition-colors"
              >
                <Mail className="w-5 h-5" />
                Mail Admin
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HelpCenterModal;
