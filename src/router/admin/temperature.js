const routerTemperature = require("express").Router();

routerTemperature.get("/temperature", (req, res) => {
  res.render("admin/temperature");
});
module.exports = routerTemperature;
