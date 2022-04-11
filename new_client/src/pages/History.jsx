import React from "react";
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

  return (
    <Row className="history-container">
      <Col span={24}>
        <Sidebar />
      </Col>
    </Row>
  );
};

export default History;
