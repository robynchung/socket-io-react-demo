const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const router = require("./routes");

app.use(router);

io.on("connection", socket => {
  socket.on("disconnect", () => {});
});

http.listen(4000, () => {
  console.log("listening on *:4000");
});
