class SocketServices {
    connection(socket) {
        console.log(`Co user connection: ${socket.id}`);

        // Sửa "disconnec" thành "disconnect"
        socket.on("disconnect", () => {
            console.log(`${socket.id} huy connection`);
        });
        socket.on('chat message', msg => {
            console.log(`${socket.id} vừa send msg is: ${msg}`)
            _io.sockets.emit('chat message', msg)
        })
    }
}

module.exports = new SocketServices();
