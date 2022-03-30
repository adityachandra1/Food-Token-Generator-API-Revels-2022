import React from "react";
import "./CSS/GenTokens.css";

const GenTokens = () => {
  return (
    <div className="gentokens-page">
      <div className="list-container">
        {" "}
        <h1>Welcome back, Parthiv</h1>
        <p>System admin and web development</p>
        <div className="tab-menu">
          <button className="active">Organisers</button>
          <button>Core Commitee</button>
          <button>Volunteers</button>
        </div>
        <div className="search-container">
          <p>List of Organisers:-</p>
          <button>Select all</button>
        </div>
      </div>
    </div>
  );
};

export default GenTokens;
