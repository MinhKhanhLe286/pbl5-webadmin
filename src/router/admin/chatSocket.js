const express = require('express')
const router = express.Router()

const {chatSocket} = require("../../controller/admin/chatSocketController")

router.get("/",chatSocket);

module.exports = router