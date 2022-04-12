import React from "react";
import { Table } from "antd";
import "antd/dist/antd.css";
import Sidebar from "./components/Sidebar.jsx";
import "./CSS/History.css";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "antd";

const History = (isLoggedIn) => {
  const navigate = useNavigate();
  const [stats, setStats] = React.useState([]);
  const getHistory = async () => {
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
      console.log("Success", res.data.stats);
      setStats(res.data.stats);
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <Row className="history-container">
      <Col span={24}>
        <Sidebar />
      </Col>
      <div className="container">
        <table className="table">
          <thead className="">
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
              <th scope="col">something</th>
            </tr>
          </thead>
          <tbody>
            {/* {stats &&
              stats.map((stat, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{stat.first}</td>
                  <td>{stat.last}</td>
                  <td>{stat.handle}</td>
                  <td>{stat.something}</td>
                  {console.log("stat", stat)}
                </tr>
              ))} */}

            {/* <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </Row>
  );
};

export default History;
