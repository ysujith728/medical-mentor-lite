import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { defineTerm, getRelatedTerms, getYoutubeVideos } from '../services/apiService';
import useAppStore from '../store/useAppStore';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import { capitalizeWords, truncateText } from '../utils/textUtils';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const TerminologyExplorer = () => {
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm, correctedTerm, setCorrectedTerm, definitionData, setDefinitionData, relatedTerms, setRelatedTerms, youtubeVideos, setYoutubeVideos } = useAppStore();

  const debouncedTerm = useDebounce(searchTerm || 'Atrial Fibrillation', 600);

  const { data: defData, isLoading: isLoadingDef, isError: isErrorDef } = useQuery({ queryKey: ['definition', debouncedTerm], queryFn: () => defineTerm(debouncedTerm), enabled: !!debouncedTerm });
  const { data: relTerms, isLoading: isLoadingRel } = useQuery({ queryKey: ['related', debouncedTerm], queryFn: () => getRelatedTerms(debouncedTerm), enabled: !!debouncedTerm });
  const { data: videos, isLoading: isLoadingVid } = useQuery({ queryKey: ['youtube', debouncedTerm], queryFn: () => getYoutubeVideos(debouncedTerm), enabled: !!debouncedTerm });

  useEffect(() => { if (defData) { if (defData.correctedTerm && defData.correctedTerm.toLowerCase() !== debouncedTerm.toLowerCase()) { setCorrectedTerm(defData.correctedTerm); } else { setCorrectedTerm(null); } setDefinitionData(defData); } }, [defData]);
  useEffect(() => { if (relTerms) setRelatedTerms(relTerms.terms || []); }, [relTerms]);
  useEffect(() => { if (videos) setYoutubeVideos(videos); }, [videos]);

  const handleRelatedClick = (term) => { setSearchTerm(term); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <div className="min-h-screen relative overflow-hidden font-inter text-gray-900">
      {/* Search Bar */}
      <div className="sticky top-16 z-30 px-6 lg:px-8 py-5 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-4xl relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
            <span className="material-symbols-outlined">search</span>
          </div>
          <input 
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-6 text-gray-900 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all text-base placeholder:text-gray-400" 
            placeholder="Explore medical terminology, pathways, or concepts..." 
            type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          />
          {isLoadingDef && (
            <div className="absolute inset-y-0 right-4 flex items-center">
               <span className="animate-spin h-5 w-5 border-2 border-indigo-500 border-t-transparent rounded-full"></span>
            </div>
          )}
        </div>
        <AnimatePresence>
          {correctedTerm && !isLoadingDef && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-2 ml-4">
              <span className="text-sm text-gray-500">Did you mean <button onClick={() => setSearchTerm(correctedTerm)} className="text-indigo-600 font-semibold hover:underline italic">{correctedTerm}</button>?</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="px-6 lg:px-8 pb-12 flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto mt-6">
        {/* Left Panel */}
        <div className="lg:w-3/5 space-y-6">
          <div className="card-panel-elevated p-8 lg:p-10 rounded-2xl relative overflow-hidden min-h-[500px]">
             {isLoadingDef ? (
                <div className="animate-pulse space-y-6">
                    <div className="h-4 bg-gray-100 rounded w-1/4 mb-3"></div>
                    <div className="h-12 bg-gray-100 rounded w-3/4 mb-10"></div>
                    <div><div className="h-5 bg-gray-100 rounded w-1/3 mb-3"></div><div className="h-4 bg-gray-100 rounded w-full mb-2"></div><div className="h-4 bg-gray-100 rounded w-full mb-2"></div><div className="h-4 bg-gray-100 rounded w-5/6"></div></div>
                </div>
             ) : isErrorDef ? (
                <div className="text-rose-500 flex flex-col items-center justify-center h-full pt-10">
                    <span className="material-symbols-outlined text-5xl mb-4">error</span>
                    <h3 className="font-semibold text-xl">Connection Lost</h3>
                    <p className="text-sm text-gray-400 mt-2">Could not retrieve the definition for this term.</p>
                </div>
             ) : definitionData ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <span className="text-indigo-600 text-xs tracking-[0.2em] uppercase font-semibold mb-3 block">Core Pathology Term</span>
                  <h1 className="text-4xl lg:text-5xl font-display text-gray-900 mb-8">{capitalizeWords(debouncedTerm)}</h1>
                  
                  <div className="space-y-8">
                    <section>
                      <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-3">
                        <span className="material-symbols-outlined text-indigo-500 text-lg">description</span> Definition
                      </h3>
                      <p className="text-gray-500 leading-relaxed">{definitionData.definition}</p>
                    </section>
                    
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                        <h3 className="text-sm font-semibold text-violet-600 flex items-center gap-2 mb-2">
                          <span className="material-symbols-outlined text-base">analytics</span> Pathophysiology
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed">{definitionData.pathophysiology}</p>
                      </div>
                      <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                        <h3 className="text-sm font-semibold text-emerald-600 flex items-center gap-2 mb-2">
                          <span className="material-symbols-outlined text-base">clinical_notes</span> Clinical Relevance
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed">{definitionData.clinicalRelevance}</p>
                      </div>
                    </section>
                    
                    <div className="pt-5 border-t border-gray-100 flex items-center justify-between">
                      <button className="flex items-center gap-2 text-gray-400 hover:text-indigo-600 transition-colors text-sm">
                        <span className="material-symbols-outlined text-base">bookmark</span> Save to Library
                      </button>
                      <button 
                        onClick={() => navigate(`/graph/${encodeURIComponent(debouncedTerm)}`)}
                        className="bg-gray-900 text-white px-5 py-2.5 rounded-full font-medium text-sm flex items-center gap-2 hover:bg-gray-800 transition-colors">
                        <span className="material-symbols-outlined text-sm">hub</span> View Knowledge Graph
                      </button>
                    </div>
                  </div>
                </motion.div>
             ) : null}
          </div>
        </div>

        {/* Right Panel */}
        <div className="lg:w-2/5 space-y-6">
          <div className="card-panel p-5 rounded-2xl">
            <h3 className="font-semibold text-gray-900 mb-3">Live Knowledge Casts</h3>
            {isLoadingVid ? (
                <div className="aspect-video w-full rounded-xl bg-gray-100 animate-pulse"></div>
            ) : youtubeVideos && youtubeVideos.length > 0 ? (
               <div className="space-y-3">
                 {youtubeVideos.map(vid => (
                     <div key={vid.id} className="flex gap-3 group cursor-pointer">
                          <div className="w-28 aspect-video rounded-lg bg-gray-100 overflow-hidden relative">
                             <img src={vid.thumbnail} className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-opacity" alt="thumbnail" />
                             <div className="absolute bottom-1 right-1 bg-black/70 px-1 py-0.5 text-[10px] rounded text-white font-medium">{vid.duration}</div>
                          </div>
                          <div className="flex-1 flex flex-col justify-center">
                             <p className="text-sm font-medium text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors">{truncateText(vid.title, 50)}</p>
                             <p className="text-xs text-gray-400 mt-1 font-medium">Watch Video →</p>
                          </div>
                     </div>
                 ))}
               </div>
            ) : (
                <div className="text-center p-4 text-gray-400 text-sm">No visual assets available.</div>
            )}
          </div>

          <div className="card-panel p-6 rounded-2xl">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-between">
              Related Concepts
              <span className="text-xs text-indigo-600 font-semibold">Expand Map</span>
            </h3>
            {isLoadingRel ? (
                 <div className="flex flex-wrap gap-2">{[1,2,3,4,5].map(i => <div key={i} className="h-9 w-24 bg-gray-100 rounded-lg animate-pulse"></div>)}</div>
            ) : (
                <div className="flex flex-wrap gap-2">
                  {relatedTerms.map((term, i) => (
                      <button onClick={() => handleRelatedClick(term)} key={i} className="px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 text-sm font-medium transition-all duration-300 flex items-center gap-2 group text-gray-600 hover:text-indigo-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 opacity-50 group-hover:opacity-100"></span>
                        {term}
                      </button>
                  ))}
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminologyExplorer;
