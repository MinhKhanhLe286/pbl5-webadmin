const router = require("express").Router();
const authController = require("../../controller/authController")
//authentication/register
router.post("/register", authController.registerUser)

// [POST] authentication/login
router.post("/login", authController.loginUser)
module.exports = router;