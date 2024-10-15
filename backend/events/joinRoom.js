import { nanoid } from "nanoid";

const JoinRoom = (io, socket, rooms) => {
  socket.on("join_room", (data, cb) => {
    const { room, type } = data;
    switch (type) {
      case "friend":
        break;

      case "stranger":
        const ck = rooms.findIndex((r) => r.isAvailable && !r.isPrivate);
        if (ck != -1) {
          const data = rooms[ck];
          (data.player2 = socket.id),
            (data.isAvailable = false),
            (data.score[socket.id] = 0);

          rooms[ck] = data;

          socket.join(data.room_id);
          socket.to(data.room_id).emit("game_room", rooms[ck]);

          cb({ status: "found", data: rooms[ck] });
        } else {
          let data = {
            player1: socket.id,
            player2: null,
            isAvailable: true,
            room_id: nanoid(),
            score: {
              [socket.id]: 0,
            },
            isPrivate: false,
          };
          rooms.push(data);
          socket.join(data.room_id);
          cb({ status: "new", data: data });
        }
        break;
      default:
        break;
    }
  });
};

export default JoinRoom;
