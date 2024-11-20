const routerTemperature = require("express").Router();
const temperatureAPI = require("../../controller/admin/API")
routerTemperature.get("/temperature", (req, res) => {
  res.render("admin/temperature");
});
routerTemperature.post("/API", temperatureAPI )
module.exports = routerTemperature;
