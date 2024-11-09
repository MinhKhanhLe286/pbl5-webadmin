const express = require('express');
const http = require('http');
const app = express();
var server = http.Server(app);
var io = require('socket.io')(server);
var router = require('./router/indexRouter');
const connection = require("./config/conMongoose");

connection();
const sensorModel = require("./model/sensorModel");
async function main() {
  
  const newSensorData = new sensorModel({
      temperature: 25.5,
      soil: 45,
      humidity: 60
  });

  // Lưu tài liệu vào MongoDB
  try {
      const savedData = await newSensorData.save();
      console.log("Data saved successfully:", savedData);
  } catch (error) {
      console.error("Error saving data:", error);
  }
}

// Chạy hàm main
main();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', "./src/views");

server.listen(3333, ()=>{
  console.log('Server is running at http://localhost:3333');
});

router(app);

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