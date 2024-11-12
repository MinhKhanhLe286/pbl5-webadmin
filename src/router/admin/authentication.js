const router = require("express").Router();
const authController = require("../../controller/authController")
//authentication/register
router.post("/register", authController.registerUser)
router.get("/register", authController.register )
// [POST] authentication/login
router.post("/login", authController.loginUser)
router.get("/login", authController.login)
module.exports = router;