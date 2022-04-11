import React from "react";
import "./css/ProfileContent.css";
import { useNavigate } from "react-router-dom";
import user from "../assets/Ellipse 1.png";

function ProfileContent() {
  const navigate = useNavigate();
  return (
    <div className="profile">
      {/* <img src={user} alt="USER" width="55" height="55" />
      <div className="profile-detail">
        <h2 className="profile-user-name">Parthiv Menon</h2>
        <h4 className="profile-designation">Human Resources</h4>
      </div> */}
      <button
        className="active-sidebar-btn sidebar-btn"
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

export default ProfileContent;