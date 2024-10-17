interface PlayerData {
  lastOption: string;
  moveCount: number;
  winCount: number;
}

interface Score {
  key: PlayerData;
}

interface Room {
  player1: string;
  player2: string;
  isAvailable: boolean;
  room_id: string;
  score: Score;
  isPrivate: boolean;
}
