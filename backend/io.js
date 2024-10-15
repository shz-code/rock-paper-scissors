import { Server } from "socket.io";

const IOServer = (server) => {
  const withAuth = (socket, next) => {
    const apiKey = socket.handshake.headers.authentication;
    if (!apiKey.startsWith("Bearer")) {
      next(new Error("Authentication error"));
    }
    const key = apiKey.split(" ")[1];
    if (key !== "1234") {
      next(new Error("Authentication error"));
    }
    next();
  };
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  io.use(withAuth);
  return io;
};

export default IOServer;
