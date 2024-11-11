
const express = require('express')
const router = express.Router()

const {controllerDashboard} = require("../../controller/admin/dashboardController")

router.get("/",controllerDashboard);

module.exports = router