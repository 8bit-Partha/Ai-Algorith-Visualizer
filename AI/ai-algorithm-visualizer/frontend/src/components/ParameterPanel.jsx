import React, { useState } from 'react'
import useAlgorithmStore from '../store/algorithmStore'
import algorithmAPI from '../utils/api'

export default function ParameterPanel() {
  const { selectedAlgorithm, params, setParams, setIsRunning, setSteps, setResult, setError } = useAlgorithmStore()
  const [localParams, setLocalParams] = useState({})

  const handleParamChange = (key, value) => {
    setLocalParams((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleRun = async () => {
    try {
      setError(null)
      setIsRunning(true)

      // Get algorithm steps from backend
      const stepsData = await algorithmAPI.getAlgorithmSteps(selectedAlgorithm, localParams)
      const result = await algorithmAPI.runAlgorithm(selectedAlgorithm, localParams)

      setSteps(stepsData.steps || [])
      setResult(result.result)
      setParams(localParams)
    } catch (err) {
      setError(err.message || 'Failed to run algorithm')
      console.error('Error:', err)
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4">Parameters</h2>

      {!selectedAlgorithm ? (
        <p className="text-gray-500 text-sm">Select an algorithm first</p>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Grid Size</label>
            <input
              type="number"
              value={localParams.grid_size || 10}
              onChange={(e) => handleParamChange('grid_size', parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Learning Rate</label>
            <input
              type="number"
              step="0.01"
              value={localParams.learning_rate || 0.01}
              onChange={(e) => handleParamChange('learning_rate', parseFloat(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Iterations</label>
            <input
              type="number"
              value={localParams.iterations || 100}
              onChange={(e) => handleParamChange('iterations', parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <button onClick={handleRun} className="btn-primary w-full">
            ▶ Run Algorithm
          </button>
        </div>
      )}
    </div>
  )
}
