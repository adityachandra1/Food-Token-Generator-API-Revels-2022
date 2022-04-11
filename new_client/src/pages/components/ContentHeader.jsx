import React from "react";
import "./css/ContentHeader.css";

function ContentHeader() {
  return (
    <div className="header-container">
      {/* <div className="timer">
        <h3>14.26</h3>
      </div> */}
      <h1 className="heading">Welcome to HFS Portal!</h1>
      <h3 className="subHeading">System Admin and web development</h3>
    </div>
  );
}

export default ContentHeader;