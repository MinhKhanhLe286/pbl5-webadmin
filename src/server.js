const express = require('express');
const http = require('http');
const app = express();
var server = http.Server(app);
var io = require('socket.io')(server);
var router = require('./router/indexRouter');
const connection = require("./config/conMongoose");
const {setIntervalSaveData} = require("./handle/adddata");
var sensorClass = require("./class/sensorClass");
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(bodyParser.json());

connection();



app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', "./src/views");

server.listen(3333, () => {
  console.log('Server is running at http://localhost:3333');
});

router(app);

// Route để nhận dữ liệu từ ESP32
app.post('/data', (req, res) => {
  const data = req.body; 
  console.log('Received data from ESP32:', data);

  // Gửi dữ liệu cho tất cả các client WebSocket
  io.sockets.emit("Server-response-sensor-data", data);
  res.status(200).send("Data received");
});

setIntervalSaveData(
  new sensorClass(
      parseFloat((Math.random() * 100).toFixed(2)),
      parseFloat((Math.random() * 100).toFixed(2)),
      parseFloat((Math.random() * 100).toFixed(2)),
      parseFloat((Math.random() * 100).toFixed(2))
  ),
  1
);

// Tạo kết nối socket với client
io.on("connection", (socket) => {
  console.log(`Có người kết nối ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`Có người đã hủy kết nối id: ${socket.id}`);
  });
});
