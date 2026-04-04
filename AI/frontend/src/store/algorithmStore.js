import { create } from 'zustand';
import api from '../utils/api';

export const useAlgorithmStore = create((set, get) => ({
  selectedAlgorithm: '',
  parameters: {},
  results: null,
  visualization: null,
  loading: false,
  error: null,

  setSelectedAlgorithm: (algorithm) => set({ selectedAlgorithm: algorithm, results: null, visualization: null }),
  
  setParameters: (parameters) => set({ parameters }),
  
  setResults: (results) => set({ results }),
  
  setVisualization: (visualization) => set({ visualization }),
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),

  runAlgorithm: async () => {
    const { selectedAlgorithm, parameters } = get();
    
    if (!selectedAlgorithm) {
      set({ error: 'Please select an algorithm first' });
      return;
    }

    set({ loading: true, error: null });
    
    try {
      const response = await api.post('/algorithms/run', {
        algorithm: selectedAlgorithm,
        parameters
      });

      set({
        results: response.data.result,
        visualization: response.data.visualization || [],
        loading: false
      });
    } catch (err) {
      set({
        error: err.message || 'Error running algorithm',
        loading: false
      });
    }
  },

  reset: () => set({
    selectedAlgorithm: '',
    parameters: {},
    results: null,
    visualization: null,
    loading: false,
    error: null
  })
}));