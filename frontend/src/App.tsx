import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Game from "./components/Game/Game";
import Home from "./components/Home/Home";
import Layout from "./components/Layout";

function App() {
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
