import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="sidebar-container">
      <button
        className="sidebar-btn"
        onClick={() => {
          sessionStorage.removeItem("currentUser");
          navigate("/");
        }}
      >
        Log Out
      </button>
    </div>
  );
}

export default Sidebar;
