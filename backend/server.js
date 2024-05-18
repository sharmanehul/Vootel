const express = require('express')
const {app,httpServer} = require("./socket")
const mongoose = require('mongoose')
const authRouter = require('./routes/auth.routes')
const cookieParser = require('cookie-parser')
const messageRouter = require('./routes/message.route')
const cors = require("cors")
const userRouter = require('./routes/users.router')
const path = require('path')

require('dotenv').config()

const PORT = 3000

app.use(cors({
    origin:'http://localhost:5173',
    credentials: true,
    methods:['GET','POST','PUT','DELETE']
}))

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('database connected'))

app.use(express.json())

app.use(express.urlencoded({extended:false}))

app.use(cookieParser())

app.use('/user',authRouter)

app.use('/message',messageRouter)

app.use('/users',userRouter)


app.use(express.static(path.join(__dirname,'..','frontend','dist')))

app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'..','frontend','dist','index.html'))
})
// if(process.env.env === 'production'){
// }

httpServer.listen(PORT,() => {
    console.log(`server running on http://localhost:${PORT}`)
})