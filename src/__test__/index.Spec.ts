import app from '../index'
import supertest from 'supertest'

const req = supertest(app)

describe('test the main server endpoint', () => {
  it('The main server endpoint testing', async () => {
    await req.get('/').expect(200)
  })
})
