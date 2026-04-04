import axios from 'axios'

const API_BASE = '/api'

export const algorithmAPI = {
  // Fetch all algorithms
  async getAlgorithms() {
    try {
      const response = await axios.get(`${API_BASE}/algorithms`)
      return response.data
    } catch (error) {
      console.error('Error fetching algorithms:', error)
      throw error
    }
  },

  // Get algorithm details
  async getAlgorithmDetails(name) {
    try {
      const response = await axios.get(`${API_BASE}/algorithms/${name}`)
      return response.data
    } catch (error) {
      console.error('Error fetching algorithm details:', error)
      throw error
    }
  },

  // Run an algorithm
  async runAlgorithm(algorithm, params) {
    try {
      const response = await axios.post(`${API_BASE}/algorithms/run`, {
        algorithm,
        params,
      })
      return response.data
    } catch (error) {
      console.error('Error running algorithm:', error)
      throw error
    }
  },

  // Get algorithm steps
  async getAlgorithmSteps(algorithm, params) {
    try {
      const response = await axios.get(`${API_BASE}/algorithms/${algorithm}/steps`, {
        params,
      })
      return response.data
    } catch (error) {
      console.error('Error fetching algorithm steps:', error)
      throw error
    }
  },

  // Save session
  async saveSession(sessionData) {
    try {
      const response = await axios.post(`${API_BASE}/sessions`, sessionData)
      return response.data
    } catch (error) {
      console.error('Error saving session:', error)
      throw error
    }
  },

  // Get all sessions
  async getSessions() {
    try {
      const response = await axios.get(`${API_BASE}/sessions`)
      return response.data
    } catch (error) {
      console.error('Error fetching sessions:', error)
      throw error
    }
  },

  // Get session by ID
  async getSession(id) {
    try {
      const response = await axios.get(`${API_BASE}/sessions/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching session:', error)
      throw error
    }
  },
}

export default algorithmAPI
