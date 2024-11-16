const routerAir_humidity = require("express").Router();

routerAir_humidity.get("/airhumidity", (req, res) => {
  res.render("admin/air_humidity");
});

module.exports = routerAir_humidity;
