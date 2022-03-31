import React from "react";
import "./CSS/DashboardPage.css";
import logo from "./assets/Vector.svg";
import Sidebar from "./components/Sidebar";
import ContentHeader from "./components/ContentHeader";
import ProfileContent from "./components/ProfileContent";
import DashboardContent from "./components/DashboardContent";
import { Container, Row, Col } from "reactstrap";

function DashboardPage() {
  const USERS = [
    { name: "Andy", role: "Core Committee Member" },
    { name: "Garvit", role: "Core Committee Member" },
    { name: "Yash", role: "Core Committee Member" },
    { name: "ajdaijd", role: "Organizer" },
    { name: "aaaaa", role: "Organizer" },
    { name: "xxaaa", role: "Organizer" },
    { name: "Andy", role: "Organizer" },
    { name: "Garvit", role: "Organizer" },
    { name: "Yash", role: "Volunteer" },
    { name: "ajdaijd", role: "Volunteer" },
    { name: "aaaaa", role: "Volunteer" },
    { name: "xxaaa", role: "Volunteer" }
  ];
  return (
    <div className="dashboard-container">
      <Container>
        <Row>
          <Col md={2} sm={12}>
            <div className="left-part">
              <div className="logo">
                <img src={logo} alt="LOGO" />
              </div>
              <Sidebar />
            </div>
          </Col>
          <Col md={8} sm={6}>
            <ContentHeader />
            <DashboardContent USERS={USERS} />
          </Col>
          <Col md={2} sm={6}>
            <ProfileContent />
          </Col>
        </Row>
      </Container>
      <div className="leftCircle"></div>
      <div className="rightCircle"></div>
    </div>
  );
}
export default DashboardPage;