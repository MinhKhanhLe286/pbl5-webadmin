const routerLight = require("express").Router();

routerLight.get("/light", (req, res) => {
  res.render("admin/light");
});
module.exports = routerLight;