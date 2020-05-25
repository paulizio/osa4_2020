const supertest=require('supertest')
const mongoose=require('mongoose')
const app=require('../app')
const api=supertest(app)

const Blog=require('../models/blog')

test('blogs are returned as JSON',async()=>{
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type',/application\/json/)
})
afterAll(()=>{
    mongoose.connection.close()
})