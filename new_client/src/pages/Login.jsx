import React, { useState } from "react";
// import { Form, Input, Button } from "antd";
import Dashboard from "../pages/DashboardPage";
import logo from "./images/login/logo.png";
import wave1 from "./images/login/wave1.svg";
import wave2 from "./images/login/wave2.svg";
import "./CSS/login.css";
const axios = require("axios").default;

var x;

const Login = (e) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  


  const postPass = (e) => {
    e.preventDefault();
    //console.log("-----------");
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    //console.log("--------");
    console.log(password);
    axios.post('http://localhost:8080/login', {
     email:`${email}`,
     password:`${password}`
    })
    .then(function (response) {
      console.log("1");
      console.log(response);
      setIsLoggedIn(true);
     // console.log("---------------------------------");
      //console.log(response);
      sessionStorage.setItem("jwt", response.data.token);
      x=response.data.token;
      console.log(x);
     
    })
    .catch(function (error) {
      console.log("2");
      console.log(error);
    });
  };

  return isLoggedIn ? (
    <Dashboard />
  ) : (
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
            Log in to your account
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
