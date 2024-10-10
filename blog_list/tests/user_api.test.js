const { test, after, beforeEach, describe} = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')

let initialUsers = [
    {
        username: "test1",
        name: "Test1 Person1",
        passwordHash: null
    },
    {
        username: "test2",
        name: "Test2 Person2",
        passwordHash: null
    }
]
beforeEach(async () => {
    await User.deleteMany({})
    for (let i = 0; i < initialUsers.length; i++) {
        initialUsers[i].passwordHash = await bcrypt.hash('sekret', 10)
        let userObject = new User(initialUsers[i])
        await userObject.save()
  }
})

describe('user get', () => {
    test('userss are returned as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
  
    test(`there are ${initialUsers.length} users`, async () => {
        const response = await api.get('/api/users')
        assert.strictEqual(response.body.length, initialUsers.length)
    })
  
    test("User contains 'id'.", async () => {
        const response = await api.get('/api/users')
        assert('id' in response.body[0])
    })
  
    test("User does not contain '_id'.", async () => {
        const response = await api.get('/api/users')
        assert(!('_id' in response.body[0]))
    })

    test("User object does not contain 'password.'", async () => {
        const response = await api.get('/api/users')
        assert(!('passwordHash' in response.body[0]))
    })
})

describe('user post', () => {
    test("New user can be created.", async () => {
        let newUser = {
            username: "newuser",
            name: "new user",
            password: 'sekret'
        }
 
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
      
        const response = await api.get('/api/users')
        const titles = response.body.map(r => r.username)
        assert.strictEqual(response.body.length, initialUsers.length + 1)
        assert(titles.includes('newuser'))
    })
})

after(async () => {
    await mongoose.connection.close()
})