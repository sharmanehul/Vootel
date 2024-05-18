const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");

async function getMessage(req,res){
    const senderId = req.user._id
    const {id: receiverId} = req.params
    try{
        const conversation = await Conversation.findOne({
            participants : {$all:[senderId,receiverId]}
        }).populate("messages")
        
        const messages = conversation?.messages
        res.status(200).json(messages)  
    }
    catch(err){
        console.log("Getting error in fetching messages",err)
        res.status(400).json({
            error:"Internal server Error"
        })
    }
}

async function getFile(req,res){
    const senderId = req.user._id
    const {id: receiverId} = req.params
}

async function addNewMessage(req,res){
    const {id : receiverId} = req.params;
    const senderId = req.user._id;
    const {message} = req.body
    
    try{
        let conversation = await Conversation.findOne({
            participants: {$all : [senderId,receiverId]}
        })

        
        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,receiverId],
            })
        }
        
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })
        if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(200).json({
            message:newMessage
        })
    }
    catch(err){
        console.log("Error occured in sending message: ",err)
        res.status(400).json({
            error:"Getting error in sending message"
        })
    }
}

async function addNewFile(req,res){
    const { id: receiverId } = req.params
    const senderId = req.user._id
    const file = req.file
    // console.log(req.file)
    if (!file) {
        return res.status(400).json({
            error: "No file uploaded",
        });
    }
    try {
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversationtan = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }
        const newFileMessage = new Message({
            senderId,
            receiverId,
            file: `/uploads/${file.filename}`,
        });

        conversation.messages.push(newFileMessage._id);
        await Promise.all([conversation.save(), newFileMessage.save()]);

        res.status(200).json({
            message: newFileMessage,
        });
    } catch (err) {
        console.log("Error occurred in sending file: ", err);
        res.status(400).json({
            error: "Internal server error",
        });
    }
}

async function deleteChat(req,res){
    const senderId = req.user.id
    const {id:receiverId} = req.params
    try{
        const conversation = await Conversation.findOne({
            participants : {$all:[senderId,receiverId]}
        }).populate("messages")
    
        if (!conversation) {
            return res.status(404).json({ error: "conversation not found" });
        }
        if(!conversation.messages){
            return res.status(200).json({message:"Messages are already deleted"})
        }
        const messageIds = conversation.messages.map(message => message._id);

        for (const messageId of messageIds) {
            await Message.findByIdAndDelete(messageId);
        }

        await Conversation.findByIdAndDelete(conversation._id);
        
        return res.status(200).json({message:"Chat deleted"});
    }
    catch(err){
        console.log(err)
        res.status(400).json({
            error:"Internal server error"
        })
    }
}

module.exports = {
    getMessage,
    getFile,
    addNewMessage,
    addNewFile,
    deleteChat
}