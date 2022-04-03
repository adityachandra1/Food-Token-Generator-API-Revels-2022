import { React, useEffect, useState } from "react";
import "./CSS/DashboardPage.css";
import Login from "./Login";
import logo from "./assets/Vector.svg";
import Sidebar from "./components/Sidebar";
import ContentHeader from "./components/ContentHeader";
import ProfileContent from "./components/ProfileContent";
import DashboardContent from "./components/DashboardContent";
const axios = require("axios").default;

function DashboardPage() {


  async function asyncCall() {
    const jwt = localStorage.getItem("currentUser");
      console.log(jwt);
       await axios
        .get("http://localhost:8080/check-logged-in", {
          headers: {
            authorization: jwt,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data === "allow_access") {
            isLoggedin(true);
          } else {
            isLoggedin(false);
          }
          // props.history.push("/")
        })
        .catch((err) => {
          console.log(err.message);
          isLoggedin(false);
        });
    
  }


  const [login, isLoggedin] = useState(false);
  // const [USERS, setUSERS] = useState([]);
  // const func = async () => {
  //   await axios
  //     .get("http://localhost:8080/get-volunteers-by-cat", {
  //       categoryName: "SYSTEM ADMIN",
  //     })
  //     .then(function (response) {
  //       // handle success

  //       console.log(response.data);
  //       setUSERS(response.data);
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log(error);
  //     })
  //     .then(function () {
  //       // always executed
  //     });

  // };
  useEffect(() => {
    asyncCall()
  }, []);

  // const USERS = [
  //   { id: 0, name: "Andy", role: "Core Committee Member" },
  //   { id: 1, name: "Garvit", role: "Core Committee Member" },
  //   { id: 2, name: "Yash", role: "Core Committee Member" },
  //   { id: 3, name: "ajdaijd", role: "Organizer" },
  //   { id: 4, name: "aaaaa", role: "Organizer" },
  //   { id: 5, name: "xxaaa", role: "Organizer" },
  //   { id: 6, name: "Andy", role: "Organizer" },
  //   { id: 7, name: "Garvit", role: "Organizer" },
  //   { id: 8, name: "Yash", role: "Volunteer" },
  //   { id: 9, name: "ajdaijd", role: "Volunteer" },
  //   { id: 10, name: "aaaaa", role: "Volunteer" },
  //   { id: 11, name: "xxaaa", role: "Volunteer" },
  // ];
  return (
    <div className="dashboard-container">
      {/* {console.log("users", USERS)} */}
      <div className="main-container">
        <div className="row">
          <div className="col-12 col-md-2 left-part">
            <div className="logo">
              <img src={logo} alt="LOGO" />
            </div>
            <Sidebar />
          </div>
          <div className="col-10 col-md-8 mid-part">
            <ContentHeader />
            <DashboardContent />
          </div>
          <div className="col-2 col-md-2 right-part">
            <ProfileContent />
          </div>
        </div>
      </div>
      <div className="leftCircle"></div>
      <div className="rightCircle"></div>
    </div>
  );
  }
export default DashboardPage;
