import JoinRoom from "./events/joinRoom.js";

let rooms = [];

const IOConnections = (io) => {
  io.on("connection", async (socket) => {
    // handle new game request

    JoinRoom(io, socket, rooms);

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};

export default IOConnections;
