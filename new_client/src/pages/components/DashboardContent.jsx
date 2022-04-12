import React, { useState } from "react";
import "./css/DashboardContent.css";
import { Select, List, Popconfirm, notification, Button, Row, Col } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import { BACKEND_URL } from "../../constant";
const { Option } = Select;

function DashboardContent() {
  const { jwt } = useSelector((state) => state.user);
  console.log("JWT", jwt);
  const [USERS, setUSERS] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  // the search result
  const [foundUsers, setFoundUsers] = useState(USERS);

  const gen = async () => {
    const finalUsers = [];

    selectedUsers.forEach(async (id) => {
      finalUsers.push(foundUsers.find((user) => user._id === id));
    });

    setIsLoading(true);
    await axios
      .post(
        `${BACKEND_URL}/create-token`,
        {
          email: finalUsers,
        },
        {
          headers: {
            authorization: jwt,
          },
        }
      )
      .then(function (response) {
        // handle success
        setIsLoading(false);
        console.log(response.data);
        notification.success({
          message: "Success",
          description: "Token generated successfully",
        });

        const erroremails = response.data.error_list;
        if (erroremails.length > 0) {
          erroremails.forEach((email) => {
            notification.info({
              message: "Already generated token",
              description: `${email}l`,
            });
          });
        }
      })
      .catch(function (error) {
        // handle error
        setIsLoading(false);

        console.log(error);
      });
  };

  const func = async () => {
    await axios
      .get(`${BACKEND_URL}/get-volunteers-by-cat`, {
        headers: {
          authorization: jwt,
        },
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

  return (
    <div>
      {/* <div className="categories d-flex flex-row justify-content-center">
        <a href="/" className="category active-category">
          Organisers
        </a>
        <a href="/" className="category">
          Core Committee
        </a>
        <a href="/" className="category">
          Volunteers
        </a>
      </div> */}
      <h3
        style={{
          marginTop: "1rem",
        }}
        className="subheader"
      >
        Select from the list of organizers, number of organizers{" "}
        {foundUsers.length}
      </h3>
      <Row>
        <Col span={24}>
          <Button
            style={{
              width: "100%",
              margin: "1rem 0",
            }}
            type="primary"
            onClick={() => {
              // add all ids in foundUsers to selectedUsers
              setSelectedUsers(foundUsers.map((user) => user._id));
              // clear the select
            }}
          >
            Select All
          </Button>
        </Col>
        <Col span={24}>
          <Button
            style={{
              width: "100%",
              margin: "1rem 0",
            }}
            type="primary"
            onClick={() => {
              // add all ids in foundUsers to selectedUsers
              setSelectedUsers([]);
            }}
          >
            Remove All
          </Button>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Select
            style={{
              width: "100%",
              margin: "1rem 0",
            }}
            showSearch
            // remove tags
            allowClear
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
            {foundUsers.map((user) => (
              <Option key={user._id} value={user._id}>
                {user.name}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
      <List
        size="small"
        header={<div>Selected users : {selectedUsers.length}</div>}
        // footer={<div>Footer</div>}
        bordered
        dataSource={selectedUsers}
        renderItem={(item) => (
          <List.Item
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {
              // name of user using the id
              foundUsers.find((user) => user._id === item).name +
                " - " +
                foundUsers.find((user) => user._id === item).email
            }

            <Button
              type="danger"
              onClick={() => {
                // remove the id from selectedUsers
                setSelectedUsers(selectedUsers.filter((id) => id !== item));
              }}
            >
              Remove
            </Button>
          </List.Item>
        )}
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

      <Popconfirm
        title="Are you sure you want to create tokens for these users?"
        onConfirm={() => {
          gen();
        }}
        onCancel={() => {
          setIsLoading(false);
        }}
        okText="Yes"
        cancelText="No"
      >
        <Button
          type="danger"
          style={{
            width: "100%",
            margin: "1rem 0",
          }}
          loading={isLoading}
        >
          Generate Tokens
        </Button>
      </Popconfirm>
      <div className="mini-text">System admin and web development</div>
    </div>
  );
}

export default DashboardContent;
