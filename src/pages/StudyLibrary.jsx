import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchSavedTerms, deleteSavedTerm } from '../services/dashboardService';
import { capitalizeWords } from '../utils/textUtils';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const StudyLibrary = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'alphabetical'
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const { data: savedTerms, isLoading, isError } = useQuery({
    queryKey: ['savedTerms'],
    queryFn: fetchSavedTerms,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSavedTerm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedTerms'] });
      showToast('Term removed from library successfully.', 'success');
      if (selectedTerm) {
        setSelectedTerm(null);
      }
    },
    onError: (err) => {
      console.error(err);
      showToast('Failed to remove term.', 'error');
    }
  });

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to remove this term from your library?')) {
      deleteMutation.mutate(id);
    }
  };

  // Filter and Sort Terms
  const filteredTerms = savedTerms
    ? savedTerms.filter((termItem) => {
        const query = searchQuery.toLowerCase();
        return (
          termItem.term.toLowerCase().includes(query) ||
          termItem.definition.toLowerCase().includes(query) ||
          (termItem.pathophysiology && termItem.pathophysiology.toLowerCase().includes(query)) ||
          (termItem.clinicalRelevance && termItem.clinicalRelevance.toLowerCase().includes(query))
        );
      })
    : [];

  const sortedTerms = [...filteredTerms].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortBy === 'oldest') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    if (sortBy === 'alphabetical') {
      return a.term.localeCompare(b.term);
    }
    return 0;
  });

  return (
    <div className="min-h-screen pb-12 px-6 lg:px-8 font-inter text-gray-900 dark:text-white max-w-7xl mx-auto mt-8 relative">
      {/* Toast Alert */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-8 right-8 z-50 px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-3 backdrop-blur-md border ${
              toast.type === 'success'
                ? 'bg-emerald-500/95 border-emerald-400/30 text-white'
                : 'bg-rose-500/95 border-rose-400/30 text-white'
            }`}
          >
            <span className="material-symbols-outlined text-lg">
              {toast.type === 'success' ? 'check_circle' : 'error'}
            </span>
            <span className="text-sm font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-display text-gray-900 dark:text-white mb-1">
            My Library
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Review and manage all your saved medical terms, pathophysiology details, and clinical insights.
          </p>
        </div>
        <div className="flex items-center gap-2 card-panel px-4 py-2 rounded-xl border border-gray-100 dark:border-gray-700/50">
          <span className="material-symbols-outlined text-indigo-500 text-xl">folder_special</span>
          <span className="text-sm font-semibold">{savedTerms?.length || 0} Saved Terms</span>
        </div>
      </header>

      {/* Controls Bar */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center bg-white/60 dark:bg-gray-900/60 backdrop-blur-md p-4 rounded-2xl border border-gray-100 dark:border-gray-800/80">
        <div className="relative w-full md:max-w-md">
          <span className="absolute inset-y-0 left-3.5 flex items-center text-gray-400 dark:text-gray-500">
            <span className="material-symbols-outlined text-xl">search</span>
          </span>
          <input
            className="w-full bg-gray-50 dark:bg-gray-800/80
                       border border-gray-200 dark:border-gray-700/50
                       rounded-xl py-2.5 pl-11 pr-4
                       text-gray-900 dark:text-white
                       placeholder:text-gray-400 dark:placeholder:text-gray-500
                       focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/30
                       transition-all text-sm"
            placeholder="Search saved terms, definitions, etc..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
          <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-50 dark:bg-gray-800/85
                       border border-gray-200 dark:border-gray-700/50
                       rounded-xl py-2.5 px-4
                       text-gray-900 dark:text-white text-sm
                       focus:outline-none focus:border-indigo-400
                       transition-all cursor-pointer"
          >
            <option value="newest">Newest Saved</option>
            <option value="oldest">Oldest Saved</option>
            <option value="alphabetical">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Grid Content */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
          <LoadingSpinner />
          <span className="text-sm text-gray-400 dark:text-gray-500">Retrieving your library...</span>
        </div>
      ) : isError ? (
        <div className="text-rose-500 flex flex-col items-center justify-center min-h-[40vh]">
          <span className="material-symbols-outlined text-5xl mb-4">error</span>
          <h3 className="font-semibold text-xl">Failed to load library</h3>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Please refresh or try again later.</p>
        </div>
      ) : sortedTerms.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {sortedTerms.map((termItem) => (
              <motion.div
                key={termItem.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedTerm(termItem)}
                className="card-panel p-6 rounded-2xl group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full border border-gray-100 dark:border-gray-800/80 relative"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider border border-indigo-200 dark:border-indigo-700/50">
                    Term
                  </span>
                  <button
                    onClick={(e) => handleDelete(e, termItem.id)}
                    className="text-gray-300 hover:text-rose-500 dark:text-gray-600 dark:hover:text-rose-400 p-1 rounded-lg transition-colors flex items-center justify-center"
                    title="Delete Saved Term"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>

                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {capitalizeWords(termItem.term)}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-4 leading-relaxed mb-4 flex-grow">
                  {termItem.definition}
                </p>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800/80 text-[10px] text-gray-400 dark:text-gray-500 font-medium">
                  <span>Saved on {new Date(termItem.createdAt).toLocaleDateString()}</span>
                  <span className="text-indigo-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Details <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center p-12 border border-dashed border-gray-300 dark:border-gray-700 rounded-3xl min-h-[350px] flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-700 mb-4">bookmark_border</span>
          <h3 className="font-semibold text-lg text-gray-700 dark:text-gray-300">No saved terms</h3>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2 max-w-sm">
            {searchQuery
              ? "We couldn't find anything matching your search. Try adjusting your search query."
              : "Your study library is empty. Visit the Terminology Explorer to find and save core concepts!"}
          </p>
        </div>
      )}

      {/* Details View Modal */}
      <AnimatePresence>
        {selectedTerm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTerm(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative z-10 flex flex-col max-h-[85vh]"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-100 dark:border-gray-800/80 flex justify-between items-start gap-4">
                <div>
                  <span className="text-indigo-600 dark:text-indigo-400 text-xs tracking-wider uppercase font-semibold block mb-1">
                    Study Library Concept
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {capitalizeWords(selectedTerm.term)}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedTerm(null)}
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center justify-center"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto space-y-6 flex-grow">
                {/* Definition */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-indigo-500 text-lg">description</span> Definition
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-100 dark:border-gray-800/40">
                    {selectedTerm.definition}
                  </p>
                </div>

                {/* Pathophysiology & Clinical Relevance Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedTerm.pathophysiology && (
                    <div className="bg-violet-500/5 dark:bg-violet-500/10 p-5 rounded-xl border border-violet-100/50 dark:border-violet-500/20">
                      <h4 className="text-sm font-semibold text-violet-600 dark:text-violet-400 flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-base">analytics</span> Pathophysiology
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                        {selectedTerm.pathophysiology}
                      </p>
                    </div>
                  )}
                  {selectedTerm.clinicalRelevance && (
                    <div className="bg-emerald-500/5 dark:bg-emerald-500/10 p-5 rounded-xl border border-emerald-100/50 dark:border-emerald-500/20">
                      <h4 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-base">clinical_notes</span> Clinical Relevance
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                        {selectedTerm.clinicalRelevance}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800/80 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                  Saved on {new Date(selectedTerm.createdAt).toLocaleString()}
                </span>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={(e) => handleDelete(e, selectedTerm.id)}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-rose-600 hover:text-white border border-rose-200 dark:border-rose-900/30 hover:bg-rose-600 transition-all text-sm font-medium"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span> Remove Term
                  </button>
                  <button
                    onClick={() => setSelectedTerm(null)}
                    className="flex-1 sm:flex-none bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudyLibrary;
