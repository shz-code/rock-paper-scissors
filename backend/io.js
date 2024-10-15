import { Server } from "socket.io";

const IOServer = (server) => {
  const withAuth = (socket, next) => {
    const apiKey = socket.handshake.headers.authentication ?? null;

    if (!apiKey || !apiKey.startsWith("Bearer")) {
      socket.emit("auth:failed", "No token provided");
      next(new Error("Authentication error"));
    } else {
      const key = apiKey.split(" ")[1];
      if (key !== "1234") {
        socket.emit("auth:failed", "Wrong key");
        next(new Error("Authentication error"));
      }
      next();
    }
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
