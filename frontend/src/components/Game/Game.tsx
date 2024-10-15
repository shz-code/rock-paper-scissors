import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { socket } from "../../App";
import VS_Background from "../../assets/images/battle.jpg";
import Paper from "../../assets/images/paper.png";
import Rock from "../../assets/images/rock.png";
import Scissors from "../../assets/images/scissors.png";
import Controls from "./Controls";
import Opponent from "./Opponent";

const Game = () => {
  const { id } = useParams();

  const [options, setOptions] = useState<string | null>(null);
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

    socket.on(`game:update:${id}`, (data) => {
      setLocked(false);
      console.log(data);
    });

    // socket.on("game:delete", (res) => {
    //   console.log("opponent left");
    // });

    return () => {
      socket.emit(`game:delete`, id);
      socket.off(`game:get:${id}`);
      socket.off(`game:update:${id}`);
      //   socket.off(`game:delete`);
    };
  }, []);

  useEffect(() => {
    if (options) {
      setLocked(true);
      socket.emit("game:update", { id: id, option: options });
    }
  }, [options]);

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
                <FaStar className="h-12 w-12 fill-orange-700" />
                <FaStar className="h-12 w-12" />
                <FaStar className="h-12 w-12" />
              </div>
            </div>
            <div className="game_left_hands -ml-12">
              {(options === "rock" || !options) && (
                <img
                  src={Rock}
                  className="transform scale-x-[-1] absolute top-1/2 -translate-y-1/2 max-w-[400px]"
                />
              )}
              {options === "paper" && (
                <img
                  src={Paper}
                  className="transform scale-x-[-1] absolute top-1/2 -translate-y-1/2 max-w-[400px]"
                />
              )}
              {options === "scissors" && (
                <img
                  src={Scissors}
                  className="transform scale-x-[-1] absolute top-1/2 -translate-y-1/2 max-w-[400px]"
                />
              )}
            </div>
          </div>
        </div>
        {foundOpponent ? (
          <Opponent />
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
        <Controls options={options} setOptions={setOptions} locked={locked} />
      )}
    </div>
  );
};
export default Game;
