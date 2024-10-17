import cors from "cors";
import express from "express";
import { createServer } from "http";
import morgan from "morgan";
import IOServer from "./io.js";
import IOConnections from "./socketConnections.js";

const app = express();
const server = createServer(app);

app.use(morgan("dev"));
app.use(cors());

const ioServer = IOServer(server);
IOConnections(ioServer);

app.get("/", (req, res) => {
  console.log("hello");
  return res.send({ msg: "ok" });
});

server.listen(3000, "0.0.0.0", () => {
  console.log("Listing on port http://localhost:3000/");
});
