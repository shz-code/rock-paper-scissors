import { nanoid } from "nanoid";
import { socket } from "../../App";
import Rock from "../../assets/images/rock.png";
import Scissors from "../../assets/images/scissors.png";
import Button from "../ui/Button";

const Home = () => {
  return (
    <div className="h-full">
      <div className="flex flex-col md:flex-row items-center justify-center h-full overflow-hidden relative p-8">
        {/* Left Side Text */}
        <div className="home_left flex flex-col items-center w-3/4">
          <h1>ROCK</h1>
          <h2>Paper</h2>
          <h3>Scissors</h3>
        </div>
        {/* Right Side */}
        <div className="home_right w-full">
          <div className="home_scissors">
            <img src={Scissors} alt="Scissors photo" />
          </div>
          <div className="home_rock">
            <img src={Rock} alt="Rock photo" />
          </div>
          <div className="buttons flex flex-col items-center md:items-end mt-12 md:mt-56 gap-4">
            <Button className="max-w-xs w-full">Play with Friend</Button>
            <Button
              className="max-w-xs w-full"
              onClick={() => {
                socket.emit("join_room-stranger", { room_id: nanoid() });
              }}
            >
              Play with Stranger
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
