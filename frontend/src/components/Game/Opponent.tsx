import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaStar } from "react-icons/fa";
import Paper from "../../assets/images/paper.png";
import Rock from "../../assets/images/rock.png";
import Scissors from "../../assets/images/scissors.png";

type Options = "rock" | "paper" | "scissors";

const Opponent = ({ opponentData }) => {
  // console.log(opponentData);

  const [options, setOptions] = useState<Options | null>(null);

  useEffect(() => {
    if (opponentData) {
      setOptions(opponentData.lastOption);
    }
  }, [opponentData]);

  return (
    <div className="relative">
      <div className="flex gap-4 p-2 mt-5 mr-5">
        <div className="flex gap-4 items-center">
          {opponentData &&
            Array(opponentData.winCount)
              .fill(0)
              .map((_, i) => (
                <FaStar key={i} className="h-12 w-12 fill-green-700" />
              ))}

          {opponentData &&
            Array(3 - opponentData.winCount)
              .fill(0)
              .map((_, i) => <FaStar key={i} className="h-12 w-12" />)}

          {!opponentData && (
            <>
              <FaStar className="h-12 w-12" />
              <FaStar className="h-12 w-12" />
              <FaStar className="h-12 w-12" />
            </>
          )}
        </div>
        <CgProfile className="h-20 w-20 bg-green-400 border-4 rounded-2xl" />
      </div>
      <div className="game_left_right -ml-12">
        {(options === "rock" || !options) && (
          <img
            src={Rock}
            className="absolute top-1/2 -translate-y-1/2 max-w-[400px]"
          />
        )}
        {options === "paper" && (
          <img
            src={Paper}
            className="absolute top-1/2 -translate-y-1/2 max-w-[400px]"
          />
        )}
        {options === "scissors" && (
          <img
            src={Scissors}
            className="absolute top-1/2 -translate-y-1/2 max-w-[400px]"
          />
        )}
      </div>
    </div>
  );
};
export default Opponent;
