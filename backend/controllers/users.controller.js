const Conversation = require("../models/conversation.model")
const User = require("../models/user.model")

async function getAllUsers(req,res){
    const loggedInUserId = req.user
    try{
        const users = await User.find({_id:{ $ne: loggedInUserId}})
        res.status(200).json({users})
    }
    catch(err){
        console.log("getting error in fetching all users",err)
        res.status(400).json({
            error:"Getting error in fetching all users"
        })
    }
}

async function getAllActiveUsers(req,res){
    const loggedInUserId = req.user._id
    try{
        const activeUsers = await Conversation.find({
            participants : loggedInUserId,
            messages: { $not: { $size: 0 } }
        })
        
        const userIdsSet = new Set();
        for (const conversation of activeUsers) {
            for (const participant of conversation.participants) {
                if (participant.toString() !== loggedInUserId.toString()) {
                    userIdsSet.add(participant.toString());
                }
            }
        }
        const userIdsArray = Array.from(userIdsSet);
        const users = await User.find({ _id: { $in: userIdsArray } });
        res.status(200).json({users})
    }
    catch(error){
        console.log("getting error in fetching active users",error)
        res.status(400).json({
            error:"Internal server error"
        })
    }
} 

module.exports = {
    getAllUsers,
    getAllActiveUsers
}