import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/DashboardPage";
import GenTokens from "./pages/GenTokens";
import History from "./pages/History";
import "antd/dist/antd.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/send-tokens" element={<GenTokens />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/history" element={<History/>} />
      </Routes>
    </div>
  );
}

export default App;
