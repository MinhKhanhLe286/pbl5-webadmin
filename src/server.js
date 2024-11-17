const express = require('express');
const http = require('http');
const app = express();
var server = http.Server(app);
var io = require('socket.io')(server);
var routerAdmin = require('./router/admin');
const connection = require("./config/conMongoose");
const {setIntervalSaveData} = require("./handle/adddata");
// var sensorClass = require("./class/sensorClass");
const bodyParser = require('body-parser');
const SocketServices = require("./services/chat.service")
require('dotenv').config();

global._io = io;
app.use(bodyParser.json());

connection();



app.use(express.static('./src/public'));
app.set('view engine', 'ejs');
app.set('views', "./src/views");

server.listen(3333, () => {
  console.log('Server is running at http://localhost:3333');
});

routerAdmin(app);

// Route để nhận dữ liệu từ ESP32
app.post('/data', (req, res) => {
  const data = req.body; 
  console.log('Received data from ESP32:', data);

  // Gửi dữ liệu cho tất cả các client WebSocket
  _io.sockets.emit("Server-response-sensor-data", data);
  res.status(200).send("Data received");
});

// setIntervalSaveData(
//   new sensorClass(
//       parseFloat((Math.random() * 100).toFixed(2)),
//       parseFloat((Math.random() * 100).toFixed(2)),
//       parseFloat((Math.random() * 100).toFixed(2)),
//       parseFloat((Math.random() * 100).toFixed(2))
//   ),
//   1
// );


_io.on("connection", SocketServices.connection);