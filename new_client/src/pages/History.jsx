import React from "react";
import Sidebar from "./components/Sidebar.jsx";
import "./CSS/History.css";
import { useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

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
    <div className="history-container">
      <Sidebar />
      <div className="table-holder">
        <table className="fl-table">
          <tr>
            <th>Name</th>
            <th>category</th>
            <th>department</th>
          </tr>

          <tbody>
            <tr>
              <td>Chintan</td>
              <td>Organiser</td>
              <td>SYSadmin</td>
            </tr>
            <tr>
              <td>Chintan</td>
              <td>Organiser</td>
              <td>SYSadmin</td>
            </tr>
            <tr>
              <td>Chintan</td>
              <td>Organiser</td>
              <td>SYSadmin</td>
            </tr>
            <tr>
              <td>Chintan</td>
              <td>Organiser</td>
              <td>SYSadmin</td>
            </tr>
            <tr>
              <td>Chintan</td>
              <td>Organiser</td>
              <td>SYSadmin</td>
            </tr>
            <tr>
              <td>Chintan</td>
              <td>Organiser</td>
              <td>SYSadmin</td>
            </tr>
            <tr>
              <td>shrey</td>
              <td>Organiser</td>
              <td>SYSadmin</td>
            </tr>

            <tr>
              <td>XYZ</td>
              <td>Organiser</td>
              <td>SYSadmin</td>
            </tr>

            <tr>
              <td>XYZ</td>
              <td>Organiser</td>
              <td>SYSadmin</td>
            </tr>

            <tr>
              <td>XYZ</td>
              <td>Organiser</td>
              <td>SYSadmin</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
