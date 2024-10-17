import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BASE_URL, {
  extraHeaders: {
    Authentication: import.meta.env.VITE_SOCKET_KEY,
  },
});

export default socket;
