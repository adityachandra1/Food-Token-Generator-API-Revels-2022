import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="sidebar-container d-flex flex-column align-items-center">
      <button
        className="active-sidebar-btn sidebar-btn"
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        Dashboard
      </button>
      <button
        className="sidebar-btn"
        onClick={() => {
          navigate("/history");
        }}
      >
        History
      </button>
    </div>
  );
}

export default Sidebar;
