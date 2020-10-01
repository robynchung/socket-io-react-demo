const app = require("express")();
const http = require("http").createServer(app);
const router = require("express").Router();
const io = require("socket.io")(http);
const { socketIo } = require("../../frontend/src/constants");

router.get("/", () => {});

module.exports = router;
