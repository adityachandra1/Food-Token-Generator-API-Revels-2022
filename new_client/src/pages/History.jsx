import React from "react";
import Sidebar from "./components/Sidebar.jsx";
import "./CSS/History.css";


const History = () => {
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
