bcrypt=require('bcrypt')
userRouter=require('express').Router()
User=require('../models/user')

userRouter.post('/',async(request,response)=>{
    const body=request.body

    const saltRounds=10
    const passwordHash=await bcrypt.hash(body.password,saltRounds)

    const user=new User({
        username:body.username,
        name:body.name,
        passwordHash,
    })
    const savedUser=await user.save()
    response.json(savedUser)
})
userRouter.get('/',async(request,response)=>{
    const users=await User.find({})
    response.json(users.map(u=>u.toJSON()))
})
module.exports=userRouter