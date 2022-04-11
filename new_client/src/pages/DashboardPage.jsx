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
import { Col, Row } from "antd";
function DashboardPage({ isLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && !sessionStorage.getItem("currentUser")) {
      navigate("/");
    }
  }, []);
  return (
    <div className="dashboard-container">
      <ContentHeader />

      {/* {console.log("users", USERS)} */}
      <div className="main-container">
        <Row>
          <Col xs={24}>
            <div className="logo">
              <img src={logo} alt="LOGO" />
            </div>
            <Sidebar />
          </Col>
          <Col
            xs={24}
            style={{
              padding: "0 1rem",
            }}
          >
            <DashboardContent />
          </Col>
          <Col xs={24}>
            <ProfileContent />
          </Col>
        </Row>
      </div>
      <div className="leftCircle"></div>
      <div className="rightCircle"></div>
    </div>
  );
}
export default DashboardPage;
