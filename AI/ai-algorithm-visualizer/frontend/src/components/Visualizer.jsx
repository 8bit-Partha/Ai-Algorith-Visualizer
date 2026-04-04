import React, { useEffect } from 'react'
import useAlgorithmStore from '../store/algorithmStore'

export default function Visualizer() {
  const { currentStepIndex, steps } = useAlgorithmStore()
  const currentStep = steps[currentStepIndex] || {}

  return (
    <div className="card canvas-container min-h-96">
      <h2 className="text-xl font-bold mb-4">Visualization</h2>

      <div className="bg-gray-50 rounded-lg p-8 min-h-80 flex items-center justify-center">
        {steps.length === 0 ? (
          <div className="text-center text-gray-500">
            <p className="text-lg">Select an algorithm and run it to see visualization</p>
            <p className="text-sm mt-2">Choose from sidebar and click Run</p>
          </div>
        ) : (
          <div className="w-full">
            <svg viewBox="0 0 800 400" className="w-full border border-gray-300 rounded">
              {/* Placeholder SVG - will be replaced with algorithm-specific visualizations */}
              <rect width="800" height="400" fill="white" />
              <text x="400" y="200" textAnchor="middle" fill="gray">
                Algorithm Visualization
              </text>
            </svg>

            <div className="mt-4 p-4 bg-gray-100 rounded">
              <h3 className="font-semibold mb-2">Step Details:</h3>
              <pre className="text-xs overflow-auto max-h-32">
                {JSON.stringify(currentStep, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
