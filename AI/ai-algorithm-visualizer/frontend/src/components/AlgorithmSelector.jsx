import React from 'react'
import useAlgorithmStore from '../store/algorithmStore'

export default function AlgorithmSelector() {
  const { algorithms, selectedAlgorithm, setSelectedAlgorithm } = useAlgorithmStore()

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4">Select Algorithm</h2>
      <div className="space-y-2">
        {algorithms.map((algo) => (
          <button
            key={algo.id}
            onClick={() => setSelectedAlgorithm(algo.id)}
            className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
              selectedAlgorithm === algo.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="font-semibold">{algo.name}</div>
            <div className="text-sm text-gray-600">{algo.category}</div>
            <div className="text-xs text-gray-500 mt-1">{algo.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
