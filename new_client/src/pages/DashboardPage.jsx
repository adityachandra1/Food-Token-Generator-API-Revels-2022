import React from "react";
import "./CSS/DashboardPage.css";
import logo from "./assets/Vector.svg";
import Sidebar from "./components/Sidebar";
import ContentHeader from "./components/ContentHeader";
import ProfileContent from "./components/ProfileContent";
import DashboardContent from "./components/DashboardContent";

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
            <DashboardContent USERS={USERS} />
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