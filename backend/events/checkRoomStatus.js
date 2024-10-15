const CheckRoomStatus = (io, socket, rooms) => {
  socket.on(`game:check`, (data, cb) => {
    const room = rooms.findIndex((r) => r.room_id === data);

    if (room != -1) {
      cb(rooms[room]);
    }
  });
};

export default CheckRoomStatus;
