const Blog=require('../models/blog')
const User=require('../models/user')

const initialBlogs=[
    
        {
            title:'My blog about nothing',
            author:'Art Vandeley',
            url:'www.nothing.fi',
            likes:'50',    
            }
    ]

const blogsInDb=async()=>{
    const blogs=await Blog.find({})
    return blogs.map(blog=>blog.toJSON())
}

const usersInDb=async()=>{
    const users=await User.find({})
    return users.map(u=>u.toJSON())
}

module.exports={
    initialBlogs,
    blogsInDb,
    usersInDb
}