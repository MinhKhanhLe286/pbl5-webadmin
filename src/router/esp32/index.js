const routerSendData = require("./sendData")
const routerGetData = require("./getData")
module.exports = (app)=>{
    app.use("/esp32", routerGetData )
    app.use("/esp32", routerSendData )
}