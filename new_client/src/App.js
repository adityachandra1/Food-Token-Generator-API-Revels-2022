import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/DashboardPage";
import GenTokens from "./pages/GenTokens";
import History from "./pages/History";
import "antd/dist/antd.css";
import { useEffect } from "react";
import { useState } from "react";
import { checkLoggedIn } from "./services/auth.service";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  useEffect(async () => {
    const res = await checkLoggedIn();
    if (res.status === 200) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        {isLoggedIn && (
          <>
            <Route exact path="/send-tokens" element={<GenTokens />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/history" element={<History />} />
          </>
        )}
        <Route render={() => <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
