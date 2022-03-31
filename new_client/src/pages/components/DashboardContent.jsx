import { Col } from "antd";
import React, { useState } from "react";
import { Container } from "reactstrap";
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
    <div className="dashboard-part">
      <div className="pagination">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <div className="categories">
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
      <div className="list">
        <div className="list-header">
          <h3 className="list-heading">List of Organisers:</h3>
          <div className="search-bar">
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
          </div>
          <button className="search-btn">Select all</button>
        </div>
        <Container className="user-list">
          {foundUsers && foundUsers.length > 0 ? (
            foundUsers.map((user) => (
              <li key={user.id} className="user">
                <div className="user-id">
                  <input type="checkbox" id="user-id-checkbox" />
                </div>
                <Col className="user-name">{user.name}</Col>
                <Col className="user-role">{user.role} </Col>
              </li>
            ))
          ) : (
            <h3>No results found!</h3>
          )}
        </Container>
        <div className="mini-text">System admin and web development</div>
        <button className="TokenBtn">Generate Tokens</button>
      </div>
    </div>
  );
}

export default DashboardContent;