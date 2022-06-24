import supertest from 'supertest'
import createServer from '../loader/server'
import mongoose from 'mongoose'
import {MongoMemoryServer} from 'mongodb-memory-server'

const app = createServer

const userInput = {
  email: 'test@example.com',
  password: 'password'
}

describe('auth', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
  })

  describe('auth route', ()=>{
    describe('given data the user does not match', ()=>{
        it('should return a 404', async ()=>{
            const res = await supertest(app).get('/auth/login').send(userInput)
            expect(res.status).toBe(404)
        })
    })
    describe('given data missing', ()=>{
        it('should return a 400', async ()=>{
            const res = await supertest(app).get('/auth/login').send()
            expect(res.status).toBe(400)
        })
    })
  })

})
