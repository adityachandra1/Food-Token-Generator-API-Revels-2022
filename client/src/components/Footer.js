import React from "react";
import "../App.css";
import logo from "../assets/sc_logo.png";
function Footer() {
  return (
    <div className="footer">
      <div className="logo">
        <img src={logo} />
      </div>

      <div className="icons">
        <a href="https://www.instagram.com/revelsmit">
          <i className="fa fa-instagram fa-2x"></i>
        </a>

        <a href="https://www.facebook.com/mitrevels">
          <i className="fa fa-facebook fa-2x"></i>
        </a>
        <i className="fa fa-google fa-2x"></i>
      </div>
      <div className="copyrights">
        <span>Made by SysAdmin and Web Dev, Revels '22</span>
      </div>
    </div>
  );
}

export default Footer;
