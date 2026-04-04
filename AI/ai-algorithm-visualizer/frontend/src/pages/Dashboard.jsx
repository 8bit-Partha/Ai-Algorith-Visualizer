import React, { useEffect } from 'react'
import useAlgorithmStore from '../store/algorithmStore'
import algorithmAPI from '../utils/api'
import AlgorithmSelector from '../components/AlgorithmSelector'
import ParameterPanel from '../components/ParameterPanel'
import ControlPanel from '../components/ControlPanel'
import Visualizer from '../components/Visualizer'
import ExplanationPanel from '../components/ExplanationPanel'

export default function Dashboard() {
  const { algorithms, selectedAlgorithm, setAlgorithms, error } = useAlgorithmStore()

  useEffect(() => {
    // Fetch algorithms on mount
    const fetchAlgorithms = async () => {
      try {
        const data = await algorithmAPI.getAlgorithms()
        if (data.algorithms) {
          setAlgorithms(data.algorithms)
        }
      } catch (err) {
        console.error('Failed to fetch algorithms:', err)
      }
    }

    fetchAlgorithms()
  }, [setAlgorithms])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            ⚠️ {error}
          </div>
        )}

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <AlgorithmSelector />
            <ParameterPanel />
            <ControlPanel />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            <Visualizer />
            <ExplanationPanel algorithm={selectedAlgorithm} />
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-1">
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Algorithm Library</h2>
              <div className="space-y-2">
                {algorithms.map((algo) => (
                  <div key={algo.id} className="p-2 bg-gray-50 rounded text-sm">
                    <div className="font-semibold">{algo.name}</div>
                    <div className="text-xs text-gray-600">{algo.category}</div>
                  </div>
                ))}
              </div>

              {algorithms.length === 0 && (
                <div className="text-center text-gray-500 text-sm py-8">
                  <p>Loading algorithms...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
