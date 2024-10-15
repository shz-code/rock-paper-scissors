import CheckRoomStatus from "./events/checkRoomStatus.js";
import DeleteRoom from "./events/deleteRoom.js";
import JoinRoom from "./events/joinRoom.js";
import UpdateRoom from "./events/updateRoom.js";

let rooms = [];

const IOConnections = (io) => {
  io.on("connection", async (socket) => {
    console.log("client connected");

    // handle new game request
    JoinRoom(io, socket, rooms);
    CheckRoomStatus(io, socket, rooms);
    UpdateRoom(io, socket, rooms);
    DeleteRoom(io, socket, rooms);

    socket.on("disconnect", () => {
      //   console.log("user disconnected");
    });
  });
};

export default IOConnections;
