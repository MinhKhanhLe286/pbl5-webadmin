const routeSoilMoisture = require("express").Router();

routeSoilMoisture.get("/soilMoisture", (req, res) => {
  res.render("admin/soil_moisture");
});
module.exports = routeSoilMoisture;
