import React, { useState } from "react";
// import { Form, Input, Button } from "antd";
import logo from "./images/login/logo.png";
import wave1 from "./images/login/wave1.svg";
import wave2 from "./images/login/wave2.svg";
import "./css/login.css";
import { Link } from "react-router-dom";

const Login = (e) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onFinish = async (e) => {
    // e.preventDefault();
    const json = { email, password };

    console.log("Success:", json);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-main-container">
      <div className="login-container">
        <img src={logo} alt="LOGO" />

        <form className="login-form-container">
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
          <Link to="/send-tokens">
            <button>Log in to your account</button>
          </Link>
        </form>
      </div>
      <div className="waves">
        <img src={wave1} alt="" className="wave-svg1" />
        <img src={wave2} alt="" className="wave-svg2" />
      </div>
    </div>
  );
};

export default Login;
