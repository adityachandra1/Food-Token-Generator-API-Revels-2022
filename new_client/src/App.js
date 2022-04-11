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
import { useLocation } from "react-router-dom";

function App() {
  let location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  useEffect(async () => {
    const res = await checkLoggedIn();
    if (res.status === 200) setIsLoggedIn(true);
    else setIsLoggedIn(false);

    console.log("REsSS,", res);
  }, [isLoggedIn]);

  if (isLoggedIn === null) {
    return <>Loading</>;
  }

  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route path="" element={<Navigate to="/" />} />
        <Route exact path="/send-tokens" element={<GenTokens />} />
        <Route
          exact
          path="/dashboard"
          element={<Dashboard isLoggedIn={isLoggedIn} />}
        />
        <Route
          exact
          path="/history"
          element={<History isLoggedIn={isLoggedIn} />}
        />
      </Routes>
    </div>
  );
}

export default App;
