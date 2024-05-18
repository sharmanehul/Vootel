const mongoose = require("mongoose")
const { createHmac, randomBytes } = require("crypto")
const { generateToken } = require("../services/token")

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    profileImg: {
        type: String,
        default: ""
    }

}, { timestamps: true })

// mongo pre functions to store the encrypted password
UserSchema.pre("save", function(next) {
    const user = this
    if (!user.isModified('password')) {
        return next();
    }
    const salt = randomBytes(16).toString()

    const hashPassword = createHmac('sha256', salt)
        .update(user.password)
        .digest('hex');

    user.salt = salt
    user.password = hashPassword
    next()
})

// static function to match the password and generate tokens while login
UserSchema.static("matchPasswordAndGenerateToken",async function(email,password,res){
    const user = await this.findOne({email})

    if(!user){
        throw new Error('User not found')
    }

    const hashedPassword = createHmac('sha256', user.salt)
        .update(password)
        .digest('hex');
    
    if(user.password !== hashedPassword){
        throw new Error('Password not match')
    }
    const token = generateToken(user,res)

    user.password = undefined
    user.salt= undefined
    return {user,token}
})

const User = mongoose.model("User", UserSchema);
module.exports = User;
