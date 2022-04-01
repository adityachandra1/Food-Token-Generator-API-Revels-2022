import React, { useState,useEffect } from "react";
// import { Form, Input, Button } from "antd";
import logo from "./images/login/logo.png";
import wave1 from "./images/login/wave1.svg";
import wave2 from "./images/login/wave2.svg";
import "./CSS/login.css";
import { Link } from "react-router-dom";
const axios = require('axios').default;

const Login = (e) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  



  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const postPass = (errorInfo) => {
    
    
    console.log(password);
    axios.post('http://localhost:8080/login', {
     email:`${email}`,
     password:`${password}`
    })
    .then(function (response) {
      console.log("1");
      console.log(response);

    })
    .catch(function (error) {
      console.log("2");
      console.log(error);
    });



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
         
            <button className="login-btn" onClick={postPass}>Log in to your account</button>
         
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
