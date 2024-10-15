import { Server } from "socket.io";

const IOServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  return io;
};

export default IOServer;
