import { create } from 'zustand';

const useAppStore = create((set) => ({
  moduleActive: 'Pathology v2.4',
  setModuleActive: (module) => set({ moduleActive: module }),

  // Dark Mode State
  darkMode: localStorage.getItem('medix-dark-mode') === 'true',
  toggleDarkMode: () => set((state) => {
    const next = !state.darkMode;
    localStorage.setItem('medix-dark-mode', next);
    if (next) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return { darkMode: next };
  }),
  
  // UI & Modals State
  isAuthModalOpen: false,
  setAuthModalOpen: (isOpen) => set({ isAuthModalOpen: isOpen }),
  isSettingsModalOpen: false,
  setSettingsModalOpen: (isOpen) => set({ isSettingsModalOpen: isOpen }),
  isHelpModalOpen: false,
  setHelpModalOpen: (isOpen) => set({ isHelpModalOpen: isOpen }),
  isAccountModalOpen: false,
  setAccountModalOpen: (isOpen) => set({ isAccountModalOpen: isOpen }),
  fontScale: localStorage.getItem('medix-font-scale') || 'medium',
  setFontScale: (scale) => set(() => {
    localStorage.setItem('medix-font-scale', scale);
    return { fontScale: scale };
  }),
  
  // Terminology Engine State
  searchTerm: '',
  setSearchTerm: (query) => set({ searchTerm: query }),
  correctedTerm: null,
  setCorrectedTerm: (term) => set({ correctedTerm: term }),
  definitionData: null,
  setDefinitionData: (data) => set({ definitionData: data }),
  relatedTerms: [],
  setRelatedTerms: (terms) => set({ relatedTerms: terms }),
  youtubeVideos: [],
  setYoutubeVideos: (videos) => set({ youtubeVideos: videos }),
  
  // Quiz Configurator State
  quizConfig: {
    topic: 'Pathology',
    difficulty: 'Medium',
    timeLimit: 10,
    numQuestions: 6,
  },
  setQuizConfig: (config) => set((state) => ({ quizConfig: { ...state.quizConfig, ...config } })),

  // Quiz Engine State
  quizData: null,
  setQuizData: (data) => set({ quizData: data }),
  quizProgress: {
    index: 0,
    score: 0,
    isComplete: false
  },
  updateQuizProgress: (progress) => set((state) => ({ quizProgress: { ...state.quizProgress, ...progress } })),
  selectedAnswer: null,
  setSelectedAnswer: (id) => set({ selectedAnswer: id }),
  resetQuizState: () => set({ quizProgress: { index: 0, score: 0, isComplete: false }, selectedAnswer: null }),

  // Anatomy Visualizer State
  selectedGender: 'female',
  setSelectedGender: (gender) => set({ selectedGender: gender }),
  anatomyLayer: { skeletal: true, muscular: false, nervous: false, organs: true },
  toggleAnatomyLayer: (layer) => set((state) => ({ anatomyLayer: { ...state.anatomyLayer, [layer]: !state.anatomyLayer[layer] } })),
  selectedOrgan: null,
  setSelectedOrgan: (organ) => set({ selectedOrgan: organ }),

  // Knowledge Graph State
  graphData: null,
  setGraphData: (data) => set({ graphData: data }),
  selectedNode: null,
  setSelectedNode: (node) => set({ selectedNode: node }),
  loadingGraph: false,
  setLoadingGraph: (status) => set({ loadingGraph: status }),
}));

export default useAppStore;
