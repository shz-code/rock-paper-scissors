const express = require("express");
const { createServer } = require("http");
const morgan = require("morgan");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);

app.use(morgan("dev"));
app.use(cors());

const io = require("./io")(server);
require("./socketConnections")(io);

app.get("/", (req, res) => {
  console.log("hello");
  return res.send({ msg: "ok" });
});

server.listen(3000, () => {
  console.log("Listing on port http://localhost:3000");
});
