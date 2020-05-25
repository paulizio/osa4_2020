const Blog=require('../models/blog')

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

module.exports={
    initialBlogs,
    blogsInDb
}