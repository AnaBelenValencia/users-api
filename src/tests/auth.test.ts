import request from 'supertest'
import app from '../app'
import { AppDataSource } from '../config/data-source'

beforeAll(async () => {
  await AppDataSource.initialize()
})

afterAll(async () => {
  await AppDataSource.destroy()
})

describe('Auth Controller', () => {
  const user = {
    email: `test${Date.now()}@mail.com`,
    password: 'password123',
    firstName: 'Ana',
    lastName: 'Valencia'
  }

  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send(user)

    expect(res.status).toBe(201)
    expect(res.body.message).toBe('User registered successfully')
  })

  it('should not register if email already exists', async () => {
    const res = await request(app).post('/api/auth/register').send(user)

    expect(res.status).toBe(409)
    expect(res.body.message).toBe('Email already in use')
  })

  it('should login successfully with valid credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: user.email,
      password: user.password
    })

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('token')
  })

  it('should fail login with invalid credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: user.email,
      password: 'wrongpassword'
    })

    expect(res.status).toBe(401)
    expect(res.body.message).toBe('Invalid credentials')
  })
})
