import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import VS_Background from "../../assets/images/battle.jpg";
import Paper from "../../assets/images/paper.png";
import Rock from "../../assets/images/rock.png";
import Scissors from "../../assets/images/scissors.png";
import socket from "../../lib/socket";
import Controls from "./Controls";
import Opponent from "./Opponent";
import Result from "./Result";

const Game = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [options, setOptions] = useState<string>(null);
  const [persistOptions, setPersistOptions] = useState<string | null>("rock");
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [opponentData, setOpponentData] = useState<PlayerData | null>(null);

  const [finalChampion, setFinalChampion] = useState<string | null>(null);

  const [foundOpponent, setFoundOpponent] = useState<boolean>(false);
  const [roomData, setRoomData] = useState<object | null>(null);
  const [locked, setLocked] = useState<boolean>(false);

  useEffect(() => {
    socket.emit(`game:check`, id, (data) => {
      if (!data.isAvailable) {
        setFoundOpponent(true);
        setRoomData(data);
      }
    });

    socket.on(
      `game:get:${id}`,
      ({ status, data }: { status: string; data: Room }) => {
        if (status === "joined") {
          setFoundOpponent(true);
          setRoomData(data);
        }
      }
    );

    socket.on(
      `game:update:${id}`,
      ({
        locked,
        winner,
        loser,
        draw,
        room,
        player,
        opponent,
        champion,
      }: {
        room: Room;
      }) => {
        if (winner === socket.id) {
          // alert("You won");
        } else if (loser === socket.id) {
          // alert("You lost");
        } else if (draw) {
          // alert("game drawn");
        }
        if (!locked) {
          setLocked(false);
          setPersistOptions(room.score[socket.id].lastOption);
          setOptions(null);
          setPlayerData(room.score[socket.id]);
          let opponentId = opponent === socket.id ? player : opponent;
          setOpponentData(room.score[opponentId]);
        }

        if (champion) {
          setFinalChampion(champion);
        }
      }
    );

    // socket.on("game:delete", (res) => {
    //   console.log(res);

    //   navigate(`/game/result/${id}`);
    // });

    return () => {
      socket.off(`game:get:${id}`);
      socket.off(`game:update:${id}`);
      // socket.off(`game:update:${id}`);
      socket.off(`game:delete`);
    };
  }, []);

  useEffect(() => {
    if (options) {
      setLocked(true);
      socket.emit("game:update", { id: id, option: options });
    }
  }, [options]);

  useEffect(() => {
    if (finalChampion) {
      setTimeout(() => {
        navigate(`/`);
      }, 2000);
    }
  }, [finalChampion]);

  return (
    <div className="relative h-full">
      <div
        style={{
          background: `url(${VS_Background}) no-repeat center center/cover`,
        }}
        className="flex flex-col lg:flex-row justify-between w-full h-full rounded-2xl overflow-hidden"
      >
        <div className="relative">
          <div>
            <div className="flex gap-4 p-2 mt-5 ml-5">
              <CgProfile className="h-20 w-20 bg-orange-400 border-4 rounded-2xl" />
              <div className="flex gap-4 items-center">
                {playerData &&
                  Array(playerData.winCount)
                    .fill(0)
                    .map((_, i) => (
                      <FaStar key={i} className="h-12 w-12 fill-orange-700" />
                    ))}

                {playerData &&
                  Array(3 - playerData.winCount)
                    .fill(0)
                    .map((_, i) => <FaStar key={i} className="h-12 w-12" />)}

                {!playerData && (
                  <>
                    <FaStar className="h-12 w-12" />
                    <FaStar className="h-12 w-12" />
                    <FaStar className="h-12 w-12" />
                  </>
                )}
              </div>
            </div>
            <div className="game_left_hands -ml-12">
              {(options === "rock" || persistOptions === "rock") && (
                <img
                  src={Rock}
                  className="transform scale-x-[-1] absolute top-1/2 -translate-y-1/2 max-w-[400px]"
                />
              )}
              {(options === "paper" || persistOptions === "paper") && (
                <img
                  src={Paper}
                  className="transform scale-x-[-1] absolute top-1/2 -translate-y-1/2 max-w-[400px]"
                />
              )}
              {(options === "scissors" || persistOptions === "scissors") && (
                <img
                  src={Scissors}
                  className="transform scale-x-[-1] absolute top-1/2 -translate-y-1/2 max-w-[400px]"
                />
              )}
            </div>
          </div>
        </div>
        {foundOpponent ? (
          <Opponent opponentData={opponentData} />
        ) : (
          <div className="flex flex-col justify-center items-center w-full translate-x-[120px]">
            <div className="mb-4">
              <CgProfile className="h-20 w-20 bg-green-400 border-4 rounded-2xl animate-bounce" />
            </div>
            <h3 className="text-2xl font-semibold">Looking for opponent...</h3>
          </div>
        )}
      </div>
      {foundOpponent && (
        <Controls
          options={options}
          setOptions={setOptions}
          setPersistOption={setPersistOptions}
          locked={locked}
        />
      )}
      {finalChampion && <Result champion={finalChampion} />}

      {locked && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 grid place-items-center">
          <p className="text-4xl">Waiting for opponent response</p>
        </div>
      )}
    </div>
  );
};
export default Game;
