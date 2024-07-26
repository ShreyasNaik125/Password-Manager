const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const config = require('../config')

mongoose.connect(config.data.your_mongodb_uri).then(
    console.log('connected to DB....')
)

const usersSchema = new mongoose.Schema({
    email:String,
    password:String,
    saved:Array,
})

const model = mongoose.model('users',usersSchema)

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors({origin: true, credentials: true}))

app.post('/login',async(req,res)=>{
    const { email,password } = req.body
    const response = await model.findOne({email:email})
    if (response){
        var match = await bcrypt.compare(password,response.password)
        if(match){
            res.send('success')
        }else{
            res.send('failure')
        }
    }else{
        res.send('account does not exist')
    }
})

app.post('/register',async(req,res)=>{
    const { email,password } = req.body
    
    const response = await model.findOne({email:email})
    
    if (response){
        res.send('Email ID is already used')
    }else{
        const saltRounds = 10;
        const hashed_password = await bcrypt.hash(password, saltRounds)
        await model.create({
            email:email,
            password:hashed_password,
            saved:[],
        })
        await res.send('Account has been created')
    }
})

app.post('/getPasswords',async(req,res)=>{
    const { email } = req.body
    const response = await model.findOne({email:email})
    if (response){
        res.json(response.saved)
    }else{
        res.send('Internal Server Error')
    }
})

app.post('/addPassword',async(req,res)=>{
    const { user_email,reg_sitename,reg_email,reg_password } = req.body

    const user = await model.findOneAndUpdate(
        { email: user_email },
        { $push: { saved: {sitename:reg_sitename,email:reg_email,password:reg_password} } },
        { new: true }
    );

    if (user){
        res.send('new record added successfully')
    }else{
        res.send('Internal Server Error')
    }
})

app.listen(3000)