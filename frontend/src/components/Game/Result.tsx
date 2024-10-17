import socket from "../../lib/socket";

const Result = ({ champion }) => {
  return champion === socket.id ? (
    <div className="absolute top-0 left-0 w-full h-full bg-black/50 grid place-items-center">
      <p className="text-4xl">You are the champion</p>
    </div>
  ) : (
    <div className="absolute top-0 left-0 w-full h-full bg-black/50 grid place-items-center">
      <p className="text-4xl">Opponent won</p>
    </div>
  );
};
export default Result;
