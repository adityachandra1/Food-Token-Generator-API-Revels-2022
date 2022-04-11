import React, { useState, useEffect } from "react";
// import { Form, Input, Button } from "antd";
import Dashboard from "../pages/DashboardPage";
import logo from "./images/login/logo.png";
import wave1 from "./images/login/wave1.svg";
import wave2 from "./images/login/wave2.svg";
import "./CSS/login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
var x;

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const postPass = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/login", {
        email: `${email}`,
        password: `${password}`,
      })
      .then(function (response) {
        x = response.data.data.token;
        sessionStorage.setItem("currentUser", JSON.stringify(x));
        setIsLoggedIn(!isLoggedIn);
        navigate("/dashboard");
      })
      .catch(function (error) {
        console.log(error);
        setIsLoggedIn(false);
      });
  };

  useEffect(() => {
    if (isLoggedIn && sessionStorage.getItem("currentUser") !== null) {
      console.log("Log hai");
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="login-main-container">
      <div className="login-container">
        <img src={logo} alt="LOGO" />

        <form className="login-form-container" onSubmit={postPass}>
          <div className="form-block">
            <label className="login-form-label">Email </label>
            <br />
            <input
              className="login-input"
              type="email"
              name=""
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-block">
            <label className="login-form-label">Password </label>
            <br />

            <input
              className="login-input"
              type="password"
              name=""
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-btn" type="submit">
            Log in
          </button>
        </form>
      </div>
      {/* <div className="waves">
        <img src={wave1} alt="" className="wave-svg1" />
        <img src={wave2} alt="" className="wave-svg2" />
      </div> */}
    </div>
  );
};

export default Login;
