import React, { useState } from "react";
import "./css/DashboardContent.css";
import { Select, List, Typography, Divider } from "antd";
const axios = require("axios").default;

const { Option } = Select;

function DashboardContent() {
  const [name, setName] = useState("");
  const [USERS, setUSERS] = useState([]);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [_checked, setChecked] = useState(false); // the search result

  // the search result
  const [foundUsers, setFoundUsers] = useState(USERS);

  const gen = async () => {
    const jwt = sessionStorage.getItem("currentUser");
    console.log(jwt);
    await axios
      .post(
        "http://localhost:8080/create-token",
        {},
        {
          headers: {
            authorization: jwt,
          },
        }
      )
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
  };

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
      <div className="list d-flex flex-column justify-content-center align-self-end my-5">
        <h3>Select from the list of organizers</h3>
        <Select
          showSearch
          mode="multiple"
          placeholder="Search to Select"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
          }
          // store selected users in setSelectedUsers
          onChange={(value) => {
            setSelectedUsers(value);
          }}
        >
          {console.log("Selected", selectedUsers)}
          {foundUsers.map((user) => (
            <Option key={user._id} value={user._id}>
              {user.name}
            </Option>
          ))}
        </Select>
        <List
          size="small"
          header={<div>Selected users</div>}
          // footer={<div>Footer</div>}
          bordered
          dataSource={selectedUsers}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
        {/* {foundUsers.length > 0 ? (
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
          )} */}

        <div className="mini-text">System admin and web development</div>

        <button
          className="TokenBtn d-flex justify-content-center mx-auto"
          onClick={gen}
        >
          Generate Tokens
        </button>
      </div>
    </div>
  );
}

export default DashboardContent;
