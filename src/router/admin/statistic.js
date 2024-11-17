const routerStatistic = require("express").Router();
routerStatistic.get("/statistic", (req, res) => {
  res.render("admin/statistic");
});
module.exports = routerStatistic;
