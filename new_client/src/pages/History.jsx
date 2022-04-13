import React from "react";
import { Button, Table } from "antd";
import "antd/dist/antd.css";
import Sidebar from "./components/Sidebar.jsx";
import "./CSS/History.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "antd";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../constant.js";
const History = (isLoggedIn) => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { jwt } = useSelector((state) => state.user);
  const [stats, setStats] = React.useState([]);

  function submitHandler(e) {
    e.preventDefault();
    axios
      .post(`${BACKEND_URL}/token-tester`, { email })
      .then(function (response) {
        console.log(response);
        console.log("success");
      })
      .catch(function (error) {
        console.log(error);
        console.log("error");
      });
  }

  const getHistory = async () => {
    if (!isLoggedIn && !jwt) {
      navigate("/");
    }
    try {
      const res = await axios.get(`${BACKEND_URL}/getstats`, {
        headers: {
          authorization: jwt,
        },
      });
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
    <>
      <Row className="history-container">
        <Col span={24}>
          <Sidebar />
        </Col>
        <Col span={24}>
          <form onSubmit={submitHandler}>
            <input
              className="textbox"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <Button
              ClassName="textbox-button"
              type="primary"
              htmlType="submit"
              style={{
                width: "8rem",
                marginLeft: "0.5rem",
              }}
            >
              Send
            </Button>
          </form>
        </Col>
        <Col span={24}>
          {stats && stats.length === 0 && (
            <div
              style={{
                fontSize: "2rem",
                color: "#FFF",
                textAlign: "center",
              }}
            >
              Loading...
            </div>
          )}
        </Col>
        {stats && stats.length > 0 && (
          <div className="container">
            <table className="table">
              <thead className="">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Category</th>
                  <th scope="col">Expired</th>
                  <th scope="col">Redeemed</th>
                  <th scope="col">Given</th>
                  <th scope="col">Given By SC</th>
                </tr>
              </thead>
              <tbody>
                {stats &&
                  stats.map((stat, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{stat.category}</td>
                      <td>{stat.tokensExpired}</td>
                      <td>{stat.tokensRedeemed}</td>
                      <td>{stat.tokensGiven}</td>
                      <td>{stat.tokensGivenBySC}</td>

                      {console.log("stat", stat)}
                    </tr>
                  ))}

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
        )}
      </Row>
    </>
  );
};

export default History;
