const JWT = require("jsonwebtoken")
require('dotenv').config()


const generateToken = (user,res) => {
    const payload = {
        email: user.email,
        id: user._id
    }
    const token = JWT.sign(payload,process.env.JWT_SECRET,{
        expiresIn: '2d'
    })
    res.cookie("token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, 
        httpOnly: true, 
        sameSite: "none",
        secure: process.env.NODE_ENV !== "development",
        path:'/'
    });
    return token
}

const verifyToken = (token) => {
    const payload = JWT.verify(token,process.env.JWT_SECRET)
    return payload
}


module.exports = {
    generateToken,
    verifyToken
}