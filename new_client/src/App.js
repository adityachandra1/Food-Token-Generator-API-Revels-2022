import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/DashboardPage";
import GenTokens from "./pages/GenTokens";
import History from "./pages/History";
import { useEffect } from "react";
import { useState } from "react";
import { checkLoggedIn } from "./services/auth.service";
import { useSelector } from "react-redux";
import "antd/dist/antd.css";
function App() {
  const { jwt } = useSelector((state) => state.user);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const checkLoggedInAsync = async () => {
    const res = await checkLoggedIn(jwt);
    if (res.status === 200) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };
  useEffect(() => {
    checkLoggedInAsync();
  }, [jwt]);

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
        {/* <Route exact path="/send-tokens" element={<GenTokens />} /> */}
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
