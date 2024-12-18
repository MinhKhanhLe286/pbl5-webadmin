require("dotenv").config();
var routerDashboard = require("./dashboard");
const routerChat = require("./chatSocket");
const prefixAdmin = process.env.PATH_ADMIN;
const cameraRouter = require("./camera");
const routerAuth = require("./authentication");
const routerHome = require("./home");

const routerTemperature = require("./temperature");
const routerAir_humidity = require("./air_humidity");
const routerLight = require("./light");
const routeSoilMoisture = require("./soil_moisture");
const routeControl = require("./control");
const routerStatistic = require("./statistic");
module.exports = (app) => {
  app.use(prefixAdmin, routerStatistic);
  app.use(prefixAdmin, routeControl);
  app.use(prefixAdmin, routeSoilMoisture);
  app.use(prefixAdmin, routerLight);
  app.use(prefixAdmin, routerAir_humidity);
  app.use(prefixAdmin, routerTemperature);
 
  app.use(prefixAdmin, routerHome);
  app.use(prefixAdmin, routerDashboard);
  app.use(prefixAdmin + "/chat", routerChat);
  app.use("/authentication", routerAuth);
  app.use("/admin", cameraRouter);
};
