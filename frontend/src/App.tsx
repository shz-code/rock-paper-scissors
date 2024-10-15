import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import Game from "./components/Game/Game";
import Home from "./components/Home/Home";
import Layout from "./components/Layout";

export const socket = io(import.meta.env.VITE_BASE_URL, {
  extraHeaders: {
    Authentication: import.meta.env.VITE_SOCKET_KEY,
  },
});

function App() {
  useEffect(() => {
    socket.on("auth:failed", (res) => console.error(res));
  }, []);
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<Game />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
