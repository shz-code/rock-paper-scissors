module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("join_room", (data) => {
      socket.join(data.room_id);
      room = data.room_id;

      console.log(socket.rooms);

      io.to(room).emit("room", "Connected to room");
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
