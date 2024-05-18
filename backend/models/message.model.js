const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    message:{
        type: String,
    },
    file: {
        type: String,
        required: false,
    },
},{timestamps:true})

const Message = mongoose.model('Message',messageSchema)

module.exports = Message