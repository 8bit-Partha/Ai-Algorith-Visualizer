import React from 'react';
import Navbar from './components/Navbar';
import AlgorithmSelector from './components/AlgorithmSelector';
import ControlPanel from './components/ControlPanel';
import Visualizer from './components/Visualizer';
import ExplanationPanel from './components/ExplanationPanel';
import ParameterPanel from './components/ParameterPanel';
import { useAlgorithmStore } from './store/algorithmStore';

function App() {
  const error = useAlgorithmStore((state) => state.error);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <AlgorithmSelector />
            <ParameterPanel />
            <ControlPanel />
          </div>
          <div className="lg:col-span-2">
            <Visualizer />
            <ExplanationPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;