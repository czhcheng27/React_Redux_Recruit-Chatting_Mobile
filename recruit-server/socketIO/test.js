module.exports = function (server){
    const io = require('socket.io')(server)

    io.on('connection', function (socket){
        console.log('Server: there is one client conncect to server');

        socket.on('ClientSendMsgToServer', function (data){
            console.log('Server: receive msg from client', data);
            //operate data
            data.name = data.name.toUpperCase()
            //server send msg to client
            socket.emit('ServerSendMsgBackToClient', data)
            console.log('Server: send msg back to client', data);
        })
    })
}