import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import Game from "./components/Game/Game";
import Home from "./components/Home/Home";
import Layout from "./components/Layout";
import Result from "./components/Result/Result";

export const socket = io("http://192.168.0.110:3000", {
  extraHeaders: {
    Authentication: "Bearer 1234",
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
          <Route path="/game/result/:id" element={<Result />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
