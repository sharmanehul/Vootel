const express = require("express")
const checkUserLogin = require("../middlewares/authentication.js");
const { getAllUsers, getAllActiveUsers } = require("../controllers/users.controller.js");

const userRouter = express.Router();

userRouter.get("/",checkUserLogin, getAllUsers);

userRouter.get("/active",checkUserLogin,getAllActiveUsers)

module.exports = userRouter;  