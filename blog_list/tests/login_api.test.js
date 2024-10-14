const { test, after, beforeEach, describe} = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')
const Blog = require('../models/blog')

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
    await Blog.deleteMany({})
    await User.deleteMany({})
    for (let i = 0; i < initialUsers.length; i++) {
        initialUsers[i].passwordHash = await bcrypt.hash('pass', 10)
        let userObject = new User(initialUsers[i])
        await userObject.save()
  }
})

describe("login post", () => {
    test('login request succeeds with correct credentials.', async () => {
        const credentials = {
            username: 'test1',
            password: 'pass'
        }
        await api
            .post('/api/login')
            .send(credentials)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('Successful login response includes token.', async () => {
        const credentials = {
            username: 'test1',
            password: 'pass'
        }
        const response = await api
            .post('/api/login')
            .send(credentials)
        
        assert(response.body.token)
    })

    test('login request fails with incorrect username and returns an error.', async () => {
        const credentials = {
            username: 'incorrect',
            password: 'pass'
        }
        const response = await api
            .post('/api/login')
            .send(credentials)
            .expect(401)
            .expect('Content-Type', /application\/json/)
        assert(response.error)
    })
    test('login request fails with incorrect password and returns an error.', async () => {
        const credentials = {
            username: 'test1',
            password: 'incorrect'
        }
        const response = await api
            .post('/api/login')
            .send(credentials)
            .expect(401)
            .expect('Content-Type', /application\/json/)
        assert(response.error)

    })
    test('login request fails with incorrect username and password and returns an error.', async () => {
        const credentials = {
            username: 'incorrect',
            password: 'incorrect'
        }
        const response = await api
            .post('/api/login')
            .send(credentials)
            .expect(401)
            .expect('Content-Type', /application\/json/)
        assert(response.error)
    })
    test('Failed login errors are identical regardless of which field is incorrect', async () => {
        const incorrect_pass = {
            username: 'test1',
            password: 'incorrect'
        }
        const incorrect_username = {
            username: 'incorrect',
            password: 'pass'
        }
        const both_incorrect = {
            username: 'incorrect',
            password: 'incorrect'
        }
        const pass_response = await api
            .post('/api/login')
            .send(incorrect_pass)

        const username_response = await api
            .post('/api/login')
            .send(incorrect_pass)

        const both_response = await api
            .post('/api/login')
            .send(incorrect_pass)
        
        assert.deepStrictEqual(pass_response.error, username_response.error)
        assert.deepStrictEqual(pass_response.error, both_response.error)
    })
})

after(async () => {
    await mongoose.connection.close()
})