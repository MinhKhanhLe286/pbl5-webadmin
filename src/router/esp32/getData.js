
const ESP32Controller = require("../../controller/esp32")
const routerGetData = require("express").Router();

routerGetData.post("/getdata", ESP32Controller.getData );

module.exports = routerGetData