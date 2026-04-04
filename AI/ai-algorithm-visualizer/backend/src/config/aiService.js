const axios = require('axios');

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

const aiServiceClient = axios.create({
  baseURL: AI_SERVICE_URL,
  timeout: 30000,
});

aiServiceClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('AI Service Error:', error.message);
    throw error;
  }
);

module.exports = aiServiceClient;
