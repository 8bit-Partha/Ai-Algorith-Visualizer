import React from 'react'
import useAlgorithmStore from '../store/algorithmStore'

export default function ControlPanel() {
  const {
    isRunning,
    isPaused,
    currentStepIndex,
    steps,
    speed,
    setIsRunning,
    setIsPaused,
    setCurrentStepIndex,
    setSpeed,
    reset,
  } = useAlgorithmStore()

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4">Controls</h2>

      <div className="space-y-4">
        {/* Play/Pause/Stop Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="btn-primary flex-1 text-sm"
          >
            {isRunning ? '⏸ Pause' : '▶ Play'}
          </button>
          <button
            onClick={reset}
            className="btn-secondary flex-1 text-sm"
          >
            🔄 Reset
          </button>
        </div>

        {/* Step Control */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Step: {currentStepIndex + 1} / {steps.length}
          </label>
          <input
            type="range"
            min="0"
            max={steps.length - 1}
            value={currentStepIndex}
            onChange={(e) => setCurrentStepIndex(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Speed Control */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Speed: {speed}x
          </label>
          <input
            type="range"
            min="0.25"
            max="2"
            step="0.25"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}
