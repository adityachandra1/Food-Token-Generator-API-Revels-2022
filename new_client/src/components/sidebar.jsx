import React from "react";
import "./CSS/sidebar.css";
import logo from "./images/logo.png";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <img src={logo} alt="" />
      <div className="sidebar-button-container">
        <button className="active-sidebar-btn">Dashboard</button>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
