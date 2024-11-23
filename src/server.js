const express = require("express");
const http = require("http");
const app = express();
var server = http.Server(app);
var io = require("socket.io")(server);
var routerAdmin = require("./router/admin");
const connection = require("./config/conMongoose");
const { saveData } = require("./handle/adddata");
var sensorClass = require("./class/sensorClass");
const bodyParser = require("body-parser");
const SocketServices = require("./services/chat.service");
const routerESP32 = require("./router/esp32");
require("dotenv").config();

app.use(bodyParser.json());
var sensor = new sensorClass(0, 0, 0, 0);

////// variable globle ///////
global._data = null;
global._io = io;
////// variable globle ///////

setInterval(() => {
  if (_data != null) {
    sensor.setData(_data.temperature, _data.soil, _data.humidity, _data.light);
    saveData(sensor);
    _data = null;
  }
  else{
    console.log("data null")
  }
}, 1000  * 60);

connection();

app.use(express.static("./src/public"));
app.set("view engine", "ejs");
app.set("views", "./src/views");

server.listen(3333, () => {
  console.log("Server is running at http://localhost:3333/admin/home");
});

routerAdmin(app);
routerESP32(app);

_io.on("connection", SocketServices.connection);

// const sendMail = require("./services/mailer.service")
// sendMail("khanhlm250204@gmail.com","Cẩn báo", "<h1>hệ thống cảnh báo</h1>")