require('dotenv').config();
var routerDashboard = require("./dashboard")
const routerChat = require("./chatSocket")
const prefixAdmin = process.env.PATH_ADMIN
const cameraRouter = require('./camera')
const routerAuth = require("./authentication");
module.exports = (app)=>{
    app.use( prefixAdmin,routerDashboard);
    app.use( prefixAdmin+"/chat", routerChat);
    app.use("/authentication", routerAuth );
    app.use("/admin", cameraRouter);
}