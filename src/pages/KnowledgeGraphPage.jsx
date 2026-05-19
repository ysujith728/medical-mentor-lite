import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import KnowledgeGraph3D from '../components/KnowledgeGraph3D';
import { fetchGraph, fetchNodeInfo } from '../services/graphService';
import useAppStore from '../store/useAppStore';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { capitalizeWords } from '../utils/textUtils';

const KnowledgeGraphPage = () => {
  const { term } = useParams();
  const navigate = useNavigate();
  const { setGraphData, selectedNode, setSelectedNode } = useAppStore();

  const { data, isLoading, isError, isFetching } = useQuery({ queryKey: ['graph', term], queryFn: () => fetchGraph(term), enabled: !!term });
  const { data: explanationData, isLoading: isLoadingExplanation } = useQuery({ queryKey: ['nodeExplain', selectedNode?.label], queryFn: () => fetchNodeInfo(selectedNode?.label), enabled: !!selectedNode });

  useEffect(() => {
    if (data) { setGraphData(data); const idx = data.nodes.findIndex(n => n.label.toLowerCase() === term.toLowerCase()); if (idx !== -1) setSelectedNode(data.nodes[idx]); else if (data.nodes.length > 0) setSelectedNode(data.nodes[0]); }
    return () => { setGraphData(null); setSelectedNode(null); }
  }, [data, term, setGraphData, setSelectedNode]);

  return (
    <div className="h-screen w-full relative flex overflow-hidden font-inter">
      {/* 3D Canvas — dark bg for visibility */}
      <div className="absolute inset-0 cursor-crosshair z-0 dark-canvas-bg">
        {isLoading || isFetching ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 w-full h-full bg-gray-900/80 backdrop-blur-sm">
            <LoadingSpinner size="md" message="Synthesizing Graph..." />
            <p className="text-sm text-gray-400 mt-2">Connecting topologies for '{capitalizeWords(term)}'</p>
          </div>
        ) : isError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-rose-400">
            <span className="material-symbols-outlined text-5xl mb-4">error</span>
            <h2>Graph processing failed. Try another term.</h2>
          </div>
        ) : <KnowledgeGraph3D term={term} />}
      </div>

      {/* Light floating header */}
      <div className="absolute top-6 left-6 z-30 pointer-events-none">
        <div className="bg-white/95 backdrop-blur-xl border border-gray-200 px-5 py-3 rounded-xl flex items-center gap-3 border-l-4 border-l-indigo-500 pointer-events-auto shadow-lg">
          <div>
            <div className="text-[10px] font-semibold text-indigo-600 uppercase tracking-widest mb-0.5">Knowledge Topology</div>
            <h1 className="text-xl font-display text-gray-900 capitalize">{term}</h1>
          </div>
          <button onClick={() => navigate('/terminology')} className="ml-3 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
            <span className="material-symbols-outlined text-sm">home</span>
          </button>
        </div>
      </div>

      {/* Light node info panel */}
      {selectedNode && (
        <div className="absolute top-1/2 -translate-y-1/2 right-6 w-72 z-30 pointer-events-none">
          <div className="bg-white/95 backdrop-blur-xl border border-gray-200 p-5 rounded-2xl shadow-xl pointer-events-auto">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase font-semibold tracking-widest text-gray-400">Selected Node</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase border ${
                selectedNode.type === 'disease' ? 'bg-rose-50 text-rose-500 border-rose-200' :
                selectedNode.type === 'symptom' ? 'bg-amber-50 text-amber-500 border-amber-200' :
                selectedNode.type === 'drug' ? 'bg-indigo-50 text-indigo-500 border-indigo-200' :
                'bg-violet-50 text-violet-500 border-violet-200'
              }`}>{selectedNode.type}</span>
            </div>
            <h2 className="text-xl font-display text-gray-900 mb-3">{selectedNode.label}</h2>
            <div className="bg-gray-50 rounded-xl p-3 min-h-[80px] border border-gray-100">
              {isLoadingExplanation ? (
                <div className="animate-pulse flex flex-col gap-2"><div className="h-3 bg-gray-200 rounded w-full"></div><div className="h-3 bg-gray-200 rounded w-4/5"></div></div>
              ) : <p className="text-sm text-gray-500 leading-relaxed">{explanationData?.explanation || "Select a node to query context."}</p>}
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <button onClick={() => navigate(`/graph/${encodeURIComponent(selectedNode.label)}`)} className="w-full py-2.5 bg-gray-900 text-white rounded-full text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                <span className="material-symbols-outlined text-sm">account_tree</span> Explore Branch
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Light legend */}
      <div className="absolute bottom-5 left-6 z-30 bg-white/95 backdrop-blur-xl border border-gray-200 flex items-center gap-5 px-5 py-2.5 rounded-xl shadow-lg font-inter">
        {[
          { label: 'Disease', color: 'bg-rose-500' },
          { label: 'Symptom', color: 'bg-amber-500' },
          { label: 'Drug', color: 'bg-indigo-500' },
          { label: 'Concept', color: 'bg-violet-500' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${item.color}`}></span>
            <span className="text-xs font-medium text-gray-500 uppercase">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none">
        <p className="text-xs font-medium text-gray-400 tracking-wider flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">mouse</span> Hover • Click • Double-Click to Expand
        </p>
      </div>
    </div>
  );
};

export default KnowledgeGraphPage;
