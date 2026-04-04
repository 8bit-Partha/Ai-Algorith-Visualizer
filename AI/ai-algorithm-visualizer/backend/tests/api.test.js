const request = require('supertest')
const app = require('../src/server')

describe('Algorithm API', () => {
  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const res = await request(app)
        .get('/api/health')

      expect(res.status).toBe(200)
      expect(res.body.status).toBe('ok')
      expect(res.body.timestamp).toBeDefined()
    })
  })

  describe('GET /api/algorithms', () => {
    it('should list all algorithms', async () => {
      const res = await request(app)
        .get('/api/algorithms')

      expect(res.status).toBe(200)
    })
  })

  describe('POST /api/algorithms/run', () => {
    it('should reject without algorithm name', async () => {
      const res = await request(app)
        .post('/api/algorithms/run')
        .send({ params: {} })

      expect(res.status).toBe(400)
      expect(res.body.error).toBeDefined()
    })
  })
})

describe('Sessions API', () => {
  describe('POST /api/sessions', () => {
    it('should reject without required fields', async () => {
      const res = await request(app)
        .post('/api/sessions')
        .send({ algorithm: 'bfs' })

      expect(res.status).toBe(400)
    })

    it('should save session successfully', async () => {
      const res = await request(app)
        .post('/api/sessions')
        .send({
          name: 'Test Session',
          algorithm: 'bfs',
          params: { start: 'A' },
          results: []
        })

      expect(res.status).toBe(201)
      expect(res.body.sessionId).toBeDefined()
    })
  })

  describe('GET /api/sessions', () => {
    it('should return sessions list', async () => {
      const res = await request(app)
        .get('/api/sessions')

      expect(res.status).toBe(200)
      expect(Array.isArray(res.body)).toBe(true)
    })
  })
})
