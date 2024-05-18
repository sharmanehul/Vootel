const express = require("express")
const { login, logout, signup } =require("../controllers/auth.controller.js")

const authRouter = express.Router();

authRouter.post("/login", login);

authRouter.post("/signup", signup);

authRouter.post("/logout", logout);

module.exports = authRouter;  