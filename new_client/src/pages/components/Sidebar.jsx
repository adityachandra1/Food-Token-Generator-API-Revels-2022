import React from "react";
import "./css/Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar-container">
      <a className="sidebar-btn active-sidebar-btn" href="/">
        Dashboard
      </a>
      <br />
      <br />
      <a className="sidebar-btn" href="/">
        Log Out
      </a>
    </div>
  );
}

export default Sidebar;