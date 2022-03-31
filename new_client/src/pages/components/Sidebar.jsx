import React from "react";
import "./css/Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar-container">
      <a className="btn active" href="/">
        Dashboard
      </a>
      <br />
      <a className="btn" href="/">
        Log Out
      </a>
    </div>
  );
}

export default Sidebar;