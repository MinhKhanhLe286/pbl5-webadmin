const express = require('express')
const router = express.Router()

const {controllerDashboard} = require("../controller/dashboardController")

router.get("/",controllerDashboard);

module.exports = router