//importing  all required  external modules

const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const User=require('./models/User')
const bcrypt=require('bcryptjs')

const app=express()
const PORT=3000
app.use(express.json());

//conecting to DB Atlas
mongoose.connect(process.env.MONGO_URL).then(
    ()=>console.log("DB connected sucessfully...")
).catch(
    (err)=>console.log(err)
)

//API landing page http://localhost:3000/
app.get('/',async(req,res)=>{
    try{
res.send("<h2 style='color:red;text-align:center'>welcome to the MERN stack |week2|backend</h2>")
    }
    catch(err)
    {
        console.log(err)
    }
})

//API registration page http://localhost:3000/register
app.post('/register',async(req,res)=>{
    const {username,email,password}=req.body
    try{
       const hashPassword=await bcrypt.hash(password,10)
       const newUser=new User({username,email,password:hashPassword})
       await newUser.save()
       console.log("New user is created....")
       res.send({message:"User is created"})
       res.json({message: "User Registered.. "})
    }
    catch(err)
    {
        console.log(err)
    }
})

//API login api http://localhost:3000/login
app.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password)))
            {
               return res.status(404).json({message:"Invalid credentials"});
            }
        res.json({message:"User login successfull", username: user.username})
       
    }
    catch(err)
    {
        console.log(err)
    }
})

//server connection and testing
app.listen(PORT,(err)=>{
    if(err)
    {
        console.log(err)
    }
console.log("server is running on port:"+PORT)
})