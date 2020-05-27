const supertest=require('supertest')
const mongoose=require('mongoose')
const app=require('../app')
const api=supertest(app)
const helper=require('./test_helper')
// const bcrypt=require('bcrypt')
// const User=require('../models/user')
const Blog=require('../models/blog')

describe('initially one note saved',()=>{
    beforeEach(async()=>{
        await Blog.deleteMany({})

        const blogObjects=helper.initialBlogs
        .map(blog=>new Blog(blog))
        const promiseArray=blogObjects.map(blog=>blog.save())
        await Promise.all(promiseArray)

})

test('blogs are returned as JSON',async()=>{
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type',/application\/json/)
})

test('add blogs with HTTP POST, make sure amount of blogs increases by one. Check also that blog with the intended content has been posted',async()=>{
    const newBlog={
        title:"New blog to test",
        author:"tester",
        url:"www.test.fi",
        likes:"50",    
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect('Content-Type',/application\/json/)

    const blogsAtEnd=await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length+1)


    const titles=blogsAtEnd.map(blog=>blog.title)
    expect(titles).toContain('New blog to test')

})
})

afterAll(()=>{
    mongoose.connection.close()
})