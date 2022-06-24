import supertest from 'supertest'
import createServer from '../loader/server'
import mongoose from 'mongoose'
import {sign} from '../utils/jwt'
import {MongoMemoryServer} from 'mongodb-memory-server'
import {_create} from '../service/user'

const app = createServer

const userId = new mongoose.Types.ObjectId().toString()

const userPayload = {
  user: {
    _id: userId,
    email: 'jane.doe@example.com',
    name: 'Jane Doe'
  }
}
const userInput = {
  email: 'test@example.com',
  name: 'Jane Doe',
  password: 'password'
}

describe('user', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
  })

  describe('get users data route', () => {
    describe('does not exist token to list users', () => {
      it('should return a 401', async () => {
        const res = await supertest(app).get('/user/list')
        expect(res.statusCode).toBe(401)
      })
    })

    describe('does exist token to list users', () => {
      it('should return a 200 status and the user', async () => {
        const token = sign(userPayload, {expiresIn: 60})
        const res = await supertest(app).get('/user/list').set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(200)
      })
    })
  })

  describe('user create route', () => {
    describe('given data does not match', () => {
      it('should return a 400 status code and validator info', async () => {
        const res = await supertest(app).post('/user/create').send({})
        expect(res.statusCode).toBe(400)
        expect(res.body).toHaveProperty('error')
      })
    })

    describe('given data does match and created', () => {
      it('should return a 200 status code', async () => {
        const res = await supertest(app).post('/user/create').send(userInput)
        expect(res.statusCode).toBe(200)
        expect(res.body).toStrictEqual(expect.any(Object))
      })
    })
  })

  describe('user delete route', () => {
    describe('given data does not exist', () => {
      it('should return a 404', async () => {
        const res = await supertest(app).delete('/user/delete').send({id: userId})
        expect(res.statusCode).toBe(404)
        expect(res.body).toHaveProperty('error')
      })
    })

    describe('given data is empty', () => {
      it('should return a 400', async () => {
        const res = await supertest(app).delete('/user/delete').send()
        expect(res.statusCode).toBe(400)
        expect(res.body).toHaveProperty('error')
      })
    })
  })
})
