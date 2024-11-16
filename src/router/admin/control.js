const routerControl = require("express").Router();

routerControl.get("/control", (req, res) => {
  res.render("admin/control");
});

module.exports = routerControl;
