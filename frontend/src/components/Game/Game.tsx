import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import VS_Background from "../../assets/images/battle.jpg";
import Paper from "../../assets/images/paper.png";
import Rock from "../../assets/images/rock.png";
import Scissors from "../../assets/images/scissors.png";
import Controls from "./Controls";
import Opponent from "./Opponent";

const Game = () => {
  const { id } = useParams();

  const [options, setOptions] = useState<string | null>(null);

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
                  className="rotate-[180deg] absolute top-1/2 -translate-y-1/2 max-w-[400px]"
                />
              )}
              {options === "paper" && (
                <img
                  src={Paper}
                  className="rotate-[180deg] absolute top-1/2 -translate-y-1/2 max-w-[400px]"
                />
              )}
              {options === "scissors" && (
                <img
                  src={Scissors}
                  className="rotate-[180deg] absolute top-1/2 -translate-y-1/2 max-w-[400px]"
                />
              )}
            </div>
          </div>
        </div>
        <Opponent />
      </div>

      <Controls options={options} setOptions={setOptions} />
    </div>
  );
};
export default Game;
