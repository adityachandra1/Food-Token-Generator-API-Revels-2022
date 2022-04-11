import React from "react";
import { Table } from "antd";
import "antd/dist/antd.css";
import Sidebar from "./components/Sidebar.jsx";
import "./CSS/History.css";
import { useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Col, Row } from "antd";

const History = (isLoggedIn) => {
  const navigate = useNavigate();

  useEffect(async () => {
    if (!isLoggedIn && !sessionStorage.getItem("currentUser")) {
      navigate("/");
    }
    const jwt = sessionStorage.getItem("currentUser");
    console.log(jwt);
    try {
      const res = await axios.get(
        "http://localhost:8080/getstats",
        {},
        {
          headers: {
            authorization: jwt,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Success", res);
    } catch (err) {
      console.log("error", err);
    }
  }, []);
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <Row className="history-container">
      <Col span={24}>
        <Sidebar />
      </Col>
      <div className="container">
        <Col span={24}>
          <Table dataSource={dataSource} columns={columns} />
        </Col>
      </div>
    </Row>
  );
};

export default History;
