import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useAlgorithmStore } from '../store/algorithmStore';

const AlgorithmSelector = () => {
  const [algorithms, setAlgorithms] = useState([]);
  const selectedAlgorithm = useAlgorithmStore((state) => state.selectedAlgorithm);
  const setSelectedAlgorithm = useAlgorithmStore((state) => state.setSelectedAlgorithm);

  useEffect(() => {
    const fetchAlgorithms = async () => {
      try {
        const response = await api.get('/algorithms');
        setAlgorithms(response.data.algorithms);
      } catch (error) {
        console.error('Error fetching algorithms:', error);
      }
    };
    fetchAlgorithms();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-lg font-semibold mb-2">Select Algorithm</h2>
      <select
        value={selectedAlgorithm}
        onChange={(e) => setSelectedAlgorithm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      >
        <option value="">Choose an algorithm</option>
        {algorithms.map((algo) => (
          <option key={algo} value={algo}>
            {algo.replace('_', ' ').toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AlgorithmSelector;