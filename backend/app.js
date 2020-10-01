const app = require("express")();
const cors = require("cors");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const router = require("./routes");
const { socketIo } = require("../frontend/src/constants");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(router);

io.on(socketIo.connection, socket => {
  let broadcast = {};

  socket.on(socketIo.newUser, data => {
    socket.userId = data;

    io.emit(socketIo.newUser, data);
  });

  socket.on(socketIo.chatMessage, message => {
    io.emit(socketIo.chatMessage, { user: socket.userId, message });
  });

  socket.on(socketIo.disconnect, function () {
    socket.broadcast.emit(socketIo.typing, broadcast);
  });
});

http.listen(4000, () => {
  console.log("listening on *:4000");
});
