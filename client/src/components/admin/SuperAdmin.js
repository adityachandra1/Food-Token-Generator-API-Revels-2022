import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { TOKEN_ID } from "../../utils/constants";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import "./Admin.css";
import AllStudentDetail from "./AllStudentDetail";

const SuperAdmin = () => {
  const auth = useAuth();
  const [applicants, setApplicants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [downloadLink, setDownloadLink] = useState(
    `${process.env.REACT_APP_baseUrl}/superadmin/sheet`
  );
  const [stats, setStats] = useState({});
  const [catstats, setCatStats] = useState({});
  const getApplicants = async () => {
    try {
      const res = await axios.get(`/superadmin/org`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(TOKEN_ID)}`,
        },
      });
      setApplicants(res.data.data);
      setStats(res.data.stats);
      console.log(res.data);
      console.log(stats);
    } catch (error) {
      console.log(error.response);
    }
  };
  const getCategories = async () => {
    try {
      const res = await axios.get(`/superadmin/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(TOKEN_ID)}`,
        },
      });
      setCategories(res.data.data);
      setCatStats(res.data.catstats);
      console.log(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getApplicants();
    getCategories();
  }, []);
  return (
    <div className="admin">
      <ReactTooltip html={true} />
      <h3 className="heading">{auth.category.category}</h3>
      <h4>Total Applicants : {stats.total_applicants}</h4>
      <h4>Total Mails Sent : {stats.total_mail_sent}</h4>
      <h4>Total Selected : {stats.total_selected}</h4>
      <h4>Total Rejected : {stats.total_rejected}</h4>{" "}
      <h4>Rejected (Pref 1): {stats.pref1_rejected}</h4>{" "}
      <button className="btn download" type="submit">
        <a href={downloadLink}>
          Download List <i className="fa fa-download"></i>
        </a>
      </button>
      <button className="btn" onClick={auth.logout}>
        Logout
      </button>
      <div className="Categories">
        {categories.map((category) => (
          <div key={category._id} className="category-tooltip">
            <span
              data-tip="<b>HTML tooltip</b><br/><b>HTML tooltip</b><br/><b>HTML tooltip</b><br/><b>HTML tooltip</b>"
              className="tooltip-btn"
            >
              {category.category}
              <h4>
                Total Applicants :{" "}
                {category.total_applicants_1 + category.total_applicants_2}
              </h4>
              <span>
                Preference 1: {category.total_applicants_1} <br /> Preference 2:{" "}
                {category.total_applicants_2}
              </span>
              <h4>Total Selected : {category.total_selected}</h4>
              <h4>Total Rejected : {category.total_rejected}</h4>
            </span>
          </div>
        ))}
      </div>
      <h1>Status of Applicants</h1>
      {applicants.map((applicant, index) => (
        <AllStudentDetail applicant={applicant} key={index} />
      ))}
    </div>
  );
};

export default SuperAdmin;
