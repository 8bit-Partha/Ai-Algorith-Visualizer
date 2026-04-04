import { create } from 'zustand'

export const useAlgorithmStore = create((set) => ({
  algorithms: [],
  selectedAlgorithm: null,
  params: {},
  isRunning: false,
  isPaused: false,
  currentStepIndex: 0,
  steps: [],
  result: null,
  speed: 1,
  darkMode: false,
  error: null,

  setAlgorithms: (algorithms) => set({ algorithms }),
  setSelectedAlgorithm: (algorithm) => set({ selectedAlgorithm: algorithm, currentStepIndex: 0 }),
  setParams: (params) => set({ params }),
  setIsRunning: (isRunning) => set({ isRunning }),
  setIsPaused: (isPaused) => set({ isPaused }),
  setCurrentStepIndex: (index) => set({ currentStepIndex: index }),
  setSteps: (steps) => set({ steps }),
  setResult: (result) => set({ result }),
  setSpeed: (speed) => set({ speed }),
  setDarkMode: (darkMode) => set({ darkMode }),
  setError: (error) => set({ error }),

  reset: () => set({
    isRunning: false,
    isPaused: false,
    currentStepIndex: 0,
    steps: [],
    result: null,
    error: null,
  }),
}))

export default useAlgorithmStore
