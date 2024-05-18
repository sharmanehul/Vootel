const User = require("../models/user.model");
const { verifyToken } = require("../services/token")

const checkUserLogin = async (req,res,next) => {
    try{
        // const token = req.cookies.token;
        const token = req.headers.authorization
        if(!token){
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }

        const payload = verifyToken(token)
        const user = await User.findById(payload.id).select("-password")

        if(!user){
            return res.status(404).json({ error: "User not found" });
        }
        req.user = user
        next()
    }
    catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
}
module.exports = checkUserLogin