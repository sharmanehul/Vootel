const User = require("../models/user.model")

const login = async (req, res) => {
    const {email,password} = req.body

    try{
        const{ user, token } = await User.matchPasswordAndGenerateToken(email, password, res)
        
        res.status(200).json({
            message:"Successfully logged in",
            user,
            token
        })
        
    }
    catch(error){
        console.log(error)
        res.status(400).json({
            error: "password not match",
        })
    }
}


const signup = async (req, res) => {
    const { fullName, email, password, profileImg } = req.body
    try{
        const user = await User.create({
            fullName, email, password, profileImg
        })

        res.status(200).json({
            message:"successfully created account",
            data: user
        })
    }
    catch(err){
        console.log("Getting error in signup",err)
        res.status(400).json({
            error:"User already exist"
        })
    }
}

const logout = (req, res) => {
    res.cookie("token","",{ maxAge:0 })
    res.status(200).json({
        message:"Log out Successfully"
    })
}


module.exports = {
    login,
    signup,
    logout
}