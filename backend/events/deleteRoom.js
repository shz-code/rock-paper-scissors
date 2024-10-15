const DeleteRoom = (io, socket, rooms) => {
  socket.on(`game:delete`, (data) => {
    const newRooms = rooms.filter((r) => r.room_id != data);
    rooms = newRooms;
    socket.to(data).emit("game:delete", `${socket.id} left`);
  });
};

export default DeleteRoom;
