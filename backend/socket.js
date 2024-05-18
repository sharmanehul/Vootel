const { Server} = require('socket.io')
const {createServer} = require('http')
const express = require('express')

const app = express()

const httpServer = createServer(app);

const io = new Server(httpServer,{
    cors:{
        origin: ["http://localhost:5173"],
		methods: ["GET", "POST"],
    }
})

const userSocketMap = {}

io.on("connection",(socket) => {
    // console.log("A user connected",socket.id)

    socket.on("new user",() => {
        io.emit("user added")
    })

    let userId
    socket.on("setup",(userData) => {
        socket.join(userData._id)   
        // console.log("User joined room in itself",userData._id)
        socket.emit('connected')    
        userId = userData._id
        userSocketMap[userId] = socket.id
        // console.log("logging",userSocketMap)
        io.emit('getonlineusers', Object.keys(userSocketMap));
    })

    socket.on("join chat",(room) => {
        socket.join(room)
        // console.log("user joined in the room",room)
    })

   socket.on("new message",(newMessage) => {
    // console.log("message from backend sent to user",newMessage.chatId)
        socket.in(newMessage.chatId).emit("message received",newMessage.message)
   })

    socket.on("disconnect",() => {
        // console.log("User is disconnected",socket.id)
        if(userId){
            delete userSocketMap[userId]
            // console.log("removed one user")
            io.emit("online users", Object.keys(userSocketMap));
        }
    })
})


module.exports = {
    httpServer,
    app
}