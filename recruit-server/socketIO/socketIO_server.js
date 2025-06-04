const { ChatModel } = require("../db/models");
module.exports = function (server) {
  const io = require("socket.io")(server);

  io.on("connection", function (socket) {
    console.log("Server: there is one client conncect to server");

    socket.on("sendMsg", function ({ targetId, myId, content }) {
      console.log("Server: receive msg from client", {
        targetId,
        myId,
        content,
      });
      //operate data(save msg)
      //prepare data: chat_id, create_time
      const chat_id = [targetId, myId].sort().join("_");
      const create_time = Date.now();
      new ChatModel({
        from: targetId,
        to: myId,
        content,
        chat_id,
        create_time,
      }).save(function (err, chatMsg) {
        //向所有连接上的客户端发消息
        io.emit("ServerToClient", chatMsg);
      });
    });
  });
};
