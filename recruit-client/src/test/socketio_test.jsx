import io from 'socket.io-client'

//connect server, get the object that connect to the server
const socket = io('ws://localhost:5000')

//send msg to server
socket.emit('ClientSendMsgToServer', {name: 'abc'})
console.log('Client: send msg to server', {name: 'abc'});

//receive msg from server
socket.on('ServerSendMsgBackToClient', function (data){
    console.log('Client: receive msg back from server', data);
})