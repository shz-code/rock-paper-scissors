import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../App";
import Rock from "../../assets/images/rock.png";
import Scissors from "../../assets/images/scissors.png";
import Button from "../ui/Button";

const Home = () => {
  const [room, setRoom] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("game_room", (msg) => {
      console.log(msg);
    });
  }, []);

  const handleFriendGame = () => {
    if (!room) {
      setRoom(room_id);
      socket.emit("game:create", { type: "friend" });
    }
  };

  const handleStrangerGame = () => {
    if (!room || true) {
      socket.emit(
        "game:create",
        { type: "stranger" },
        ({ status, data }: { status: boolean; data: Room }) => {
          navigate(`/game/${data.room_id}`);
        }
      );
    }
  };

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
            <Button className="max-w-xs w-full" onClick={handleFriendGame}>
              Play with Friend
            </Button>
            <Button className="max-w-xs w-full" onClick={handleStrangerGame}>
              Play with Stranger
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
