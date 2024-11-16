const routerHome = require("express").Router();

routerHome.get("/home", (req, res) => {
  res.render("admin/home.ejs");
});

module.exports = routerHome;
