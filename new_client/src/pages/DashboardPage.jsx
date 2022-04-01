import React from "react";
import "./CSS/DashboardPage.css";
import logo from "./assets/Vector.svg";
import Sidebar from "./components/Sidebar";
import ContentHeader from "./components/ContentHeader";
import ProfileContent from "./components/ProfileContent";
import DashboardContent from "./components/DashboardContent";

function DashboardPage() {
  const USERS = [
    { id: 0, name: "Andy", role: "Core Committee Member" },
    { id: 1, name: "Garvit", role: "Core Committee Member" },
    { id: 2, name: "Yash", role: "Core Committee Member" },
    { id: 3, name: "ajdaijd", role: "Organizer" },
    { id: 4, name: "aaaaa", role: "Organizer" },
    { id: 5, name: "xxaaa", role: "Organizer" },
    { id: 6, name: "Andy", role: "Organizer" },
    { id: 7, name: "Garvit", role: "Organizer" },
    { id: 8, name: "Yash", role: "Volunteer" },
    { id: 9, name: "ajdaijd", role: "Volunteer" },
    { id: 10, name: "aaaaa", role: "Volunteer" },
    { id: 11, name: "xxaaa", role: "Volunteer" },
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
