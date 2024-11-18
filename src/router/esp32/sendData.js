
const ESP32Controller = require("../../controller/esp32")
const routerGetData = require("express").Router();

routerGetData.post("/sendData", ESP32Controller.sendData );

module.exports = routerGetData