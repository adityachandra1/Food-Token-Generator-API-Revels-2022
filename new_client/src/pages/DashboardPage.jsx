import { React, useEffect, useState } from "react";
import "./CSS/DashboardPage.css";
import Login from "./Login";
import logo from "./assets/Vector.svg";
import Sidebar from "./components/Sidebar";
import ContentHeader from "./components/ContentHeader";
import ProfileContent from "./components/ProfileContent";
import DashboardContent from "./components/DashboardContent";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function DashboardPage({ isLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && !sessionStorage.getItem("currentUser")) {
      navigate("/");
    }
  }, []);
  return (
    <div className="dashboard-container">
      {/* {console.log("users", USERS)} */}
      <div className="main-container">
        <div className="row">
          <div className="col-12 col-md-2 left-part">
            <div className="logo">
              <img src={logo} alt="LOGO" />
            </div>
            <Sidebar />
          </div>
          <div className="col-10 col-md-8 mid-part">
            <ContentHeader />
            <DashboardContent />
          </div>
          <div className="col-2 col-md-2 right-part">
            <ProfileContent />
          </div>
        </div>
      </div>
      <div className="leftCircle"></div>
      <div className="rightCircle"></div>
    </div>
  );
}
export default DashboardPage;
