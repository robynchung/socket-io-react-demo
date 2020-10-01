const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const router = require("./routes");
const { socketIo } = require("../frontend/src/constants");

app.use(router);

io.on(socketIo.connection, socket => {
  socket.on(socketIo.chatMessage, msg => {
    io.emit(socketIo.chatMessage, msg);
  });
});

http.listen(4000, () => {
  console.log("listening on *:4000");
});
