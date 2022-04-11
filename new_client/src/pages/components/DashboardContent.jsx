import React, { useState } from "react";
import "./css/DashboardContent.css";
const axios = require("axios").default;

function DashboardContent() {
  const [name, setName] = useState("");
  const [USERS, setUSERS] = useState([]);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [_checked, setChecked] = useState(false); // the search result

  // the search result
  const [foundUsers, setFoundUsers] = useState(USERS);

  
const gen=async () =>{
  const jwt = sessionStorage.getItem("currentUser");
  console.log(jwt);
  await axios
      .post("http://localhost:8080/create-token",{} , {
        headers: {
          authorization: jwt,
        },
    
      })
      .then(function (response) {
        // handle success

        console.log(response.data);
     
        setFoundUsers(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });


}


  const func = async () => {
    await axios
      .get("http://localhost:8080/get-volunteers-by-cat", {
        categoryName: "SYSTEM ADMIN",
      })
      .then(function (response) {
        // handle success

        console.log(response.data);
        setUSERS(response.data);
        setFoundUsers(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };
  React.useEffect(() => {
    func();
  }, []);

  const onhandleCheckboxChange = (e, user) => {
    console.log(e.target.checked);
    if (e.target.checked) {
      setSelectedUsers([...selectedUsers, user]);
    } else {
      const filtered = selectedUsers.filter(
        (eachItem) => eachItem._id !== user._id
      );
      // setSelectedUsers(filtered);

      // const filtered = selectedUsers.splice(i, 1);

      setSelectedUsers(filtered);
    }
    console.log("selected bitch", selectedUsers);
  };

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = USERS.filter((user) => {
        return user.name.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      console.log(results);
      setFoundUsers(results);
    } else {
      setFoundUsers(USERS);
      // If the text field is empty, show all users
    }

    setName(keyword);
  };
  const handleSelectAll = () => {
    console.log(_checked);
    setSelectedUsers(USERS);
    const checkbox = document.querySelectorAll("#User-id-checkbox");
    if (_checked) {
      for (let i = 0; i < checkbox.length; i++) {
        console.log("1", checkbox[i].checked);
        checkbox[i].checked = false;
      }
      setChecked(false);
      setSelectedUsers(USERS);
    } else {
      for (let i = 0; i < checkbox.length; i++) {
        console.log("2", checkbox[i].checked);
        checkbox[i].checked = true;
      }

      setChecked(true);
      setSelectedUsers([]);
    }

    console.log("selected", selectedUsers);
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
            <button className="search-btn" onClick={handleSelectAll}>Select all</button>
          </div>
        </div>
        <div className="users-box d-flex flex-column justify-content-between">
          {foundUsers.length > 0 ? (
            foundUsers.map((user) => {
              return (
                <li key={user._id} className="User">
                  <div className="User-id">
                    <input
                      type="checkbox"
                      id="User-id-checkbox"
                      onChange={(e, i) => {
                        onhandleCheckboxChange(e, user);
                      }}
                    />
                  </div>
                  <div className="User-name">{user.name}</div>
                  <div className="User-role">{user.role} </div>
                </li>
              );
            })
          ) : (
            <h3>No results found!</h3>
          )}
        </div>

        <div className="mini-text">System admin and web development</div>

        <button className="TokenBtn d-flex justify-content-center mx-auto" onClick={gen}>
          Generate Tokens
        </button>
      </div>
    </div>
  );
}

export default DashboardContent;
