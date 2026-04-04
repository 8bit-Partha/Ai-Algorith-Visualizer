"""
Q-Learning Implementation
"""
import numpy as np
from typing import Dict, Any

def run(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Run Q-Learning on a grid world
    
    Expected params:
    - grid_size: size of grid
    - start: starting position
    - goal: goal position
    - learning_rate: learning rate
    - discount_factor: discount factor
    - episodes: number of episodes
    """
    grid_size = int(params.get("grid_size", 5))
    start = params.get("start", [0, 0])
    goal = params.get("goal", [4, 4])
    learning_rate = float(params.get("learning_rate", 0.1))
    discount_factor = float(params.get("discount_factor", 0.9))
    epsilon = float(params.get("epsilon", 0.1))
    episodes = int(params.get("episodes", 100))
    
    # Initialize Q-table
    q_table = np.zeros((grid_size * grid_size, 4))  # 4 actions: up, down, left, right
    
    rewards = []
    episodes_data = []
    
    def pos_to_state(x, y):
        return x * grid_size + y
    
    def state_to_pos(state):
        return (state // grid_size, state % grid_size)
    
    def get_reward(x, y):
        if [x, y] == goal:
            return 100
        elif 0 <= x < grid_size and 0 <= y < grid_size:
            return -1
        else:
            return -10
    
    def take_action(state, action):
        x, y = state_to_pos(state)
        
        if action == 0:  # up
            x = max(0, x - 1)
        elif action == 1:  # down
            x = min(grid_size - 1, x + 1)
        elif action == 2:  # left
            y = max(0, y - 1)
        elif action == 3:  # right
            y = min(grid_size - 1, y + 1)
        
        new_state = pos_to_state(x, y)
        reward = get_reward(x, y)
        return new_state, reward
    
    for episode in range(episodes):
        state = pos_to_state(start[0], start[1])
        episode_reward = 0
        episode_steps = []
        
        for step in range(grid_size * grid_size):
            # Epsilon-greedy action selection
            if np.random.rand() < epsilon:
                action = np.random.randint(0, 4)
            else:
                action = np.argmax(q_table[state])
            
            next_state, reward = take_action(state, action)
            episode_reward += reward
            
            # Q-learning update
            old_value = q_table[state, action]
            next_max = np.max(q_table[next_state])
            new_value = old_value + learning_rate * (reward + discount_factor * next_max - old_value)
            q_table[state, action] = new_value
            
            episode_steps.append({
                "current_state": state,
                "action": action,
                "next_state": next_state,
                "reward": float(reward),
            })
            
            state = next_state
            
            if state == pos_to_state(goal[0], goal[1]):
                break
        
        rewards.append(episode_reward)
        episodes_data.append({
            "episode": episode,
            "total_reward": episode_reward,
            "steps_count": len(episode_steps),
        })
    
    return {
        "q_table_shape": q_table.shape,
        "total_episodes": episodes,
        "rewards": rewards,
        "episodes_data": episodes_data,
        "final_q_values": q_table.tolist(),
        "average_reward": float(np.mean(rewards)),
        "complexity": {
            "time": "O(episodes * max_steps * actions)",
            "space": "O(states * actions)"
        }
    }
