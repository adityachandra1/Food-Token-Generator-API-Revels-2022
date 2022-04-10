import React from "react";
import Sidebar from "./components/Sidebar.jsx";
import "./CSS/History.css";
import { useEffect } from "react";
import axios from "axios";
const History = () => {
  useEffect(async () => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));

    await axios
      .get("http://localhost:8080/getstats", {
        headers: {
          "x-access-token": jwt,
        },
      })
      .then((res) => {
        console.log(res);

        // props.history.push("/")
      })
      .catch((err) => {
        console.log(err.message);
      });
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
