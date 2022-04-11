import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/Sidebar.css";
import ProfileContent from "./ProfileContent";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="sidebar-container d-flex flex-wrap justify-content-around align-items-center">
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
      <ProfileContent />
    </div>
  );
}

export default Sidebar;
