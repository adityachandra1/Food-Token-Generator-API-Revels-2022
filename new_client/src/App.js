import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import GenTokens from "./components/GenTokens";
import "antd/dist/antd.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/send-tokens" element={<GenTokens />} />
      </Routes>
    </div>
  );
}

export default App;
