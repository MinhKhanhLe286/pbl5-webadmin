const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://127.0.0.1:5500',  
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  }
});

var temperaturevalue = 0;

setInterval(() => {
  temperaturevalue = Math.random() * 100; 
  // console.log(temperaturevalue); 
  // // Gửi giá trị nhiệt độ mới đến tất cả client đang kết nối
  // io.emit('temperature', temperaturevalue);
}, 1000);

// Đảm bảo phục vụ file HTML từ server
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'); // Cung cấp file index.html
});

// Khi có kết nối
io.on('connection', (socket) => {
  console.log('Có người kết nối');
  
  // Khi kết nối, ngay lập tức gửi giá trị nhiệt độ hiện tại
  socket.emit('temperature', temperaturevalue);

  socket.on('disconnect', () => {
    console.log('Người dùng đã ngắt kết nối');
  });
});

// Lắng nghe ở cổng 3333
server.listen(3333, () => {
  console.log('Server is running at http://localhost:3333');
});
