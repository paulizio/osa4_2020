const blogsRouter=require('express').Router()
const Blog=require('../models/blog')
const User=require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom=request=>{
    const auth=request.get('authorization')
    if(auth&&auth.toLowerCase().startsWith('bearer ')){
        return auth.substring(7)
    }
    return null
}
blogsRouter.get('/',async(req,res)=>{
   const blogs=await Blog
   .find({}).populate('user',{username:1,name:1})
    res.json(blogs.map(blog=>blog.toJSON()))
})

blogsRouter.post('/',async(req,res)=>{
    const body=req.body
    const token=getTokenFrom(req)

    const decodedToken=jwt.verify(token,process.env.SECRET)
    if(!token||!decodedToken.id){
        return res.status(401).json({error:'token missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)

    const blog=new Blog({
        title:body.title,
        author:body.author,
        url:body.url,
        likes:body.likes,
        user:user._id
    })
  const savedBlog=await blog.save()
  user.blogs=user.blogs.concat(savedBlog._id)
  await user.save()
  res.json(savedBlog.toJSON())
 
})

blogsRouter.delete('/:id',async(req,res,next)=>{
try{
await Blog.findByIdAndRemove(req.params.id)
res.status(204).end()
}catch (exception){
    next(exception)

}

})
blogsRouter.put('/:id',async(req,res,next)=>{
  const body=req.body
  console.log('body is',body)
  const blog={
      title:body.title,
      author:body.author,
      url:body.url,
      likes:body.likes
  }
  try{
    const updatedBlog= await Blog.findByIdAndUpdate(req.params.id,blog)
    res.json(updatedBlog.toJSON())
  }catch(exception){
      next(exception)
  }
    
    })

module.exports=blogsRouter