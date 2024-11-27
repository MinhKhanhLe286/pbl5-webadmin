class SocketServices {
    connection(socket) {
        console.log(`Co user connection: ${socket.id}`);

        socket.on("disconnect", () => {
            console.log(`${socket.id} huy connection`);
        });
        socket.on('chat message', msg => {
            console.log(`${socket.id} vừa send msg is: ${msg}`)
            _io.sockets.emit('chat message', msg)
        });
        socket.on('Python_send_server', (data)=>{
            _io.sockets.emit("Server_send_Base64_from_python", data)
        } );
        socket.on('Switch-to-manual', (data)=>{
            _manual = data;
        });
        socket.on('Switch-to-auto', (data)=>{
            _manual = null;
        });
        socket.on("Login-Face",(data)=>{
            _io.sockets.emit("Login-Face-Send-Python", data)
        })
        socket.on("Login-Face-From-Python", (data)=>{
            console.log("Nghe dc data từ python")
            _io.sockets.emit("Result-Face",data);
        })

    }
}   

module.exports = new SocketServices();
