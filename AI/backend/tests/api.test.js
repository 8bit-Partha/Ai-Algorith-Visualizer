const request = require('supertest');
const app = require('../src/server');

describe('API Tests', () => {
  it('should return health status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'OK');
  });

  it('should get algorithms', async () => {
    const res = await request(app).get('/api/algorithms');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('algorithms');
  });
});