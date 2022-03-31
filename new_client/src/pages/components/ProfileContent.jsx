import React from "react";
import "./css/ProfileContent.css";
import user from "../assets/Ellipse 1.png";

function ProfileContent() {
  return (
    <div className="profile">
      <img src={user} alt="USER" width="55" height="55" />
      <div className="profile-detail">
        <h2 className="profile-user-name">Parthiv Menon</h2>
        <h4 className="profile-designation">Human Resources</h4>
      </div>
    </div>
  );
}

export default ProfileContent;