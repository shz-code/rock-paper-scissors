import { FC } from "react";
import { twMerge } from "tailwind-merge";
import Paper from "../../assets/images/paper.png";
import Rock from "../../assets/images/rock.png";
import Scissors from "../../assets/images/scissors.png";

interface ControlsProps {
  options: string;
  setOptions: React.Dispatch<React.SetStateAction<string | null>>;
}

const Controls: FC<ControlsProps> = ({ setOptions, options }) => {
  const setMove = (e) => {
    setOptions(e.target.getAttribute("data-target"));
  };
  return (
    <div className="controls absolute top-0 bottom-0 w-full h-full flex items-end">
      <div className="flex justify-center w-full gap-4 mb-12">
        <div
          className={twMerge(
            "img_box",
            `${options === "rock" && "border-green-700"}`
          )}
        >
          <img src={Rock} data-target="rock" onClick={setMove} />
        </div>
        <div
          className={twMerge(
            "img_box",
            `${options === "paper" && "border-green-700"}`
          )}
        >
          <img src={Paper} data-target="paper" onClick={setMove} />
        </div>
        <div
          className={twMerge(
            "img_box",
            `${options === "scissors" && "border-green-700"}`
          )}
        >
          <img src={Scissors} data-target="scissors" onClick={setMove} />
        </div>
      </div>
    </div>
  );
};
export default Controls;
