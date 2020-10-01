const app = require("express")();
const http = require("http").createServer(app);
const cors = require("cors");
const io = require("socket.io")(http);
const router = require("./routes");
const { socketIo } = require("../frontend/src/constants");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(router);

io.on(socketIo.connection, socket => {
  socket.on(socketIo.newUser, data => {
    socket.userId = data;

    io.emit(socketIo.newUser, data);
  });

  socket.on(socketIo.chatMessage, message => {
    io.emit(socketIo.chatMessage, { user: socket.userId, message });
  });

  let broadcast = {};

  socket.on(socketIo.typing, data => {
    broadcast = data;
    socket.broadcast.emit(socketIo.typing, broadcast);
  });

  socket.on(socketIo.disconnect, function () {
    socket.broadcast.emit(socketIo.typing, broadcast);
  });
});

http.listen(4000, () => {
  console.log("listening on *:4000");
});
