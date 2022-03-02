import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { TOKEN_ID } from "../../utils/constants";
import axios from "axios";

import "./Admin.css";
import StudentDetail from "./StudentDetail";

const Admin = () => {
  const auth = useAuth();
  const [slotCount, setSlotCount] = useState(0);
  const [applicants, setApplicants] = useState([]);
  const [stats, setStats] = useState({});
  const [downloadLink, setDownloadLink] = useState(
    `${
      process.env.REACT_APP_baseUrl
    }/admin/registrations/${auth.category.categoryId.toLowerCase()}`
  );
  // const updateSlot = async (e) => {
  //   e.preventDefault();
  //   const verdict = window.confirm("Are you sure you want to update the slot?");
  //   if (!verdict) {
  //     return;
  //   }
  //   if (verdict) {
  //     const data = {
  //       slot_count: slotCount,
  //     };
  //     const res = await axios.post(
  //       `/admin/updateslot/${auth.category.categoryId}`,
  //       data,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem(TOKEN_ID)}`,
  //         },
  //       }
  //     );
  //   }
  // };
  const getCatDetails = async () => {
    try {
      const res = await axios.get(
        `/admin/stats/${auth.category.categoryId.toLowerCase()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(TOKEN_ID)}`,
          },
        }
      );
      console.log("stats", res.data.data);
      setStats(res.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const getApplicants = async () => {
    try {
      const res = await axios.get(
        `/admin/organisers/${auth.category.categoryId.toLowerCase()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(TOKEN_ID)}`,
          },
        }
      );
      setApplicants(res.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getApplicants();
    getCatDetails();
  }, []);
  return (
    <div className="admin">
      <h3 className="heading">{auth.category.category}</h3>
      <h4>
        Total Applicants : {stats.total_applicants_1 + stats.total_applicants_2}
      </h4>
      <span>
        Preference 1: {stats.total_applicants_1} <br /> Preference 2:{" "}
        {stats.total_applicants_2}
      </span>
      <h4>Total Selected : {stats.total_selected}</h4>
      <h4>Total Rejected : {stats.total_rejected}</h4>{" "}
      <button className="btn download" type="submit">
        <a href={downloadLink}>
          Download List <i className="fa fa-download"></i>
        </a>
      </button>
      <button className="btn" onClick={auth.logout}>
        Logout
      </button>
      <h1>Status of Applicants</h1>
      {applicants?.map((applicant, index) => (
        <StudentDetail
          applicant={applicant}
          key={index}
          adminCategory={auth.category}
        />
      ))}
      {/* <form>
        <input
          type="number"
          placeholder="Slots per day?"
          className="slot-input"
          onChange={(e) => setSlotCount(e.target.value)}
        ></input>
        <button className="btn" type="submit" onClick={updateSlot}>
          Update
        </button>
      </form> */}
    </div>
  );
};

export default Admin;
