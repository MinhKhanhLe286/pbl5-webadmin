const express = require('express');
const http = require('http');
const app = express();
var server = http.Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', "./src/views");

server.listen(3333, ()=>{
  console.log('Server is running at http://localhost:3333');
});

app.get("/", (req, res) => {
  res.render("trangchu");
});

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