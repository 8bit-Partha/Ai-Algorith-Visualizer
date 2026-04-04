import React from 'react';
import { useAlgorithmStore } from '../store/algorithmStore';

const ControlPanel = () => {
  const loading = useAlgorithmStore((state) => state.loading);
  const runAlgorithm = useAlgorithmStore((state) => state.runAlgorithm);
  const reset = useAlgorithmStore((state) => state.reset);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-lg font-semibold mb-2">Controls</h2>
      <button
        onClick={runAlgorithm}
        disabled={loading}
        className={`${
          loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
        } text-white px-4 py-2 rounded mr-2 disabled:cursor-not-allowed`}
      >
        {loading ? 'Running...' : 'Run'}
      </button>
      <button
        onClick={reset}
        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
      >
        Reset
      </button>
    </div>
  );
};

export default ControlPanel;