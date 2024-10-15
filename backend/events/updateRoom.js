const UpdateRoom = (io, socket, rooms) => {
  socket.on(`game:update`, (data, cb) => {
    const { id, option } = data;

    const roomId = rooms.findIndex((r) => r.room_id === id);
    const room = rooms[roomId];

    const player = room.player1 === socket.id ? room.player1 : room.player2;

    room.score[player]++;
    console.log(player, room, room.score[player]);

    socket.to(data.id).emit(`game:update:${data.id}`, `${socket.id} updated`);
  });
};

export default UpdateRoom;
