import React from 'react';
import { useAlgorithmStore } from '../store/algorithmStore';

const Visualizer = () => {
  const results = useAlgorithmStore((state) => state.results);
  const visualization = useAlgorithmStore((state) => state.visualization);
  const loading = useAlgorithmStore((state) => state.loading);

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-lg font-semibold mb-2">Visualization</h2>
        <div className="h-64 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-600">Running algorithm...</p>
        </div>
      </div>
    );
  }

  if (!results && !visualization) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-lg font-semibold mb-2">Visualization</h2>
        <div className="h-64 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-600">Select an algorithm and click Run to see visualization</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-lg font-semibold mb-2">Visualization</h2>
      <div className="h-64 bg-gray-50 border border-gray-300 rounded p-4 overflow-auto">
        {visualization && visualization.length > 0 ? (
          <div>
            {visualization.map((item, idx) => (
              <div key={idx} className="mb-2 p-2 bg-blue-100 rounded">
                <p>{typeof item === 'object' ? JSON.stringify(item) : item}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600">Algorithm executed successfully</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Visualizer;