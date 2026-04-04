from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os

# Add algorithms to path
sys.path.append(os.path.join(os.path.dirname(__file__), 'algorithms'))

app = Flask(__name__)
CORS(app)

def generate_mock_visualization(algorithm):
    """Generate mock visualization data based on algorithm"""
    mock_data = {
        'bfs': ['Node 0', 'Node 1', 'Node 2', 'Node 3', 'Node 4'],
        'dfs': ['Node 0', 'Node 1', 'Node 3', 'Node 2', 'Node 4'],
        'a_star': ['Start', 'Path step 1', 'Path step 2', 'Goal'],
        'kmeans': ['Cluster 1: 5 items', 'Cluster 2: 4 items', 'Cluster 3: 6 items'],
        'linear_regression': ['Model trained with R² = 0.95'],
        'logistic_regression': ['Classification accuracy: 92%'],
        'decision_tree': ['Tree depth: 5', 'Leaves: 12'],
        'neural_network': ['Training loss: 0.045'],
        'q_learning': ['Episode 1: Reward 45', 'Episode 2: Reward 67', 'Episode 3: Reward 89']
    }
    return mock_data.get(algorithm, ['Result: Algorithm executed'])

@app.route('/run', methods=['POST'])
def run_algorithm():
    data = request.json
    algorithm = data.get('algorithm')
    parameters = data.get('parameters', {})

    # Placeholder for running algorithms
    result = {
        'algorithm': algorithm,
        'parameters': parameters,
        'result': f'Executed {algorithm} successfully',
        'visualization': generate_mock_visualization(algorithm)
    }

    return jsonify(result)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'OK', 'message': 'AI Service is running'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)