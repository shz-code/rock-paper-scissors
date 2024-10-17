const result = (player1Option, player2Option, player1, player2) => {
  let winner = null;
  let loser = null;
  let draw = null;

  if (player1Option === "rock") {
    if (player2Option === "rock") {
      draw = true;
    } else if (player2Option === "paper") {
      winner = player2;
      loser = player1;
    } else if (player2Option === "scissors") {
      winner = player1;
      loser = player2;
    }
  } else if (player2Option === "rock") {
    if (player1Option === "rock") {
      draw = true;
    } else if (player1Option === "paper") {
      winner = player1;
      loser = player2;
    } else if (player1Option === "scissors") {
      winner = player2;
      loser = player1;
    }
  }

  return { winner, loser, draw };
};

export default result;
