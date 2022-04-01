import React, { useState } from "react";
import "./css/DashboardContent.css";

function DashboardContent({ USERS }) {
  const [name, setName] = useState("");

  // the search result
  const [foundUsers, setFoundUsers] = useState(USERS);

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = USERS.filter((user) => {
        return user.name.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundUsers(results);
    } else {
      setFoundUsers(USERS);
      // If the text field is empty, show all users
    }

    setName(keyword);
  };
  return (
    <div className="dashboard-part container d-flex justify-content-center">
      <div className="pagination d-flex flex-row justify-content-center">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <div className="categories d-flex flex-row justify-content-center">
        <a href="/" className="category active-category">
          Organisers
        </a>
        <a href="/" className="category">
          Core Committee
        </a>
        <a href="/" className="category">
          Volunteers
        </a>
      </div>
      <div className="list d-flex flex-column justify-content-center align-self-end">
        <div className="list-header d-flex flex-row">
          <h3 className="list-heading">List of Organisers:</h3>
          <div className="search-bar d-flex flex-row align-items-center mx-auto">
            <label htmlFor="search-input"></label>
            <input
              type="search"
              className="searchInput"
              value={name}
              onChange={filter}
              id="search-input"
              name="search-input"
              placeholder="Search"
            />
            <button className="search-btn">Select all</button>
          </div>
        </div>
        <div className="users-box d-flex flex-column justify-content-between">
          {foundUsers && foundUsers.length > 0 ? (
            foundUsers.map((user) => (
              <li key={user.id} className="User">
                <div className="User-id">
                  <input type="checkbox" id="User-id-checkbox" />
                </div>
                <div className="User-name">{user.name}</div>
                <div className="User-role">{user.role} </div>
              </li>
            ))
          ) : (
            <h3>No results found!</h3>
          )}
        </div>

        <div className="mini-text">System admin and web development</div>

        <button className="TokenBtn d-flex justify-content-center mx-auto">
          Generate Tokens
        </button>
      </div>
    </div>
  );
}

export default DashboardContent;
