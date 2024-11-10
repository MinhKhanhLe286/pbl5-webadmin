const express = require('express');
const http = require('http');
const app = express();
var server = http.Server(app);
var io = require('socket.io')(server);
var router = require('./router/indexRouter');
const connection = require("./config/conMongoose");
const {setIntervalSaveData} = require("./handle/adddata")
var sensorClass = require("./class/sensorClass")
connection();

setIntervalSaveData(
  new sensorClass(
      parseFloat((Math.random() * 100).toFixed(2)),
      parseFloat((Math.random() * 100).toFixed(2)),
      parseFloat((Math.random() * 100).toFixed(2)),
      parseFloat((Math.random() * 100).toFixed(2))
  ),
  1
);


/////////////////////////////////////////////////////////
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', "./src/views");

server.listen(3333, ()=>{
  console.log('Server is running at http://localhost:3333');
});

router(app);
///////////////////////////////////////////////////////////////
// tạo socket kết nối với sêrver
io.on("connection", (socket)=>{
  console.log(`Có người kết nối ${socket.id}`)
  socket.on("disconnect", () => {
    console.log(`Có người đã hủy kết nối id như sau: ${socket.id}`);
  });
  socket.on("Client-send-color", (data)=>{
    console.log("Có người nhấn nút  "+data);
    io.sockets.emit("Server-response-color", data);
  })
})