const express = require("express")
const {getMessage,addNewMessage, deleteChat, addNewFile} = require("../controllers/message.controller.js")
const checkUserLogin = require("../middlewares/authentication.js");
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('./uploads'))
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`
        cb(null, fileName)
    }
  })
  
const upload = multer({ storage })

const messageRouter = express.Router();

messageRouter.get("/:id",checkUserLogin, getMessage);

messageRouter.post("/:id",checkUserLogin,addNewMessage)

messageRouter.post("/file/:id",checkUserLogin,upload.single('file'),addNewFile)

messageRouter.delete("/:id",checkUserLogin,deleteChat)

module.exports = messageRouter;