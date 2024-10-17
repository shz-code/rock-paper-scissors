import result from "../lib/calcWinner.js";

const UpdateRoom = (io, socket, rooms) => {
  socket.on(`game:update`, (data) => {
    const { id, option } = data;

    const roomId = rooms.findIndex((r) => r.room_id === id);
    if (roomId != -1) {
      const room = rooms[roomId];

      const player = room.player1 === socket.id ? room.player1 : room.player2;
      const opponent = room.player1 === player ? room.player2 : room.player1;

      room.score[player].moveCount++;
      room.score[player].lastOption = option;

      if (
        room.score[room.player1].moveCount ===
        room.score[room.player2].moveCount
      ) {
        let player1Option = room.score[room.player1].lastOption;
        let player2Option = room.score[room.player2].lastOption;

        const { winner, loser, draw } = result(
          player1Option,
          player2Option,
          room.player1,
          room.player2
        );

        if (winner) room.score[winner].winCount++;

        let champion =
          room.score[room.player1].winCount === 3 ? room.player1 : null;
        champion =
          room.score[room.player2].winCount === 3 ? room.player2 : null;

        console.log(player1Option, player2Option);
        // Broadcast to all players
        io.to(id).emit(`game:update:${id}`, {
          locked: false,
          winner,
          loser,
          draw,
          room,
          player: player,
          opponent,
          champion,
        });
        // Callback
        // cb();
      }
    }
  });
};

export default UpdateRoom;
