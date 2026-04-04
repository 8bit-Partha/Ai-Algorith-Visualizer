import React, { useState, useEffect } from 'react';
import { useAlgorithmStore } from '../store/algorithmStore';

const ParameterPanel = () => {
  const selectedAlgorithm = useAlgorithmStore((state) => state.selectedAlgorithm);
  const parameters = useAlgorithmStore((state) => state.parameters);
  const setParameters = useAlgorithmStore((state) => state.setParameters);
  const [localParams, setLocalParams] = useState({});

  useEffect(() => {
    // Set default parameters based on selected algorithm
    if (selectedAlgorithm === 'kmeans') {
      setLocalParams({ clusters: 3 });
    } else if (selectedAlgorithm === 'linear_regression') {
      setLocalParams({ learning_rate: 0.01 });
    } else if (selectedAlgorithm === 'bfs' || selectedAlgorithm === 'dfs') {
      setLocalParams({ start_node: 0 });
    } else {
      setLocalParams({});
    }
  }, [selectedAlgorithm]);

  const handleParameterChange = (key, value) => {
    const updated = { ...localParams, [key]: value };
    setLocalParams(updated);
    setParameters(updated);
  };

  if (!selectedAlgorithm) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-lg font-semibold mb-2">Parameters</h2>
        <p className="text-gray-600">Select an algorithm to configure parameters.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-lg font-semibold mb-2">Parameters</h2>
      {Object.entries(localParams).map(([key, value]) => (
        <div key={key} className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {key.replace('_', ' ').toUpperCase()}
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => handleParameterChange(key, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder={`Enter ${key}`}
          />
        </div>
      ))}
      {Object.keys(localParams).length === 0 && (
        <p className="text-gray-600 text-sm">No parameters for this algorithm.</p>
      )}
    </div>
  );
};

export default ParameterPanel;